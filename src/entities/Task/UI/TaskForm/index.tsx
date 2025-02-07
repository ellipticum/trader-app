import React, { ChangeEvent, FC } from 'react'
import styles from './styles.module.scss'
import { TaskPriority } from '../../model/enums/taskPriority'
import { priorityMap } from '../../model/data/priorityMap'
import { TaskStatus } from '../../model/enums/taskStatus'
import { statusMap } from '../../model/data/statusMap'

interface Props {
    name: string
    setName: (value: string) => void
    description: string
    setDescription: (value: string) => void
    startsAt: string
    setStartsAt: (value: string) => void
    endsAt: string
    setEndsAt: (value: string) => void
    priority: TaskPriority
    setPriority: (value: TaskPriority) => void
    status: TaskStatus
    setStatus: (value: TaskStatus) => void
}

const TaskForm: FC<Props> = ({
    name,
    setName,
    description,
    setDescription,
    startsAt,
    setStartsAt,
    endsAt,
    setEndsAt,
    priority,
    setPriority,
    status,
    setStatus
}) => {
    return (
        <div className={styles.form}>
            <div className={styles.item}>
                <label htmlFor=''>Title</label>
                <input
                    type='text'
                    placeholder='Some task'
                    value={name}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
                />
            </div>
            <div className={styles.item}>
                <label htmlFor=''>Description</label>
                <textarea
                    placeholder='It is some task about something'
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
            </div>
            <div className={styles.item}>
                <label htmlFor=''>Start</label>
                <input
                    type='datetime-local'
                    placeholder='Start'
                    value={startsAt}
                    onChange={(event) => setStartsAt(event.target.value)}
                />
            </div>
            <div className={styles.item}>
                <label htmlFor=''>End</label>
                <input
                    type='datetime-local'
                    placeholder='End'
                    value={endsAt}
                    onChange={(event) => setEndsAt(event.target.value)}
                />
            </div>
            <div className={styles.item}>
                <label htmlFor=''>Priority</label>
                <select
                    value={priority}
                    onChange={(event) => setPriority(event.target.value as TaskPriority)}
                >
                    {Object.values(TaskPriority).map((p) => (
                        <option key={p} value={p}>
                            {priorityMap[p].name}
                        </option>
                    ))}
                </select>
            </div>
            <div className={styles.item}>
                <label htmlFor=''>Status</label>
                <select
                    value={status}
                    onChange={(event) => setStatus(event.target.value as TaskStatus)}
                >
                    {Object.values(TaskStatus).map((s) => (
                        <option key={s} value={s}>
                            {statusMap[s].name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default TaskForm
