import { useState } from 'react';
import AppLayout from '../../components/layouts/AppLayout';
import {  motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, Github,  } from 'lucide-react';
import AddProjectModal from '../../components/modals/addProjects';
import EditProjectModal from '../../components/modals/editProject';
import ProjectDetailModal from '../../components/modals/detailProject';

// Types
type Project = {
     id: number;
     title: string;
     description: string;
     stack: string[];
     githubLink: string;
     image: string;
};


// Main Project Component
export default function Project() {
     const [projects, setProjects] = useState<Project[]>([
          {
               id: 1,
               title: "E-commerce Platform",
               description: "Online store with payment integration",
               stack: ["React", "Node.js", "MongoDB"],
               githubLink: "https://github.com/example/ecommerce",
               image: "/project1.jpg"
          },
          {
               id: 2,
               title: "Health Tracking App",
               description: "Mobile app for fitness monitoring",
               stack: ["React Native", "Firebase"],
               githubLink: "https://github.com/example/health-app",
               image: "/project2.jpg"
          },
          {
               id: 3,
               title: "Portfolio Website",
               description: "Creative showcase for designers",
               stack: ["Next.js", "Tailwind CSS"],
               githubLink: "https://github.com/example/portfolio",
               image: "/project3.jpg"
          },
          {
               id: 4,
               title: "Task Management",
               description: "Team collaboration tool",
               stack: ["Vue.js", "Express", "PostgreSQL"],
               githubLink: "https://github.com/example/task-manager",
               image: "/project4.jpg"
          }
     ]);

     const [showAddModal, setShowAddModal] = useState(false);
     const [showEditModal, setShowEditModal] = useState(false);
     const [showDetailModal, setShowDetailModal] = useState(false);
     const [selectedProject, setSelectedProject] = useState<Project | null>(null);

     const handleAddProject = (project: Omit<Project, 'id'>) => {
          const newProject = {
               ...project,
               id: Math.max(0, ...projects.map(p => p.id)) + 1
          };
          setProjects([...projects, newProject]);
     };

     const handleEditProject = (updatedProject: Project) => {
          setProjects(projects.map(p => p.id === updatedProject.id ? updatedProject : p));
     };

     const handleDeleteProject = (id: number) => {
          setProjects(projects.filter(p => p.id !== id));
     };

     return (
          <AppLayout>
               <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="p-6"
               >
                    {/* Header Section */}
                    <div className="flex justify-between items-center mb-8">
                         <motion.h1
                              className="text-3xl font-bold text-[#1F3A5F]"
                              whileHover={{ scale: 1.01 }}
                         >
                              Manage Projects
                         </motion.h1>
                         <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center gap-2 bg-[#3D5A80] hover:bg-[#4d648d] text-[#cee8ff] px-4 py-2 rounded-lg transition-colors"
                              onClick={() => setShowAddModal(true)}
                         >
                              <Plus size={18} />
                              Add New Project
                         </motion.button>
                    </div>

                    {/* Projects Grid */}
                    <motion.div
                         className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                         initial={{ y: 20, opacity: 0 }}
                         animate={{ y: 0, opacity: 1 }}
                         transition={{ duration: 0.5, delay: 0.2 }}
                    >
                         {projects.map((project) => (
                              <motion.div
                                   key={project.id}
                                   className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-[#e0e0e0]"
                                   whileHover={{ y: -5 }}
                                   layout
                              >
                                   <div className="h-40 bg-[#acc2ef] flex items-center justify-center">
                                        {project.image ? (
                                             <img
                                                  src={project.image}
                                                  alt={project.title}
                                                  className="w-full h-full object-cover"
                                             />
                                        ) : (
                                             <span className="text-[#1F3A5F] font-medium">Project Image</span>
                                        )}
                                   </div>

                                   <div className="p-4">
                                        <h3 className="text-lg font-semibold text-[#1F3A5F] mb-1">{project.title}</h3>
                                        <p className="text-sm text-[#4d648d] mb-2 line-clamp-2">{project.description}</p>

                                        <div className="flex flex-wrap gap-1 mb-4">
                                             {project.stack.slice(0, 3).map((tech, index) => (
                                                  <span key={index} className="px-2 py-0.5 bg-[#e0e0e0] text-gray-700 rounded-full text-xs">
                                                       {tech}
                                                  </span>
                                             ))}
                                             {project.stack.length > 3 && (
                                                  <span className="px-2 py-0.5 bg-[#e0e0e0] text-gray-700 rounded-full text-xs">
                                                       +{project.stack.length - 3}
                                                  </span>
                                             )}
                                        </div>

                                        <div className="flex justify-between">
                                             <motion.button
                                                  whileHover={{ scale: 1.1 }}
                                                  whileTap={{ scale: 0.9 }}
                                                  className="text-[#3D5A80] hover:text-[#1F3A5F]"
                                                  title="View Details"
                                                  onClick={() => {
                                                       setSelectedProject(project);
                                                       setShowDetailModal(true);
                                                  }}
                                             >
                                                  <Eye size={18} />
                                             </motion.button>

                                             <div className="flex gap-3">
                                                  <motion.button
                                                       whileHover={{ scale: 1.1 }}
                                                       whileTap={{ scale: 0.9 }}
                                                       className="text-[#3D5A80] hover:text-[#1F3A5F]"
                                                       title="Edit"
                                                       onClick={() => {
                                                            setSelectedProject(project);
                                                            setShowEditModal(true);
                                                       }}
                                                  >
                                                       <Edit size={18} />
                                                  </motion.button>

                                                  <motion.button
                                                       whileHover={{ scale: 1.1 }}
                                                       whileTap={{ scale: 0.9 }}
                                                       className="text-red-500 hover:text-red-700"
                                                       title="Delete"
                                                       onClick={() => handleDeleteProject(project.id)}
                                                  >
                                                       <Trash2 size={18} />
                                                  </motion.button>
                                             </div>
                                        </div>
                                   </div>
                              </motion.div>
                         ))}
                    </motion.div>
               </motion.div>

               {/* Modals */}
               <AddProjectModal
                    isOpen={showAddModal}
                    onClose={() => setShowAddModal(false)}
                    onAdd={handleAddProject}
               />

               <EditProjectModal
                    isOpen={showEditModal}
                    onClose={() => setShowEditModal(false)}
                    project={selectedProject}
                    onEdit={handleEditProject}
               />

               <ProjectDetailModal
                    isOpen={showDetailModal}
                    onClose={() => setShowDetailModal(false)}
                    project={selectedProject}
               />
          </AppLayout>
     );
}