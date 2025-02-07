import { IComment } from './comment'
import { TaskPriority } from '../enums/taskPriority'
import { TaskStatus } from '../enums/taskStatus'
import { ISubtask } from './subtask'

export interface ITask {
    id: number
    name: string
    description: string
    startsAt: Date
    endsAt: Date
    priority: TaskPriority
    status: TaskStatus
    files: File[]
    tasks: ISubtask[]
    comments: IComment[]
}
