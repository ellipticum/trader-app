import { ChangeEvent, FC, useState } from 'react'
import styles from './styles.module.scss'
import { IComment } from '../../model/interfaces/comment'

interface Props {
    comments: IComment[]
    newComment: string
    setNewComment: (value: string) => void
    handleAddComment: () => void
    onReply: (path: number[], replyText: string) => void
}

interface CommentItemProps {
    comment: IComment
    path: number[]
    onReply: (path: number[], replyText: string) => void
}

const CommentItem: FC<CommentItemProps> = ({ comment, path, onReply }) => {
    const [isReplyActive, setIsReplyActive] = useState(false)
    const [replyText, setReplyText] = useState('')
    const handleSubmit = () => {
        if (!replyText.trim()) {
            alert('Reply cannot be empty')
            return
        }
        onReply(path, replyText)
        setReplyText('')
        setIsReplyActive(false)
    }
    return (
        <div className={styles.commentItem}>
            <p>{comment.text}</p>
            <div className={styles.bottom}>
                <small>{new Date(comment.createdAt).toLocaleString()}</small>
                <button
                    className={styles.replyButton}
                    onClick={() => setIsReplyActive(!isReplyActive)}
                >
                    Reply
                </button>
            </div>
            {isReplyActive && (
                <div className={styles.replyInput}>
                    <input
                        type='text'
                        placeholder='Write a reply'
                        value={replyText}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setReplyText(event.target.value)
                        }
                    />
                    <button className={styles.submitReplyButton} onClick={handleSubmit}>
                        Submit Reply
                    </button>
                </div>
            )}
            {comment.replies && comment.replies.length > 0 && (
                <div className={styles.replyGrid}>
                    {comment.replies.map((reply, idx) => (
                        <CommentItem
                            key={idx}
                            comment={reply}
                            path={[...path, idx]}
                            onReply={onReply}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

const CommentSection: FC<Props> = ({
    comments,
    newComment,
    setNewComment,
    handleAddComment,
    onReply
}) => {
    return (
        <div className={styles.commentSection}>
            <h3 className={styles.heading}>Comments</h3>
            <div className={styles.commentGrid}>
                {comments.map((comment, index) => (
                    <CommentItem key={index} comment={comment} path={[index]} onReply={onReply} />
                ))}
            </div>
            <div className={styles.commentInput}>
                <input
                    type='text'
                    placeholder='Add comment'
                    value={newComment}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setNewComment(event.target.value)
                    }
                />
                <button className={styles.button} onClick={handleAddComment}>
                    Add
                </button>
            </div>
        </div>
    )
}

export default CommentSection
