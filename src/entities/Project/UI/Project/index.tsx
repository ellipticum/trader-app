import React, { FC, useEffect, useMemo, useState } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult, DragUpdate } from '@hello-pangea/dnd'
import { useProjects } from '../../../../app/providers/ProjectsProvider'
import styles from './styles.module.scss'
import Container from '../../../../shared/UI/Container'
import { TaskStatus } from '../../../Task/model/enums/taskStatus'
import { statusMap } from '../../../Task/model/data/statusMap'
import TaskItem from '../../../Task/UI/TaskItem'
import { classNames } from '../../../../shared/helpers/classNames'
import { usePopups } from '../../../../app/providers/PopupsProvider'

const Project: FC = () => {
    const {
        project,
        setProject,
        filteredProject,
        searchQuery,
        setSearchQuery,
        projects,
        setProjects
    } = useProjects()

    const { isTaskPopupHidden, setIsTaskPopupHidden, setIsEditProjectPopupHidden } = usePopups()

    const [isExpanded, setIsExpanded] = useState<boolean>(false)

    const [activeStatus, setActiveStatus] = useState<TaskStatus>(TaskStatus.Todo)
    // Состояние для отслеживания, над каким табом находится перетаскиваемая карточка
    const [draggingOverTab, setDraggingOverTab] = useState<string | null>(null)

    useEffect(() => {
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024) {
                setIsExpanded(true)
            }
        })
    }, [])

    const columns = useMemo(() => {
        if (!filteredProject) {
            return []
        }

        return Object.values(TaskStatus).map((status) => ({
            status,
            data: statusMap[status],
            tasks: filteredProject.tasks.filter((task) => task.status === status)
        }))
    }, [filteredProject])

    if (!filteredProject || !project) {
        return (
            <Container>
                <div className={styles.plug}>You need to select some project</div>
            </Container>
        )
    }

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result

        // Сбрасываем состояние при окончании перетаскивания
        setDraggingOverTab(null)

        if (!destination) return
        if (source.droppableId === destination.droppableId && source.index === destination.index)
            return

        const taskId = parseInt(result.draggableId, 10)
        const taskToMove = project.tasks.find((task) => task.id === taskId)
        if (!taskToMove) return

        let newStatus: TaskStatus
        if (destination.droppableId.endsWith('_tab')) {
            newStatus = destination.droppableId.replace('_tab', '') as TaskStatus
        } else {
            newStatus = destination.droppableId as TaskStatus
        }

        const updatedTasks = project.tasks.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
        )
        setProject({ ...project, tasks: updatedTasks })
    }

    const onDragUpdate = (update: DragUpdate) => {
        if (update.destination && update.destination.droppableId.endsWith('_tab')) {
            setDraggingOverTab(update.destination.droppableId)
        } else {
            setDraggingOverTab(null)
        }
    }

    const handleDeleteProject = () => {
        if (!project) return

        if (window.confirm('Are you sure you want to delete this project?')) {
            const updatedProjects = projects.filter((p) => p.id !== project.id)

            setProjects(updatedProjects)
            setProject(null)

            localStorage.setItem('projects', JSON.stringify(updatedProjects))
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
            <div className={styles.project}>
                <Container>
                    <div className={styles.content}>
                        <div className={styles.top}>
                            <p className={styles.name}>{filteredProject.name}</p>
                            <div className={styles.block}>
                                <input
                                    className={styles.input}
                                    type='text'
                                    placeholder='search'
                                    value={searchQuery}
                                    onChange={(event) =>
                                        setSearchQuery(event.target.value.toLowerCase())
                                    }
                                />
                            </div>
                            <div className={styles.buttons}>
                                <button
                                    className={styles.button}
                                    onClick={() => setIsTaskPopupHidden(false)}
                                >
                                    Add task
                                </button>
                                <button
                                    className={styles.button}
                                    onClick={() => setIsEditProjectPopupHidden(false)}
                                >
                                    Edit project
                                </button>
                                <button className={styles.button} onClick={handleDeleteProject}>
                                    Delete project
                                </button>
                            </div>
                        </div>
                        <div className={styles.tabsLogic}>
                            <button
                                className={styles.expandButton}
                                onClick={() => setIsExpanded((prevState) => !prevState)}
                            >
                                {isExpanded ? 'Collapse' : 'Expand'} tabs
                            </button>
                            <div
                                className={classNames(styles.statusButtons, {
                                    [styles.expanded]: isExpanded
                                })}
                            >
                                {columns.map((column) => (
                                    <Droppable
                                        key={`${column.status}_tab`}
                                        droppableId={`${column.status}_tab`}
                                    >
                                        {(provided, snapshot) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                className={classNames(styles.tabWrapper, {
                                                    [styles.highlightTab]: snapshot.isDraggingOver
                                                })}
                                            >
                                                <button
                                                    className={styles.button}
                                                    onClick={() => setActiveStatus(column.status)}
                                                >
                                                    {statusMap[column.status].name}
                                                </button>
                                                {/* provided.placeholder не требуется для табов */}
                                            </div>
                                        )}
                                    </Droppable>
                                ))}
                            </div>
                        </div>
                        <div className={styles.columns}>
                            {columns.map((column) => {
                                const { status, data, tasks } = column

                                return (
                                    <Droppable key={status} droppableId={status}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.droppableProps}
                                                className={classNames(styles.column, {
                                                    [styles.hidden]: status !== activeStatus
                                                })}
                                            >
                                                <p className={styles.columnName}>{data.name}</p>
                                                <div className={styles.tasks}>
                                                    {tasks.map((task, index) => (
                                                        <Draggable
                                                            key={String(task.id)}
                                                            draggableId={String(task.id)}
                                                            index={index}
                                                            isDragDisabled={!isExpanded}
                                                        >
                                                            {(provided, snapshot) => {
                                                                let extraClass = ''
                                                                if (
                                                                    snapshot.isDragging &&
                                                                    draggingOverTab
                                                                ) {
                                                                    const targetStatus =
                                                                        draggingOverTab.replace(
                                                                            '_tab',
                                                                            ''
                                                                        )
                                                                    extraClass =
                                                                        styles[targetStatus]
                                                                }
                                                                return (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        className={classNames(
                                                                            styles.taskWrapper,
                                                                            extraClass
                                                                        )}
                                                                    >
                                                                        <TaskItem task={task} />
                                                                    </div>
                                                                )
                                                            }}
                                                        </Draggable>
                                                    ))}
                                                    {provided.placeholder}
                                                </div>
                                            </div>
                                        )}
                                    </Droppable>
                                )
                            })}
                        </div>
                    </div>
                </Container>
            </div>
        </DragDropContext>
    )
}

export default Project
