import { useProjects } from '../../../../app/providers/ProjectsProvider'
import ProjectItem from '../ProjectItem'
import styles from './styles.module.scss'
import Container from '../../../../shared/UI/Container'
import CreateProjectFeature from '../../../../features/CreateProjectFeature/UI'
import UseMockFeature from '../../../../features/UseMockFeature/UI'

const Projects = () => {
    const { projects } = useProjects()

    return (
        <div className={styles.projects}>
            <Container>
                <div className={styles.content}>
                    <h1 className={styles.heading}>Projects</h1>
                    <div className={styles.items}>
                        {projects.map((project) => {
                            return <ProjectItem key={project.id} project={project} />
                        })}
                        <CreateProjectFeature />
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Projects
