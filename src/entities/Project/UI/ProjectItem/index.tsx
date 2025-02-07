import React, { FC } from 'react'
import styles from './styles.module.scss'
import { IProject } from '../../model/interfaces/project'
import { useProjects } from '../../../../app/providers/ProjectsProvider'
import { classNames } from '../../../../shared/helpers/classNames'
import { useNavigate } from 'react-router-dom'

interface Props {
    project: IProject
}

const ProjectItem: FC<Props> = ({ project }) => {
    const navigate = useNavigate()

    const { project: activeProject, setProject } = useProjects()

    return (
        <div
            className={classNames(styles.projectItem, {
                [styles.active]: activeProject && activeProject.id === project.id
            })}
            onClick={() => {
                setProject(project)

                navigate('/project')
            }}
        >
            <p className={styles.name}>{project.name}</p>
            <div className={styles.info}>
                <p className={styles.small}>{project.id}</p>
                <p className={styles.small}>{project.tasks.length} tasks</p>
            </div>
        </div>
    )
}

export default ProjectItem
