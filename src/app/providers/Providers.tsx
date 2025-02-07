import React, { FC } from 'react'
import { LayoutProps } from '../../shared/interfaces/layoutProps'
import ProjectsProvider from './ProjectsProvider'
import TaskProvider from './TaskProvider'
import PopupsProvider from './PopupsProvider'

const Providers: FC<LayoutProps> = ({ children }) => {
    return (
        <PopupsProvider>
            <ProjectsProvider>
                <TaskProvider>{children}</TaskProvider>
            </ProjectsProvider>
        </PopupsProvider>
    )
}

export default Providers
