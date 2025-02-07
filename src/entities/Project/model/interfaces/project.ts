import { ITask } from '../../../Task/model/interfaces/task'

export interface IProject {
    id: number
    name: string
    tasks: ITask[]
}
