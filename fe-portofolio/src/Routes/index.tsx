import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "../Pages/Home"
import ProjectPage from "../Pages/Project/project"
import ExperiencePage from "../Pages/Experience/experience"
import StackPage from "../Pages/Stack/stack"
export default function RouterApp() {
  return (
       <Router>
            <Routes>
                 <Route path="/" element={<Home />} />
                 <Route path="/project" element={<ProjectPage />} />
                 <Route path="/experience" element={<ExperiencePage />} />
                 <Route path="/tech-stack" element={<StackPage/>} />
            </Routes>
     </Router>
  )
}
