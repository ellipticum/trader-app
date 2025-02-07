import { createContext, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { IProject } from '../../entities/Project/model/interfaces/project'
import { LayoutProps } from '../../shared/interfaces/layoutProps'
import { createContextHook } from '../../shared/helpers/createContextHook'

interface IProjectsContext {
    projects: IProject[]
    setProjects: Dispatch<SetStateAction<IProject[]>>
    project: IProject | null
    setProject: Dispatch<SetStateAction<IProject | null>>
    filteredProject: IProject | null
    setFilteredProject: Dispatch<SetStateAction<IProject | null>>
    searchQuery: string
    setSearchQuery: Dispatch<SetStateAction<string>>
    taskToEdit: any
    setTaskToEdit: Dispatch<SetStateAction<any>>
}

const ProjectsContext = createContext<IProjectsContext | undefined>(undefined)

export const useProjects = createContextHook(ProjectsContext)

const ProjectsProvider: FC<LayoutProps> = ({ children }) => {
    const [projects, setProjects] = useState<IProject[]>([])
    const [project, setProject] = useState<IProject | null>(null)
    const [filteredProject, setFilteredProject] = useState<IProject | null>(null)
    const [searchQuery, setSearchQuery] = useState<string>('')
    const [taskToEdit, setTaskToEdit] = useState<any>(null)

    useEffect(() => {
        const savedProjects = localStorage.getItem('projects') || JSON.stringify([])

        const projects = JSON.parse(savedProjects)

        setProjects(projects)

        const projectId = localStorage.getItem('projectId')

        console.log(projectId)

        if (!projectId) return

        setProject(projects.find((proj: IProject) => proj.id === Number(projectId)) || null)
    }, [])

    useEffect(() => {
        if (!project) return

        setProjects((prevState) =>
            prevState.map((item) => (item.id === project.id ? project : item))
        )

        localStorage.setItem('projectId', JSON.stringify(project.id))
    }, [project])

    useEffect(() => {
        if (!project) {
            setFilteredProject(null)

            return
        }

        setFilteredProject({
            ...project,
            tasks: searchQuery
                ? project.tasks.filter((task) => {
                      const id = String(task.id)
                      return (
                          id.toLowerCase().includes(searchQuery) ||
                          task.name.toLowerCase().includes(searchQuery)
                      )
                  })
                : project.tasks
        })
    }, [project, searchQuery])

    useEffect(() => {
        if (projects.length === 0) {
            return
        }

        localStorage.setItem('projects', JSON.stringify(projects))
    }, [projects])

    useEffect(() => {
        if (project && taskToEdit) {
            const updatedTasks = project.tasks.map((task: any) =>
                task.id === taskToEdit.id ? taskToEdit : task
            )
            const updatedProject = { ...project, tasks: updatedTasks }
            setProject(updatedProject)
            setProjects((prevProjects) =>
                prevProjects.map((proj: IProject) =>
                    proj.id === updatedProject.id ? updatedProject : proj
                )
            )
        }
    }, [taskToEdit])

    return (
        <ProjectsContext.Provider
            value={{
                projects,
                setProjects,
                project,
                setProject,
                filteredProject,
                setFilteredProject,
                searchQuery,
                setSearchQuery,
                taskToEdit,
                setTaskToEdit
            }}
        >
            {children}
        </ProjectsContext.Provider>
    )
}

export default ProjectsProvider
