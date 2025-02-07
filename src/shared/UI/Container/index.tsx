import styles from './styles.module.scss'
import { FC } from 'react'
import { LayoutProps } from '../../interfaces/layoutProps'

const Container: FC<LayoutProps> = ({ children }) => {
    return <div className={styles.container}>{children}</div>
}

export default Container
