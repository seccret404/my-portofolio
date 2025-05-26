import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import ExperienceDetailModal from '../../components/modals/detailExperience';
import AppLayout from '../../components/layouts/AppLayout';
import { Link } from 'react-router-dom';
import apiClient from '../../api/apiClient';

export interface Experience {
     ID: number;
     CreatedAt?: string;
     UpdatedAt?: string;
     DeletedAt?: null | string;
     company: string;
     role: string;
     periode: string;
     contribution: string;
     stack: string | string[];
}

const ExperiencePage: React.FC = () => {
     const [experiences, setExperiences] = useState<Experience[]>([]);
     const [loading, setLoading] = useState<boolean>(true);
     const [error, setError] = useState<Error | null>(null);
     const [modalState, setModalState] = useState({
          add: false,
          edit: false,
          detail: false,
     });
     const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);

     const fetchExperiences = async () => {
          try {
               setLoading(true);
               setError(null);
               const response = await apiClient.get('/get-experience');
               console.log('API Response:', response.data); // Debug log
               setExperiences(response.data || []);
          } catch (err) {
               setError(err as Error);
               console.error('Error fetching experiences:', err);
          } finally {
               setLoading(false);
          }
     };

     useEffect(() => {
          fetchExperiences();
     }, []);

     const parseStack = (stack: string | string[]): string[] => {
          if (Array.isArray(stack)) return stack;
          if (!stack || stack.trim() === "") return [];
          return stack.split(',').map(tech => tech.trim());
     };

     const handleOpenModal = (type: keyof typeof modalState, experience?: Experience) => {
          if (experience) setSelectedExperience(experience);
          setModalState(prev => ({ ...prev, [type]: true }));
     };

     const handleCloseModal = (type: keyof typeof modalState) => {
          setModalState(prev => ({ ...prev, [type]: false }));
          setSelectedExperience(null);
     };

     if (loading && experiences.length === 0) {
          return (
               <AppLayout>
                    <div className="p-6">Loading experiences...</div>
               </AppLayout>
          );
     }

     if (error) {
          return (
               <AppLayout>
                    <div className="p-6 text-red-500">Error: {error.message}</div>
               </AppLayout>
          );
     }

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
                              Work Experiences
                         </motion.h1>
                         <Link to={'/add-experience'}>
                              <motion.button
                                   whileHover={{ scale: 1.05 }}
                                   whileTap={{ scale: 0.95 }}
                                   className="flex items-center gap-2 bg-[#3D5A80] hover:bg-[#4d648d] text-[#cee8ff] px-4 py-2 rounded-lg transition-colors"
                              >
                                   <Plus size={18} />
                                   Add Experience
                              </motion.button>
                         </Link>
                    </div>

                    {/* Experiences List */}
                    {experiences.length === 0 ? (
                         <div className="text-center py-10 text-gray-500">
                              No experiences found. Add your first experience!
                         </div>
                    ) : (
                         <motion.div
                              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              transition={{ duration: 0.5, delay: 0.2 }}
                         >
                              {experiences
                                   .filter(exp => exp.company || exp.role || exp.contribution)
                                   .map((experience) => {
                                        const techStack = parseStack(experience.stack);

                                        return (
                                             <motion.div
                                                  key={experience.ID}
                                                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-[#e0e0e0] p-6 flex flex-col h-full"
                                                  whileHover={{ y: -5 }}
                                                  layout
                                             >
                                                  {/* Experience Header */}
                                                  <div className="mb-4">
                                                       <h3 className="text-xl font-semibold text-[#1F3A5F] mb-1">
                                                            {experience.role || "No role specified"}
                                                       </h3>
                                                       <p className="text-lg text-[#3D5A80] mb-2">
                                                            {experience.company || "No company specified"}
                                                       </p>
                                                       <p className="text-sm text-gray-500">
                                                            {experience.periode || "No period specified"}
                                                       </p>
                                                  </div>

                                                 

                                                  {/* Tech Stack */}
                                                  {techStack.length > 0 && (
                                                       <div className="mb-4">
                                                            <div className="flex flex-wrap gap-2">
                                                                 {techStack.map((tech, index) => (
                                                                      <span
                                                                           key={index}
                                                                           className="px-3 py-1 bg-[#e0e0e0] text-gray-700 rounded-full text-xs"
                                                                      >
                                                                           {tech}
                                                                      </span>
                                                                 ))}
                                                            </div>
                                                       </div>
                                                  )}

                                                  {/* Action Buttons */}
                                                  <div className="flex justify-end gap-3 mt-auto pt-2 border-t border-gray-100">
                                                       <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            className="text-[#3D5A80] hover:text-[#1F3A5F] p-1"
                                                            title="View Details"
                                                            onClick={() => handleOpenModal('detail', experience)}
                                                       >
                                                            <Eye size={18} />
                                                       </motion.button>

                                                       <Link to={`/edit-experience/${experience.ID}`}>
                                                            <motion.button
                                                                 whileHover={{ scale: 1.1 }}
                                                                 whileTap={{ scale: 0.9 }}
                                                                 className="text-[#3D5A80] hover:text-[#1F3A5F] p-1"
                                                                 title="Edit"
                                                            >
                                                                 <Edit size={18} />
                                                            </motion.button>
                                                       </Link>

                                                       <motion.button
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                            className="text-red-500 hover:text-red-700 p-1"
                                                            title="Delete"
                                                            onClick={() => handleDelete(experience.ID)}
                                                       >
                                                            <Trash2 size={18} />
                                                       </motion.button>
                                                  </div>
                                             </motion.div>
                                        );
                                   })}
                         </motion.div>
                    )}
               </motion.div>

               {selectedExperience && (
                    <ExperienceDetailModal
                         isOpen={modalState.detail}
                         onClose={() => handleCloseModal('detail')}
                         experience={selectedExperience}
                    />
               )}
          </AppLayout>
     );
};

export default ExperiencePage;