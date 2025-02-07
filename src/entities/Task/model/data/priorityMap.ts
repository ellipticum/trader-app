import { TaskPriority } from '../enums/taskPriority'

export const priorityMap = {
    [TaskPriority.VeryLow]: {
        name: 'Very low',
        emoji: '😎'
    },
    [TaskPriority.Low]: {
        name: 'Low',
        emoji: '😏'
    },
    [TaskPriority.Medium]: {
        name: 'Medium',
        emoji: '😐'
    },
    [TaskPriority.High]: {
        name: 'High',
        emoji: '😮'
    },
    [TaskPriority.VeryHigh]: {
        name: 'Very high',
        emoji: '🔥'
    }
}
