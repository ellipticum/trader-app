import React, { FC } from 'react'
import { ITask } from '../../model/interfaces/task'
import styles from './styles.module.scss'
import { priorityMap } from '../../model/data/priorityMap'
import { classNames } from '../../../../shared/helpers/classNames'
import { usePopups } from '../../../../app/providers/PopupsProvider'
import { useProjects } from '../../../../app/providers/ProjectsProvider'

interface Props {
    task: ITask
}

const Task: FC<Props> = ({ task }) => {
    const priority = priorityMap[task.priority]
    const { setTaskToEdit } = useProjects()
    const { setIsEditTaskPopupHidden } = usePopups()

    const onClick = () => {
        setTaskToEdit(task)
        setIsEditTaskPopupHidden(false)
    }

    return (
        <div className={classNames(styles.taskItem, styles[task.status])} onClick={onClick}>
            <p className={styles.name}>{task.name}</p>
            <div className={styles.info}>
                <p className={styles.status}>
                    <span>{priority.emoji}</span> <span>{priority.name}</span>
                </p>
                <div className={styles.meta}>
                    <p>tasks: {task.tasks.length}</p>
                    <p>/</p>
                    <p>comments: {task.comments.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Task
