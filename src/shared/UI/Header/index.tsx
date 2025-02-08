import styles from './styles.module.scss'
import { Link, useLocation } from 'react-router-dom'
import { classNames } from '../../helpers/classNames'
import { useProjects } from '../../../app/providers/ProjectsProvider'
import { mockProjects } from '../../../entities/Project/model/data/mockProjects'

const Header = () => {
    const location = useLocation()

    const { setProjects, setProject } = useProjects()

    const links = [
        {
            pathname: '/',
            name: 'Home'
        },
        {
            pathname: '/project',
            name: 'To project'
        }
    ]

    const reset = () => {
        setProjects([])

        setProject(null)

        localStorage.removeItem('projects')
        localStorage.removeItem('projectId')
    }

    const setMockData = () => {
        setProjects(mockProjects)
        setProject(null)
    }

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                {links.map(({ pathname, name }) => (
                    <Link
                        key={pathname}
                        className={classNames(styles.item, {
                            [styles.active]: location.pathname === pathname
                        })}
                        to={pathname}
                    >
                        {name}
                    </Link>
                ))}
                <button className={styles.item} onClick={() => setMockData()}>
                    use mock data
                </button>
                <button className={styles.item} onClick={() => reset()}>
                    reset all
                </button>
            </nav>
        </header>
    )
}

export default Header
