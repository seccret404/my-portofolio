import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { Project } from '../../api/types';
import { updateProject } from '../../api/projectApi';

interface EditProjectModalProps {
     isOpen: boolean;
     onClose: () => void;
     onEdit: (updatedProject: Project) => void; // Callback to update parent state
     project: Project | null;
}

const EditProjectModal = ({ isOpen, onClose, onEdit, project }: EditProjectModalProps) => {
     const [formData, setFormData] = useState<Omit<Project, 'id'>>({
          name: '',
          desc: '',
          stack: [],
          link: '',
          image: '',
          feature: '',
          user_id: '',
          periode: ''
     });
     const [currentStack, setCurrentStack] = useState('');
     const [isSubmitting, setIsSubmitting] = useState(false);
     const [error, setError] = useState<string | null>(null);

     // Initialize form with project data
     useEffect(() => {
          if (project) {
               const { id, ...rest } = project;
               setFormData(rest);
          }
     }, [project]);

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          if (!project) return;

          setIsSubmitting(true);
          setError(null);

          try {
               // Call the API to update the project
               const updatedProject = await updateProject(project.id, {
                    ...formData,
                    id: project.id // Ensure ID is included
               });

               // Notify parent component of the update
               onEdit(updatedProject);
               onClose();
          } catch (err) {
               console.error('Failed to update project:', err);
               setError(err instanceof Error ? err.message : 'Failed to update project');
          } finally {
               setIsSubmitting(false);
          }
     };

     const addStack = () => {
          if (currentStack && !formData.stack.includes(currentStack)) {
               setFormData({
                    ...formData,
                    stack: [...formData.stack, currentStack]
               });
               setCurrentStack('');
          }
     };

     const removeStack = (tech: string) => {
          setFormData({
               ...formData,
               stack: formData.stack.filter((t) => t !== tech)
          });
     };

     return (
          <AnimatePresence>
               {isOpen && (
                    <motion.div
                         className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         exit={{ opacity: 0 }}
                    >
                         <motion.div
                              className="bg-white rounded-xl w-full max-w-md"
                              initial={{ scale: 0.9, y: 20 }}
                              animate={{ scale: 1, y: 0 }}
                              exit={{ scale: 0.9, y: 20 }}
                         >
                              <div className="p-6">
                                   <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-xl font-bold text-[#1F3A5F]">Edit Project</h3>
                                        <button
                                             onClick={onClose}
                                             className="text-gray-500 hover:text-gray-700"
                                             disabled={isSubmitting}
                                        >
                                             <X size={24} />
                                        </button>
                                   </div>

                                   {error && (
                                        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
                                             {error}
                                        </div>
                                   )}

                                   <form onSubmit={handleSubmit} className='text-gray-700'>
                                        <div className="space-y-4">
                                             <div>
                                                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                                                  <input
                                                       type="text"
                                                       className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                       value={formData.name}
                                                       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                       required
                                                       disabled={isSubmitting}
                                                  />
                                             </div>

                                             <div>
                                                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                                  <textarea
                                                       className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                       rows={3}
                                                       value={formData.desc}
                                                       onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                                                       required
                                                       disabled={isSubmitting}
                                                  />
                                             </div>

                                             <div>
                                                  <label className="block text-sm font-medium text-gray-700 mb-1">Tech Stack</label>
                                                  <div className="flex gap-2 mb-2">
                                                       <input
                                                            type="text"
                                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                                                            value={currentStack}
                                                            onChange={(e) => setCurrentStack(e.target.value)}
                                                            placeholder="Add technology"
                                                            disabled={isSubmitting}
                                                       />
                                                       <button
                                                            type="button"
                                                            onClick={addStack}
                                                            className="px-3 py-2 bg-[#3D5A80] text-white rounded-md"
                                                            disabled={isSubmitting}
                                                       >
                                                            Add
                                                       </button>
                                                  </div>
                                                  <div className="flex flex-wrap gap-2">
                                                       {formData.stack.map((tech, index) => (
                                                            <span key={index} className="px-2 py-1 bg-[#acc2ef] text-[#1F3A5F] rounded-full text-sm">
                                                                 {tech}
                                                                 <button
                                                                      type="button"
                                                                      onClick={() => removeStack(tech)}
                                                                      className="ml-1"
                                                                      disabled={isSubmitting}
                                                                 >
                                                                      ×
                                                                 </button>
                                                            </span>
                                                       ))}
                                                  </div>
                                             </div>

                                             <div>
                                                  <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Link</label>
                                                  <input
                                                       type="url"
                                                       className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                       value={formData.link}
                                                       onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                                       disabled={isSubmitting}
                                                  />
                                             </div>

                                             <div>
                                                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                                  <input
                                                       type="url"
                                                       className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                       value={formData.image}
                                                       onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                                       disabled={isSubmitting}
                                                  />
                                             </div>
                                        </div>

                                        <div className="mt-6 flex justify-end gap-3">
                                             <button
                                                  type="button"
                                                  onClick={onClose}
                                                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                                                  disabled={isSubmitting}
                                             >
                                                  Cancel
                                             </button>
                                             <button
                                                  type="submit"
                                                  className="px-4 py-2 bg-[#3D5A80] text-white hover:bg-[#4d648d] rounded-md disabled:opacity-50"
                                                  disabled={isSubmitting}
                                             >
                                                  {isSubmitting ? 'Saving...' : 'Save Changes'}
                                             </button>
                                        </div>
                                   </form>
                              </div>
                         </motion.div>
                    </motion.div>
               )}
          </AnimatePresence>
     );
};

export default EditProjectModal;