import { FC } from 'react'
import styles from './styles.module.scss'
import Header from '../Header'
import { LayoutProps } from '../../interfaces/layoutProps'

const Wrapper: FC<LayoutProps> = ({ children }) => {
    return (
        <div className={styles.wrapper}>
            <Header />
            <main className={styles.main}>{children}</main>
        </div>
    )
}

export default Wrapper
