export const validateImages = (files: File[]): string[] => {
    const errors: string[] = []
    const validTypes = ['image/jpeg', 'image/png', 'image/gif']
    const maxSize = 5 * 1024 * 1024

    files.forEach((file) => {
        if (!validTypes.includes(file.type)) {
            errors.push(`${file.name} is not a supported image type.`)
        }
        if (file.size > maxSize) {
            errors.push(`${file.name} exceeds the maximum size of 5MB.`)
        }
    })

    return errors
}
