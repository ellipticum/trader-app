import { IProject } from '../interfaces/project'
import { TaskPriority } from '../../../Task/model/enums/taskPriority'
import { TaskStatus } from '../../../Task/model/enums/taskStatus'

export const mockProjects: IProject[] = [
    {
        id: 1,
        name: 'Project Alpha',
        tasks: [
            {
                id: 101,
                name: 'Design UI',
                description: 'Create the initial UI design for the application.',
                startsAt: new Date('2025-01-01T09:00:00'),
                endsAt: new Date('2025-01-05T17:00:00'),
                priority: TaskPriority.High,
                status: TaskStatus.Todo,
                files: [],
                tasks: [
                    { id: 1, text: 'Create wireframes', isCompleted: true },
                    { id: 2, text: 'Design color scheme', isCompleted: false }
                ],
                comments: [
                    {
                        text: 'Initial design phase started',
                        createdAt: new Date(),
                        replies: []
                    }
                ]
            },
            {
                id: 102,
                name: 'Develop Frontend',
                description: 'Implement the UI based on approved designs.',
                startsAt: new Date('2025-01-06T09:00:00'),
                endsAt: new Date('2025-01-15T17:00:00'),
                priority: TaskPriority.Medium,
                status: TaskStatus.InProgress,
                files: [],
                tasks: [
                    { id: 3, text: 'Setup project structure', isCompleted: true },
                    { id: 4, text: 'Implement main components', isCompleted: false }
                ],
                comments: [
                    {
                        text: 'Frontend development in progress',
                        createdAt: new Date(),
                        replies: [
                            {
                                text: 'Ensure compatibility with backend APIs',
                                createdAt: new Date(),
                                replies: []
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        id: 2,
        name: 'Project Beta',
        tasks: [
            {
                id: 104,
                name: 'Backend Architecture',
                description: 'Design the backend architecture for scalability.',
                startsAt: new Date('2025-02-01T09:00:00'),
                endsAt: new Date('2025-02-10T17:00:00'),
                priority: TaskPriority.VeryHigh,
                status: TaskStatus.InProgress,
                files: [],
                tasks: [
                    { id: 5, text: 'Define database schema', isCompleted: true },
                    { id: 6, text: 'Implement authentication module', isCompleted: false }
                ],
                comments: [
                    {
                        text: 'Initial discussion complete',
                        createdAt: new Date(),
                        replies: []
                    }
                ]
            },
            {
                id: 105,
                name: 'API Development',
                description: 'Develop RESTful APIs for frontend consumption.',
                startsAt: new Date('2025-02-11T09:00:00'),
                endsAt: new Date('2025-02-20T17:00:00'),
                priority: TaskPriority.High,
                status: TaskStatus.Todo,
                files: [],
                tasks: [
                    { id: 7, text: 'Define endpoints', isCompleted: true },
                    { id: 8, text: 'Implement JWT authentication', isCompleted: false }
                ],
                comments: [
                    {
                        text: 'Define endpoints and authentication',
                        createdAt: new Date(),
                        replies: []
                    }
                ]
            }
        ]
    },
    {
        id: 3,
        name: 'Project Gamma',
        tasks: [
            {
                id: 107,
                name: 'Market Research',
                description: 'Conduct market research for the new product.',
                startsAt: new Date('2025-03-01T09:00:00'),
                endsAt: new Date('2025-03-07T17:00:00'),
                priority: TaskPriority.Low,
                status: TaskStatus.Done,
                files: [],
                tasks: [
                    { id: 9, text: 'Survey target audience', isCompleted: true },
                    { id: 10, text: 'Analyze competitor pricing', isCompleted: true }
                ],
                comments: [
                    {
                        text: 'Completed market analysis',
                        createdAt: new Date(),
                        replies: [
                            {
                                text: 'Need more data on demographics',
                                createdAt: new Date(),
                                replies: []
                            }
                        ]
                    }
                ]
            }
        ]
    }
]
