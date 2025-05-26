import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/home/home"
import Project from "./pages/projects/project"
import AddProject from "./pages/projects/add_form_project"
import EditProject from "./pages/projects/edit_form_project"
import ExperiencePage from "./pages/experience/experience"
import AddExperience from "./pages/experience/add_form_experience"
import EditExperience from "./pages/experience/edit_form_experience"
export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Project/>} />
        <Route path="/add-project" element={<AddProject/>} />
        <Route path="/edit-project/:id" element={<EditProject />} />
        <Route path="/experience" element={<ExperiencePage/> } />
        <Route path="/add-experience" element={<AddExperience/> } />
        <Route path="/edit-experience/:id" element={<EditExperience/> } />
       </Routes>
    </Router>
  )
}
