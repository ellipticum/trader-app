import React from 'react'
import styles from './styles.module.scss'
import { useProjects } from '../../../app/providers/ProjectsProvider'
import { mockProjects } from '../../../entities/Project/model/data/mockProjects'

const UseMockFeature = () => {
    const { setProjects } = useProjects()

    const onClick = () => {
        setProjects(mockProjects)
    }

    return (
        <>
            <div className={styles.useMockFeature} onClick={onClick}>
                Use mock data
            </div>
        </>
    )
}

export default UseMockFeature
