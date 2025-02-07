import Wrapper from '../../shared/UI/Wrapper'
import Projects from '../../entities/Project/UI/Projects'
import React from 'react'
import CreateProjectPopup from '../../features/CreateProjectPopup/UI'

const Page = () => {
    return (
        <Wrapper>
            <Projects />
            <CreateProjectPopup />
        </Wrapper>
    )
}

export default Page
