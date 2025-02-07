// TaskPopup.tsx
import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import Popup from '../../../shared/UI/Popup'
import styles from './styles.module.scss'
import { TaskPriority } from '../../../entities/Task/model/enums/taskPriority'
import { TaskStatus } from '../../../entities/Task/model/enums/taskStatus'
import { useProjects } from '../../../app/providers/ProjectsProvider'
import { usePopups } from '../../../app/providers/PopupsProvider'
import { validateTask } from '../../../entities/Task/model/helpers/validateTask'
import { validateImages } from '../../../entities/Task/model/helpers/validateImages'
import { IComment } from '../../../entities/Task/model/interfaces/comment'
import { ISubtask } from '../../../entities/Task/model/interfaces/subtask'
import SubtaskSection from '../../../entities/Task/UI/SubtaskSection'
import FileSection from '../../../entities/Task/UI/FileSection'
import CommentSection from '../../../entities/Task/UI/CommentSection'
import TaskForm from '../../../entities/Task/UI/TaskForm'

const TaskPopup: FC = () => {
    const { project, setProject, taskToEdit, setTaskToEdit } = useProjects()
    const { isEditTaskPopupHidden, setIsEditTaskPopupHidden } = usePopups()
    const [draftTask, setDraftTask] = useState<any>(null)
    const [newComment, setNewComment] = useState('')
    const [newSubtask, setNewSubtask] = useState('')

    useEffect(() => {
        if (taskToEdit) setDraftTask({ ...taskToEdit })
    }, [taskToEdit])

    const handleAddComment = () => {
        if (!newComment.trim() || !draftTask) {
            alert('Comment cannot be empty')
            return
        }
        const comment: IComment = { text: newComment, createdAt: new Date(), replies: [] }
        const updatedComments = draftTask.comments ? [...draftTask.comments, comment] : [comment]
        setDraftTask({ ...draftTask, comments: updatedComments })
        setNewComment('')
    }

    const handleAddSubtask = () => {
        if (!newSubtask.trim() || !draftTask) {
            alert('Subtask text cannot be empty')
            return
        }
        const subtask: ISubtask = { id: Date.now(), text: newSubtask, isCompleted: false }
        const updatedSubtasks = draftTask.tasks ? [...draftTask.tasks, subtask] : [subtask]
        setDraftTask({ ...draftTask, tasks: updatedSubtasks })
        setNewSubtask('')
    }

    const handleToggleSubtask = (id: number) => {
        if (draftTask && draftTask.tasks) {
            const updatedSubtasks = draftTask.tasks.map((subtask: ISubtask) =>
                subtask.id === id ? { ...subtask, isCompleted: !subtask.isCompleted } : subtask
            )
            setDraftTask({ ...draftTask, tasks: updatedSubtasks })
        }
    }

    const handleDeleteSubtask = (id: number) => {
        if (draftTask && draftTask.tasks) {
            const updatedSubtasks = draftTask.tasks.filter((subtask: ISubtask) => subtask.id !== id)
            setDraftTask({ ...draftTask, tasks: updatedSubtasks })
        }
    }

    const addReplyToComment = (comments: any[], path: number[], newReply: any): any[] => {
        if (path.length === 0) return comments
        const index = path[0]
        return comments.map((comment, i) => {
            if (i !== index) return comment
            if (path.length === 1) {
                if (comment.replies.length >= 10) {
                    alert('Maximum 10 replies allowed')
                    return comment
                }
                return { ...comment, replies: [...comment.replies, newReply] }
            }
            return {
                ...comment,
                replies: addReplyToComment(comment.replies, path.slice(1), newReply)
            }
        })
    }

    const handleReply = (path: number[], replyText: string) => {
        if (!draftTask) return
        const newReply: IComment = { text: replyText, createdAt: new Date(), replies: [] }
        const updatedComments = draftTask.comments
            ? addReplyToComment(draftTask.comments, path, newReply)
            : []
        setDraftTask({ ...draftTask, comments: updatedComments })
    }

    const handleUpdateTask = () => {
        if (!project || !draftTask) return
        const error = validateTask({
            name: draftTask.name,
            description: draftTask.description,
            startsAt: new Date(draftTask.startsAt).toISOString(),
            endsAt: new Date(draftTask.endsAt).toISOString()
        })
        if (error) {
            alert(error)
            return
        }
        const updatedTasks = project.tasks.map((task: any) =>
            task.id === draftTask.id ? { ...draftTask } : task
        )
        const updatedProject = { ...project, tasks: updatedTasks }
        setProject(updatedProject)
        setTaskToEdit(null)
        setIsEditTaskPopupHidden(true)
    }

    return (
        <Popup
            isSpecial
            className={styles.popup}
            isHidden={isEditTaskPopupHidden}
            setIsHidden={setIsEditTaskPopupHidden}
        >
            <div className={styles.container}>
                <div className={styles.top}>
                    <h2>View / Edit Task</h2>
                    <span>Don't forget to save the changes.</span>
                </div>
                <div className={styles.content}>
                    <TaskForm
                        name={draftTask?.name || ''}
                        setName={(value: string) =>
                            setDraftTask(draftTask ? { ...draftTask, name: value } : null)
                        }
                        description={draftTask?.description || ''}
                        setDescription={(value: string) =>
                            setDraftTask(draftTask ? { ...draftTask, description: value } : null)
                        }
                        startsAt={
                            draftTask?.startsAt
                                ? new Date(draftTask.startsAt).toISOString().slice(0, 16)
                                : ''
                        }
                        setStartsAt={(value: string) =>
                            setDraftTask(
                                draftTask ? { ...draftTask, startsAt: new Date(value) } : null
                            )
                        }
                        endsAt={
                            draftTask?.endsAt
                                ? new Date(draftTask.endsAt).toISOString().slice(0, 16)
                                : ''
                        }
                        setEndsAt={(value: string) =>
                            setDraftTask(
                                draftTask ? { ...draftTask, endsAt: new Date(value) } : null
                            )
                        }
                        priority={draftTask?.priority || TaskPriority.Medium}
                        setPriority={(value: TaskPriority) =>
                            setDraftTask(draftTask ? { ...draftTask, priority: value } : null)
                        }
                        status={draftTask?.status || TaskStatus.Todo}
                        setStatus={(value: TaskStatus) =>
                            setDraftTask(draftTask ? { ...draftTask, status: value } : null)
                        }
                    />
                    <div className={styles.part}>
                        {draftTask && <FileSection taskId={draftTask.id} />}
                        <SubtaskSection
                            subtasks={draftTask?.tasks || []}
                            newSubtask={newSubtask}
                            setNewSubtask={setNewSubtask}
                            handleAddSubtask={handleAddSubtask}
                            handleToggleSubtask={handleToggleSubtask}
                            handleDeleteSubtask={handleDeleteSubtask}
                        />
                    </div>
                </div>
                <CommentSection
                    comments={draftTask?.comments || []}
                    newComment={newComment}
                    setNewComment={setNewComment}
                    handleAddComment={handleAddComment}
                    onReply={handleReply}
                />
                <button data-type='special' className={styles.button} onClick={handleUpdateTask}>
                    Save Changes
                </button>
            </div>
        </Popup>
    )
}

export default TaskPopup
