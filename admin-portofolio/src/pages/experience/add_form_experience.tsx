import { useState, useRef, type KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import AppLayout from '../../components/layouts/AppLayout';
import { useExperiences } from '../../hooks/useExperience';
import type { Experience } from '@/api/types';

export default function AddExperience() {
     const { createExperience } = useExperiences();
     const navigate = useNavigate();

     const [formData, setFormData] = useState<Omit<Experience, 'ID' | 'CreatedAt' | 'UpdatedAt' | 'DeletedAt'>>({
          company: '',
          role: '',
          periode: '',
          contribution: '',
          stack: ''
     });

     const [currentTech, setCurrentTech] = useState('');
     const [errors, setErrors] = useState<Record<string, string>>({});
     const [isSubmitting, setIsSubmitting] = useState(false);
     const techInputRef = useRef<HTMLInputElement>(null);

     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          const { name, value } = e.target;
          setFormData(prev => ({
               ...prev,
               [name]: value
          }));

          if (errors[name]) {
               setErrors(prev => ({
                    ...prev,
                    [name]: ''
               }));
          }
     };

     const handleAddTech = (e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'Enter' || e.key === ',') {
               e.preventDefault();
               const tech = currentTech.trim();
               if (tech) {
                    const currentStack = formData.stack ? formData.stack.split(', ') : [];
                    if (!currentStack.includes(tech)) {
                         setFormData(prev => ({
                              ...prev,
                              stack: [...currentStack, tech].join(', ')
                         }));
                         setCurrentTech('');
                    }
               }
          }
     };

     const handleRemoveTech = (techToRemove: string) => {
          const currentStack = formData.stack.split(', ').filter(tech => tech !== techToRemove);
          setFormData(prev => ({
               ...prev,
               stack: currentStack.join(', ')
          }));
     };

     const validateForm = () => {
          const newErrors: Record<string, string> = {};

          if (!formData.company.trim()) newErrors.company = 'Company name is required';
          if (!formData.role.trim()) newErrors.role = 'Role is required';
          if (!formData.periode.trim()) newErrors.periode = 'Period is required';
          if (!formData.contribution.trim()) newErrors.contribution = 'Contribution is required';
          if (!formData.stack.trim()) newErrors.stack = 'At least one technology is required';

          setErrors(newErrors);
          return Object.keys(newErrors).length === 0;
     };

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();

          if (!validateForm()) return;

          setIsSubmitting(true);
          try {
               const payload = {
                    company: formData.company,
                    role: formData.role,
                    periode: formData.periode,
                    contribution: formData.contribution,
                    stack: formData.stack
               };

               console.log('Submitting payload:', payload); // Debug log

               await createExperience(payload);
               navigate('/experience');
          } catch (error) {
               console.error('Error creating experience:', error);
          } finally {
               setIsSubmitting(false);
          }
     };

     const currentStack = formData.stack ? formData.stack.split(', ') : [];

     return (
          <AppLayout>
               <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 max-w-4xl mx-auto"
               >
                    <div className="flex justify-between items-center mb-8">
                         <motion.h1
                              className="text-3xl font-bold text-[#1F3A5F]"
                              whileHover={{ scale: 1.01 }}
                         >
                              Add New Experience
                         </motion.h1>
                    </div>

                    <motion.div
                         initial={{ y: 20, opacity: 0 }}
                         animate={{ y: 0, opacity: 1 }}
                         transition={{ duration: 0.4 }}
                         className="bg-white rounded-xl shadow-md p-6 border border-[#e0e0e0]"
                    >
                         <form onSubmit={handleSubmit} className="space-y-6 text-[#3D5A80]">
                              <div>
                                   <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                                        Company Name <span className="text-red-500">*</span>
                                   </label>
                                   <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 rounded-lg border ${errors.company ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#3D5A80]`}
                                        placeholder="e.g. Google, Microsoft"
                                   />
                                   {errors.company && <p className="mt-1 text-sm text-red-500">{errors.company}</p>}
                              </div>

                              <div>
                                   <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                                        Role <span className="text-red-500">*</span>
                                   </label>
                                   <input
                                        type="text"
                                        id="role"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 rounded-lg border ${errors.role ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#3D5A80]`}
                                        placeholder="e.g. Frontend Developer, Software Engineer"
                                   />
                                   {errors.role && <p className="mt-1 text-sm text-red-500">{errors.role}</p>}
                              </div>

                              <div>
                                   <label htmlFor="periode" className="block text-sm font-medium text-gray-700 mb-1">
                                        Period <span className="text-red-500">*</span>
                                   </label>
                                   <input
                                        type="text"
                                        id="periode"
                                        name="periode"
                                        value={formData.periode}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-2 rounded-lg border ${errors.periode ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#3D5A80]`}
                                        placeholder="e.g. Jan 2020 - Present, 2018-2020"
                                   />
                                   {errors.periode && <p className="mt-1 text-sm text-red-500">{errors.periode}</p>}
                              </div>

                              <div>
                                   <label htmlFor="contribution" className="block text-sm font-medium text-gray-700 mb-1">
                                        Contributions <span className="text-red-500">*</span>
                                   </label>
                                   <textarea
                                        id="contribution"
                                        name="contribution"
                                        value={formData.contribution}
                                        onChange={handleChange}
                                        rows={4}
                                        className={`w-full px-4 py-2 rounded-lg border ${errors.contribution ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#3D5A80]`}
                                        placeholder="Describe your responsibilities and achievements..."
                                   />
                                   {errors.contribution && <p className="mt-1 text-sm text-red-500">{errors.contribution}</p>}
                              </div>

                              <div>
                                   <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Technologies <span className="text-red-500">*</span>
                                   </label>

                                   <div className={`flex flex-wrap gap-2 p-2 rounded-lg border ${errors.stack ? 'border-red-500' : 'border-gray-300'} min-h-12`}>
                                        {currentStack.map((tech) => (
                                             <motion.div
                                                  key={tech}
                                                  initial={{ scale: 0.8 }}
                                                  animate={{ scale: 1 }}
                                                  className="flex items-center gap-1 bg-[#3D5A80] text-white px-3 py-1 rounded-full text-sm"
                                             >
                                                  <span>{tech}</span>
                                                  <button
                                                       type="button"
                                                       onClick={() => handleRemoveTech(tech)}
                                                       className="hover:text-[#cee8ff] focus:outline-none"
                                                  >
                                                       <X size={14} />
                                                  </button>
                                             </motion.div>
                                        ))}

                                        <input
                                             type="text"
                                             ref={techInputRef}
                                             value={currentTech}
                                             onChange={(e) => setCurrentTech(e.target.value)}
                                             onKeyDown={handleAddTech}
                                             className="flex-1 min-w-[100px] px-2 py-1 border-0 focus:ring-0 focus:outline-none"
                                             placeholder={currentStack.length === 0 ? "e.g. React, Node.js (press Enter to add)" : ""}
                                        />
                                   </div>
                              </div>


                              <div className="flex justify-end gap-4 pt-4">
                                   <motion.button
                                        type="button"
                                        onClick={() => navigate('/experiences')}
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                   >
                                        Cancel
                                   </motion.button>

                                   <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`px-6 py-2 rounded-lg text-white ${isSubmitting ? 'bg-[#3D5A80]/70' : 'bg-[#3D5A80] hover:bg-[#4d648d]'} transition-colors`}
                                   >
                                        {isSubmitting ? 'Saving...' : 'Save Experience'}
                                   </motion.button>
                              </div>
                         </form>
                    </motion.div>
               </motion.div>
          </AppLayout>
     );
}