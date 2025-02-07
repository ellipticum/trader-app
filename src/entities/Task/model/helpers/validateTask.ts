import { ITaskInput } from '../interfaces/taskInput'

export const validateTask = ({
    name,
    description,
    startsAt,
    endsAt
}: ITaskInput): string | null => {
    if (!name.trim()) return 'Title is required'
    if (!description.trim()) return 'Description is required'
    if (!startsAt.trim()) return 'Start date is required'
    if (!endsAt.trim()) return 'End date is required'
    if (!startsAt.includes('T')) return 'Start date must include time'
    if (!endsAt.includes('T')) return 'End date must include time'

    const startDate = new Date(startsAt)
    const endDate = new Date(endsAt)

    if (isNaN(startDate.getTime())) return 'Start date is in an invalid format'
    if (isNaN(endDate.getTime())) return 'End date is in an invalid format'
    if (startDate > endDate) return 'Start date cannot be later than end date'

    return null
}
