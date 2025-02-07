import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { IProject } from '../../../entities/Project/model/interfaces/project'
import { useProjects } from '../../../app/providers/ProjectsProvider'
import { usePopups } from '../../../app/providers/PopupsProvider'
import Popup from '../../../shared/UI/Popup'

const EditProjectPopup = () => {
    const { project, setProject, projects, setProjects } = useProjects()
    const { isEditProjectPopupHidden, setIsEditProjectPopupHidden } = usePopups()
    const [name, setName] = useState('')
    useEffect(() => {
        if (project) {
            setName(project.name)
        }
    }, [project])
    const handleEditProject = () => {
        if (!name.trim()) {
            alert('Project name is required')
            return
        }
        if (!project) return
        const updatedProject = { ...project, name }
        const updatedProjects = projects.map((p: IProject) =>
            p.id === project.id ? updatedProject : p
        )
        setProjects(updatedProjects)
        setProject(updatedProject)
        setIsEditProjectPopupHidden(true)
    }
    return (
        <Popup isHidden={isEditProjectPopupHidden} setIsHidden={setIsEditProjectPopupHidden}>
            <div className={styles.container}>
                <h2>Edit project</h2>
                <div className={styles.item}>
                    <label htmlFor=''>Project name</label>
                    <input
                        data-variant='main'
                        type='text'
                        placeholder='Some project'
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <button data-type='special' onClick={handleEditProject}>
                    Save
                </button>
            </div>
        </Popup>
    )
}

export default EditProjectPopup
