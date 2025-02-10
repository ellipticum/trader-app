import React, { Dispatch, FC, ReactNode, SetStateAction } from 'react'
import styles from './styles.module.scss'
import { classNames } from '../../helpers/classNames'

interface Props {
    isHidden: boolean
    children: ReactNode
    setIsHidden: Dispatch<SetStateAction<boolean>>
    isSpecial?: boolean
    className?: string
}

const Popup: FC<Props> = ({ className, children, isHidden, setIsHidden, isSpecial }) => {
    const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            setIsHidden(true)
        }
    }

    return (
        <div
            className={classNames(styles.overlay, { [styles.hidden]: isHidden })}
            onClick={onClick}
        >
            <div className={classNames(styles.popup, className)}>
                {children}
                <button className={styles.closeButton} onClick={() => setIsHidden(true)}>
                    ✖
                </button>
            </div>
        </div>
    )
}

export default Popup
