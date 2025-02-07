import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { saveImage, getImagesByTaskId, deleteImage } from '../../../../shared/db'

interface ImageData {
    id: number
    taskId: number
    fileName: string
    dataURL: string
    type: string
    size: number
    timestamp: number
}

interface Props {
    taskId: number
}

const FileSection: FC<Props> = ({ taskId }) => {
    const [images, setImages] = useState<ImageData[]>([])

    useEffect(() => {
        loadImages()
    }, [taskId])

    const loadImages = async () => {
        try {
            const imgs = await getImagesByTaskId(taskId)
            setImages(imgs)
        } catch (error) {
            console.error(error)
        }
    }

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const filesArray = Array.from(event.target.files)
            for (const file of filesArray) {
                try {
                    await saveImage(taskId, file)
                } catch (error) {
                    console.error(error)
                }
            }
            loadImages()
        }
    }

    const handleRemoveFile = async (imageId: number) => {
        try {
            await deleteImage(imageId)
            loadImages()
        } catch (error) {
            console.error(error)
        }
    }

    const renderFileItem = (image: ImageData) => {
        const isImage = image.type.startsWith('image/')
        return (
            <div
                key={image.id}
                className={styles.fileItem}
                onClick={() => handleRemoveFile(image.id)}
            >
                {isImage ? (
                    <img
                        src={image.dataURL}
                        alt={`File preview ${image.id}`}
                        className={styles.imagePreview}
                    />
                ) : (
                    <a
                        href={image.dataURL}
                        target='_blank'
                        rel='noopener noreferrer'
                        className={styles.fileLink}
                    >
                        {image.fileName}
                    </a>
                )}
                <div className={styles.overlay}>Delete</div>
            </div>
        )
    }

    return (
        <div className={styles.fileSection}>
            {images.length > 0 && (
                <div>
                    <h3 className={styles.heading}>Files</h3>
                    <div className={styles.fileGrid}>{images.map(renderFileItem)}</div>
                </div>
            )}
            <div className={styles.fileInput}>
                <label>Add new files:</label>
                <input type='file' multiple onChange={handleFileChange} />
            </div>
        </div>
    )
}

export default FileSection
