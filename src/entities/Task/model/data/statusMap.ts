import { TaskStatus } from '../enums/taskStatus'

export const statusMap = {
    [TaskStatus.Todo]: {
        name: 'To do',
        emoji: '📝'
    },
    [TaskStatus.InProgress]: {
        name: 'In progress',
        emoji: '⏳'
    },
    [TaskStatus.Done]: {
        name: 'Done',
        emoji: '✅'
    }
}
