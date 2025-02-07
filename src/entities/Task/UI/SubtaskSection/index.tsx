// SubtaskSection.tsx
import { ChangeEvent, FC } from 'react'
import styles from './styles.module.scss'
import { ISubtask } from '../../model/interfaces/subtask'

interface Props {
    subtasks: ISubtask[]
    newSubtask: string
    setNewSubtask: (value: string) => void
    handleAddSubtask: () => void
    handleToggleSubtask: (id: number) => void
    handleDeleteSubtask: (id: number) => void
}

const SubtaskSection: FC<Props> = ({
    subtasks,
    newSubtask,
    setNewSubtask,
    handleAddSubtask,
    handleToggleSubtask,
    handleDeleteSubtask
}) => {
    return (
        <div className={styles.subtaskSection}>
            <h3 className={styles.heading}>Subtasks</h3>
            <div className={styles.subtaskList}>
                {subtasks.map((subtask) => (
                    <div
                        key={subtask.id}
                        className={styles.subtaskItem}
                        onClick={() => handleToggleSubtask(subtask.id)}
                    >
                        <div className={styles.part}>
                            <input type='checkbox' checked={subtask.isCompleted} readOnly />
                            <span className={subtask.isCompleted ? styles.completed : ''}>
                                {subtask.text}
                            </span>
                        </div>
                        <button
                            className={styles.deleteButton}
                            onClick={(event) => {
                                event.stopPropagation()
                                handleDeleteSubtask(subtask.id)
                            }}
                        >
                            &times;
                        </button>
                    </div>
                ))}
            </div>
            <div className={styles.subtaskInput}>
                <input
                    type='text'
                    placeholder='Add subtask'
                    value={newSubtask}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setNewSubtask(event.target.value)
                    }
                />
                <button data-type='special' onClick={handleAddSubtask}>
                    Add Subtask
                </button>
            </div>
        </div>
    )
}

export default SubtaskSection
