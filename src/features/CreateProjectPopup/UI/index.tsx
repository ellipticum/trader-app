import React, { useState } from 'react'
import styles from './styles.module.scss'
import { IProject } from '../../../entities/Project/model/interfaces/project'
import { useProjects } from '../../../app/providers/ProjectsProvider'
import { usePopups } from '../../../app/providers/PopupsProvider'
import Popup from '../../../shared/UI/Popup'

const CreateProjectPopup = () => {
    const { projects, setProjects } = useProjects()
    const { isProjectPopupHidden, setIsProjectPopupHidden } = usePopups()
    const [name, setName] = useState('')

    const handleCreateProject = () => {
        if (!name.trim()) {
            alert('Project name is required')
            return
        }

        const newProject: IProject = {
            id: Date.now(),
            name,
            tasks: []
        }

        setProjects([...projects, newProject])
        setIsProjectPopupHidden(true)

        setName('')
    }

    return (
        <Popup isHidden={isProjectPopupHidden} setIsHidden={setIsProjectPopupHidden}>
            <div className={styles.container}>
                <h2>Create project</h2>
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
                <button data-type='special' onClick={handleCreateProject}>
                    Create
                </button>
            </div>
        </Popup>
    )
}

export default CreateProjectPopup
