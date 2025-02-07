import { createContext, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { ITask } from '../../entities/Task/model/interfaces/task'
import { LayoutProps } from '../../shared/interfaces/layoutProps'
import { createContextHook } from '../../shared/helpers/createContextHook'

interface ITaskContext {
    task: ITask | null
    setTask: Dispatch<SetStateAction<ITask | null>>
}

const TaskContext = createContext<ITaskContext | undefined>(undefined)

export const useTask = createContextHook(TaskContext)

const TaskProvider: FC<LayoutProps> = ({ children }) => {
    const [task, setTask] = useState<ITask | null>(null)

    return <TaskContext.Provider value={{ task, setTask }}>{children}</TaskContext.Provider>
}

export default TaskProvider
