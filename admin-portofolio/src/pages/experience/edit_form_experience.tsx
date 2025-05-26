import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/button';
import AppLayout from '../../components/layouts/AppLayout';
import apiClient from '../../api/apiClient';

interface Experience {
     ID: number;
     company: string;
     role: string;
     periode: string;
     contribution: string;
     stack: string;
}

export default function EditExperience() {
     const { id } = useParams<{ id: string }>();
     const navigate = useNavigate();
     const [loading, setLoading] = useState(true);
     const [submitting, setSubmitting] = useState(false);
     const [error, setError] = useState<string | null>(null);
     const [experience, setExperience] = useState<Experience>({
          ID: 0,
          company: '',
          role: '',
          periode: '',
          contribution: '',
          stack: ''
     });

     // Enhanced fetch with error details
     useEffect(() => {
          const fetchExperience = async () => {
               try {
                    console.log(`Fetching experience with ID: ${id}`);
                    const response = await apiClient.get<Experience>(`/get-experience/${id}`);

                    console.log('API Response:', response);
                    console.log('Response Data:', response.data);
                    console.log('Response Status:', response.status);

                    if (response.data && response.data.ID) {
                         setExperience(response.data as Experience);
                    } else {
                         setError('Received invalid experience data format');
                    }
               } catch (error) {
                    console.error('Detailed fetch error:', error);
                    setError(`Failed to load: ${error instanceof Error ? error.message : 'Unknown error'}`);
               } finally {
                    setLoading(false);
               }
          };

          fetchExperience();
     }, [id]);

     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
          const { name, value } = e.target;
          setExperience(prev => ({ ...prev, [name]: value }));
     };

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          setSubmitting(true);
          setError(null);

          try {
               console.log('Preparing payload...', {
                    company: experience.company.trim(),
                    role: experience.role.trim(),
                    periode: experience.periode.trim(),
                    contribution: experience.contribution.trim(),
                    stack: experience.stack.trim()
               });

               const payload = {
                    company: experience.company.trim(),
                    role: experience.role.trim(),
                    periode: experience.periode.trim(),
                    contribution: experience.contribution.trim(),
                    stack: experience.stack.trim()
               };

               console.log('Sending PUT request to:', `/update-experience/${id}`);
               const response = await apiClient.put<Experience>(`/update-experience/${id}`, payload, {
                    headers: {
                         'Content-Type': 'application/json',
                    }
               });

               console.log('Update response:', {
                    status: response.status,
                    data: response.data,
                    headers: response.headers
               });

               if (response.status >= 200 && response.status < 300) {
                    if (response.data?.ID) {
                         console.log('Update successful, navigating...');
                         navigate('/experience', { state: { refreshed: true } });
                    } else {
                         setError('Server responded but with unexpected data format');
                    }
               } else {
                    setError(`Server responded with status: ${response.status}`);
               }
          } catch (error: any) {
               console.error('Detailed update error:', error);
               if (error.response) {
                    console.error('Error response data:', error.response.data);
                    console.error('Error response status:', error.response.status);
                    setError(`Server error: ${error.response.data?.message || error.response.status}`);
               } else {
                    setError('Network error - failed to connect to server');
               }
          } finally {
               setSubmitting(false);
          }
     };

     if (loading) {
          return (
               <AppLayout>
                    <div className="flex justify-center items-center h-64">
                         <p>Loading experience data...</p>
                    </div>
               </AppLayout>
          );
     }

     return (
          <AppLayout>
               <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="container mx-auto px-4 py-8"
               >
                    <div className="max-w-3xl mx-auto">
                         <div className="flex justify-between items-center mb-8">
                              <motion.h1
                                   className="text-2xl font-bold text-gray-800"
                                   initial={{ x: -20 }}
                                   animate={{ x: 0 }}
                              >
                                   Edit Work Experience
                              </motion.h1>
                              <Button
                                   variant="outline"
                                   onClick={() => navigate('/experience')}
                              >
                                   Back to experience
                              </Button>
                         </div>

                         {error && (
                              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                                   <p className="font-bold">Error:</p>
                                   <p>{error}</p>
                                   <p className="mt-2 text-sm">Check console for details</p>
                              </div>
                         )}

                         <form onSubmit={handleSubmit}>
                              <div className="bg-white rounded-lg shadow-md p-6 text-gray-700 space-y-6">
                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                             <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                                                  Company Name
                                             </label>
                                             <input
                                                  type="text"
                                                  id="company"
                                                  name="company"
                                                  value={experience.company}
                                                  onChange={handleInputChange}
                                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                  required
                                             />
                                        </div>

                                        <div className="space-y-2">
                                             <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                                  Job Role
                                             </label>
                                             <input
                                                  type="text"
                                                  id="role"
                                                  name="role"
                                                  value={experience.role}
                                                  onChange={handleInputChange}
                                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                  required
                                             />
                                        </div>
                                   </div>

                                   <div className="space-y-2">
                                        <label htmlFor="periode" className="block text-sm font-medium text-gray-700">
                                             Employment Period
                                        </label>
                                        <input
                                             type="text"
                                             id="periode"
                                             name="periode"
                                             value={experience.periode}
                                             onChange={handleInputChange}
                                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                             required
                                             placeholder="e.g., Jan 2020 - Dec 2022"
                                        />
                                   </div>

                                   <div className="space-y-2">
                                        <label htmlFor="contribution" className="block text-sm font-medium text-gray-700">
                                             Your Contributions
                                        </label>
                                        <textarea
                                             id="contribution"
                                             name="contribution"
                                             value={experience.contribution}
                                             onChange={handleInputChange}
                                             rows={4}
                                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                             required
                                        />
                                   </div>

                                   <div className="space-y-2">
                                        <label htmlFor="stack" className="block text-sm font-medium text-gray-700">
                                             Technologies Used
                                        </label>
                                        <input
                                             type="text"
                                             id="stack"
                                             name="stack"
                                             value={experience.stack}
                                             onChange={handleInputChange}
                                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                             placeholder="e.g., React, Node.js, TypeScript"
                                        />
                                   </div>

                                   <div className="flex justify-end space-x-4 pt-4">
                                        <Button
                                             type="button"
                                             variant="outline"
                                             onClick={() => navigate('/experience')}
                                             disabled={submitting}
                                        >
                                             Cancel
                                        </Button>
                                        <Button
                                             type="submit"
                                             className="bg-blue-600 hover:bg-blue-700"
                                             disabled={submitting}
                                        >
                                             {submitting ? 'Saving...' : 'Save Changes'}
                                        </Button>
                                   </div>
                              </div>
                         </form>
                    </div>
               </motion.div>
          </AppLayout>
     );
}