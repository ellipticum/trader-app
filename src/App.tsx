import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Project from './pages/Project'
import Providers from './app/providers/Providers'

const App = () => {
    return (
        <Providers>
            <Router>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/project' element={<Project />} />
                    <Route path='*' element={<Home />} />
                </Routes>
            </Router>
        </Providers>
    )
}

export default App
