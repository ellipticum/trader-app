import React, { useState } from 'react'
import styles from './styles.module.scss'
import { TaskPriority } from '../../../entities/Task/model/enums/taskPriority'
import { TaskStatus } from '../../../entities/Task/model/enums/taskStatus'
import { priorityMap } from '../../../entities/Task/model/data/priorityMap'
import { useProjects } from '../../../app/providers/ProjectsProvider'
import { usePopups } from '../../../app/providers/PopupsProvider'
import { ITask } from '../../../entities/Task/model/interfaces/task'
import Popup from '../../../shared/UI/Popup'
import { validateTask } from '../../../entities/Task/model/helpers/validateTask'

const CreateTaskPopup = () => {
    const { project, setProject } = useProjects()
    const { isTaskPopupHidden, setIsTaskPopupHidden } = usePopups()

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [startsAt, setStartsAt] = useState('')
    const [endsAt, setEndsAt] = useState('')
    const [priority, setPriority] = useState<TaskPriority>(TaskPriority.Medium)

    const handleCreateTask = () => {
        if (!project) return

        const error = validateTask({ name, description, startsAt, endsAt })
        if (error) {
            alert(error)
            return
        }

        const newTask: ITask = {
            id: Date.now(),
            name,
            description,
            startsAt: new Date(startsAt),
            endsAt: new Date(endsAt),
            priority,
            status: TaskStatus.Todo,
            files: [],
            tasks: [],
            comments: []
        }

        setProject({
            ...project,
            tasks: [...project.tasks, newTask]
        })

        setIsTaskPopupHidden(true)

        // Сброс значений
        setName('')
        setDescription('')
        setStartsAt('')
        setEndsAt('')
        setPriority(TaskPriority.Medium)
    }

    return (
        <Popup isHidden={isTaskPopupHidden} setIsHidden={setIsTaskPopupHidden}>
            <div className={styles.container}>
                <h2>Create task</h2>
                <div className={styles.item}>
                    <label htmlFor=''>Title</label>
                    <input
                        data-variant='main'
                        type='text'
                        placeholder='Some task'
                        value={name}
                        onChange={(event) => setName(event.target.value)}
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
                        data-variant='main'
                        type='datetime-local'
                        value={startsAt}
                        onChange={(event) => setStartsAt(event.target.value)}
                    />
                </div>
                <div className={styles.item}>
                    <label htmlFor=''>End</label>
                    <input
                        data-variant='main'
                        type='datetime-local'
                        value={endsAt}
                        onChange={(event) => setEndsAt(event.target.value)}
                    />
                </div>
                <select
                    value={priority}
                    onChange={(event) => setPriority(event.target.value as TaskPriority)}
                >
                    {Object.values(TaskPriority).map((priority) => (
                        <option key={priority} value={priority}>
                            {priorityMap[priority].name}
                        </option>
                    ))}
                </select>
                <button data-type='special' onClick={handleCreateTask}>
                    Create
                </button>
            </div>
        </Popup>
    )
}

export default CreateTaskPopup
