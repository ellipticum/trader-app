import Wrapper from '../../shared/UI/Wrapper'
import Project from '../../entities/Project/UI/Project'
import CreateTaskPopup from '../../features/CreateTaskPopup/UI'
import EditProjectPopup from '../../features/EditProjectPopup/UI'
import TaskPopup from '../../features/TaskPopup/UI'

const Page = () => {
    return (
        <Wrapper>
            <Project />
            <TaskPopup />
            <CreateTaskPopup />
            <EditProjectPopup />
        </Wrapper>
    )
}

export default Page
