import React from 'react'
import styles from './styles.module.scss'
import { usePopups } from '../../../app/providers/PopupsProvider'

const CreateProjectFeature = () => {
    const { setIsProjectPopupHidden } = usePopups()

    const onClick = () => {
        setIsProjectPopupHidden(false)
    }

    return (
        <>
            <div className={styles.createProjectFeature} onClick={onClick}>
                Create new project
            </div>
        </>
    )
}

export default CreateProjectFeature
