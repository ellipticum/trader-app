export function openDatabase(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('TaskImagesDB', 1)
        request.onupgradeneeded = () => {
            const db = request.result
            if (!db.objectStoreNames.contains('images')) {
                const store = db.createObjectStore('images', { keyPath: 'id', autoIncrement: true })
                store.createIndex('taskId', 'taskId', { unique: false })
            }
        }
        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
    })
}

export async function saveImage(taskId: number, file: File): Promise<void> {
    const db = await openDatabase()
    const reader = new FileReader()
    return new Promise((resolve, reject) => {
        reader.onload = () => {
            const transaction = db.transaction('images', 'readwrite')
            const store = transaction.objectStore('images')
            const imageData = {
                taskId,
                fileName: file.name,
                dataURL: reader.result as string,
                type: file.type,
                size: file.size,
                timestamp: Date.now()
            }
            const request = store.add(imageData)
            request.onsuccess = () => resolve()
            request.onerror = () => reject(request.error)
        }
        reader.onerror = () => reject(reader.error)
        reader.readAsDataURL(file)
    })
}

export async function getImagesByTaskId(taskId: number): Promise<any[]> {
    const db = await openDatabase()
    return new Promise((resolve, reject) => {
        const transaction = db.transaction('images', 'readonly')
        const store = transaction.objectStore('images')
        const index = store.index('taskId')
        const request = index.getAll(taskId)
        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
    })
}

export async function deleteImage(imageId: number): Promise<void> {
    const db = await openDatabase()
    return new Promise((resolve, reject) => {
        const transaction = db.transaction('images', 'readwrite')
        const store = transaction.objectStore('images')
        const request = store.delete(imageId)
        request.onsuccess = () => resolve()
        request.onerror = () => reject(request.error)
    })
}
