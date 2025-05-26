import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import ProjectDetailModal from '../../components/modals/detailProject';
import { useProjects } from '../../hooks/useProject';
import type { Project } from '../../api/types';
import AppLayout from '../../components/layouts/AppLayout';
import { Link } from 'react-router-dom';

const ProjectPage: React.FC = () => {
     const {
          projects,
          loading,
          error,
          createProject,
          editProject,
          removeProject
     } = useProjects();

     const [modalState, setModalState] = useState<{
          add: boolean;
          edit: boolean;
          detail: boolean;
     }>({
          add: false,
          edit: false,
          detail: false,
     });

     const [selectedProject, setSelectedProject] = useState<Project | null>(null);

     const handleOpenModal = (type: keyof typeof modalState, project?: Project) => {
          if (project) setSelectedProject(project);
          setModalState(prev => ({ ...prev, [type]: true }));
     };

     const handleCloseModal = (type: keyof typeof modalState) => {
          setModalState(prev => ({ ...prev, [type]: false }));
          setSelectedProject(null);
     };

     const handleAdd = async (project: Omit<Project, 'id'>) => {
          await createProject(project);
          handleCloseModal('add');
     };

     const handleEdit = async (updatedProject: Project) => {
          if (!selectedProject) return;

          try {
               await editProject(selectedProject.id, updatedProject);
               handleCloseModal('edit');
          } catch (error) {
               console.error('Error updating project:', error);
          }
     };

     const handleDelete = async (id: number) => {
          await removeProject(id);
     };

     if (loading) return <div className="p-6">Loading projects...</div>;
     if (error) return <div className="p-6 text-red-500">Error: {error.message}</div>;

     const parseStack = (stackString: string): string[] => {
          return stackString.split(',').map(tech => tech.trim());
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
                         <Link to={'/add-project'}>
                              <motion.button
                                   whileHover={{ scale: 1.05 }}
                                   whileTap={{ scale: 0.95 }}
                                   className="flex items-center gap-2 bg-[#3D5A80] hover:bg-[#4d648d] text-[#cee8ff] px-4 py-2 rounded-lg transition-colors"

                              >
                                   <Plus size={18} />

                                   Add Project

                              </motion.button>
                         </Link>
                    </div>

                    {/* Projects Grid */}
                    <motion.div
                         className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                         initial={{ y: 20, opacity: 0 }}
                         animate={{ y: 0, opacity: 1 }}
                         transition={{ duration: 0.5, delay: 0.2 }}
                    >
                         {projects.map((project) => {
                              const techStack = parseStack(project.stack);

                              return (
                                   <motion.div
                                        key={project.id}
                                        className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-[#e0e0e0]"
                                        whileHover={{ y: -5 }}
                                        layout
                                   >
                                        <div className="h-40 bg-[#acc2ef] flex items-center justify-center">
                                             {project.image && typeof project.image === 'string' ? (
                                                  <img
                                                       src={project.image}
                                                       alt={project.name}
                                                       className="w-full h-full object-cover"
                                                  />
                                             ) : (
                                                  <span className="text-[#1F3A5F] font-medium">Project Image</span>
                                             )}
                                        </div>

                                        <div className="p-4">
                                             <h3 className="text-lg font-semibold text-[#1F3A5F] mb-1">{project.name}</h3>
                                             <p className="text-sm text-[#4d648d] mb-2 line-clamp-2">{project.desc}</p>

                                             <div className="flex flex-wrap gap-1 mb-4">
                                                  {techStack.slice(0, 3).map((tech, index) => (
                                                       <span key={index} className="px-2 py-0.5 bg-[#e0e0e0] text-gray-700 rounded-full text-xs">
                                                            {tech}
                                                       </span>
                                                  ))}
                                                  {techStack.length > 3 && (
                                                       <span className="px-2 py-0.5 bg-[#e0e0e0] text-gray-700 rounded-full text-xs">
                                                            +{techStack.length - 3}
                                                       </span>
                                                  )}
                                             </div>

                                             <div className="flex justify-between">
                                                  <motion.button
                                                       whileHover={{ scale: 1.1 }}
                                                       whileTap={{ scale: 0.9 }}
                                                       className="text-[#3D5A80] hover:text-[#1F3A5F]"
                                                       title="View Details"
                                                       onClick={() => handleOpenModal('detail', project)}
                                                  >
                                                       <Eye size={18} />
                                                  </motion.button>

                                                  <div className="flex gap-3">
                                                       <Link to={`/edit-project/${project.ID}`}>
                                                        <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            className="text-[#3D5A80] hover:text-[#1F3A5F]"
                                                            title="Edit"
                                                       >
                                                            <Edit size={18} />
                                                       </motion.button>
                                                       </Link>
                                                       <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            className="text-red-500 hover:text-red-700"
                                                            title="Delete"
                                                            onClick={() => handleDelete(project.ID)}
                                                       >
                                                            <Trash2 size={18} />
                                                       </motion.button>
                                                  </div>
                                             </div>
                                        </div>
                                   </motion.div>
                              );
                         })}
                    </motion.div>
               </motion.div>

               {selectedProject && (
                    <>
                         <ProjectDetailModal
                              isOpen={modalState.detail}
                              onClose={() => handleCloseModal('detail')}
                              project={selectedProject}
                         />
                    </>
               )}
          </AppLayout>
     );
};

export default ProjectPage;