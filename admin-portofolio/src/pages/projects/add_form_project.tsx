import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { X } from 'lucide-react';
import { addProject } from '../../api/projectApi';
import AppLayout from '../../components/layouts/AppLayout';

interface ProjectFormValues {
     name: string;
     desc: string;
     periode: string;
     feature: string;
     stack: string[];
     image: File | null;
     link: string;
}

export default function AddProject() {
     const router = useNavigate();
     const [formData, setFormData] = useState<ProjectFormValues>({
          name: '',
          desc: '',
          periode: '',
          feature: '',
          stack: [],
          image: null,
          link: '',
     });

     const [currentStack, setCurrentStack] = useState('');
     const [isLoading, setIsLoading] = useState(false);
     const [errors, setErrors] = useState<Partial<ProjectFormValues>>({});
     const [imagePreview, setImagePreview] = useState<string | null>(null);

     const validateForm = (): boolean => {
          const newErrors: Partial<ProjectFormValues> = {};

          if (!formData.name.trim()) newErrors.name = 'Project name is required';
          if (!formData.desc.trim()) newErrors.desc = 'Description is required';
          if (!formData.periode.trim()) newErrors.periode = 'Period is required';
          if (!formData.feature.trim()) newErrors.feature = 'Features are required';
          if (formData.stack.length === 0) newErrors.stack = ['At least one tech stack is required'];
          if (!formData.image) newErrors.image = 'Image is required';
          if (!formData.link.trim()) newErrors.link = 'Project link is required';

          setErrors(newErrors);
          return Object.keys(newErrors).length === 0;
     };

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();

          if (!validateForm()) {
               toast.error('Please fill all required fields');
               return;
          }

          setIsLoading(true);

          try {
               const user_id = localStorage.getItem('user_id') || '';
               const formDataToSend = new FormData();

               formDataToSend.append('name', formData.name);
               formDataToSend.append('desc', formData.desc);
               formDataToSend.append('periode', formData.periode);
               formDataToSend.append('feature', formData.feature);
               formDataToSend.append('stack', formData.stack.join(','));
               if (formData.image) {
                    formDataToSend.append('image', formData.image);
               }
               formDataToSend.append('link', formData.link);
               formDataToSend.append('user_id', user_id);

               await addProject(formDataToSend);
               toast.success('Project added successfully!');
               router('/projects'); // Redirect to projects page after success
          } catch (error: any) {
               console.error('Error adding project:', error);
               const errorMessage = error.data?.error || error.message || 'Failed to add project';
               toast.error(errorMessage);
          } finally {
               setIsLoading(false);
          }
     };

     const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files && e.target.files[0]) {
               const file = e.target.files[0];

               if (!file.type.match('image.*')) {
                    toast.error('Please select an image file (JPEG, PNG, etc.)');
                    setErrors({ ...errors, image: 'Invalid file type' });
                    return;
               }

               const reader = new FileReader();
               reader.onloadend = () => {
                    setImagePreview(reader.result as string);
               };
               reader.readAsDataURL(file);

               setFormData({
                    ...formData,
                    image: file,
               });
               setErrors({ ...errors, image: undefined });
          }
     };

     const addStack = () => {
          if (currentStack && !formData.stack.includes(currentStack)) {
               setFormData({
                    ...formData,
                    stack: [...formData.stack, currentStack],
               });
               setCurrentStack('');
               if (errors.stack) {
                    setErrors({ ...errors, stack: undefined });
               }
          }
     };

     return (
          <AppLayout>
               <div className="max-w-2xl mx-auto p-6">
                    <div className="mb-6">
                         <div className="flex justify-between items-center">
                              <h1 className="text-2xl font-bold text-[#1F3A5F]">Add New Project</h1>
                              <button
                                   onClick={() => router('/projects')}
                                   className="text-gray-500 hover:text-gray-700"
                              >
                                   <X size={24} />
                              </button>
                         </div>
                         <p className="text-gray-600 mt-2">Fill in the details below to add a new project</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 text-[#1F3A5F] bg-white rounded-lg shadow p-6">
                         <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Project Name*</label>
                              <input
                                   type="text"
                                   className={`w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                   value={formData.name}
                                   onChange={(e) => {
                                        setFormData({ ...formData, name: e.target.value });
                                        if (errors.name) setErrors({ ...errors, name: undefined });
                                   }}
                                   required
                              />
                              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                         </div>

                         <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
                              <textarea
                                   className={`w-full px-3 py-2 border ${errors.desc ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                   rows={3}
                                   value={formData.desc}
                                   onChange={(e) => {
                                        setFormData({ ...formData, desc: e.target.value });
                                        if (errors.desc) setErrors({ ...errors, desc: undefined });
                                   }}
                                   required
                              />
                              {errors.desc && <p className="mt-1 text-sm text-red-500">{errors.desc}</p>}
                         </div>

                         <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Period*</label>
                              <input
                                   type="text"
                                   className={`w-full px-3 py-2 border ${errors.periode ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                   value={formData.periode}
                                   onChange={(e) => {
                                        setFormData({ ...formData, periode: e.target.value });
                                        if (errors.periode) setErrors({ ...errors, periode: undefined });
                                   }}
                                   required
                              />
                              {errors.periode && <p className="mt-1 text-sm text-red-500">{errors.periode}</p>}
                         </div>

                         <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Features*</label>
                              <textarea
                                   className={`w-full px-3 py-2 border ${errors.feature ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                   rows={3}
                                   value={formData.feature}
                                   onChange={(e) => {
                                        setFormData({ ...formData, feature: e.target.value });
                                        if (errors.feature) setErrors({ ...errors, feature: undefined });
                                   }}
                                   required
                              />
                              {errors.feature && <p className="mt-1 text-sm text-red-500">{errors.feature}</p>}
                         </div>

                         <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Tech Stack*</label>
                              <div className="flex gap-2 mb-2">
                                   <input
                                        type="text"
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                                        value={currentStack}
                                        onChange={(e) => setCurrentStack(e.target.value)}
                                        placeholder="Add technology"
                                   />
                                   <button
                                        type="button"
                                        onClick={addStack}
                                        className="px-3 py-2 bg-[#3D5A80] text-white rounded-md"
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
                                                  onClick={() =>
                                                       setFormData({
                                                            ...formData,
                                                            stack: formData.stack.filter((t) => t !== tech),
                                                       })
                                                  }
                                                  className="ml-1"
                                             >
                                                  ×
                                             </button>
                                        </span>
                                   ))}
                              </div>
                              {errors.stack && <p className="mt-1 text-sm text-red-500">At least one tech stack is required</p>}
                         </div>

                         <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Project Link*</label>
                              <input
                                   type="url"
                                   className={`w-full px-3 py-2 border ${errors.link ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                   value={formData.link}
                                   onChange={(e) => {
                                        setFormData({ ...formData, link: e.target.value });
                                        if (errors.link) setErrors({ ...errors, link: undefined });
                                   }}
                                   required
                              />
                              {errors.link && <p className="mt-1 text-sm text-red-500">{errors.link}</p>}
                         </div>

                         <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Project Image*</label>
                              <input
                                   type="file"
                                   className={`w-full px-3 py-2 border ${errors.image ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                                   onChange={handleImageChange}
                                   accept="image/*"
                                   required
                              />
                              {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
                              {imagePreview && (
                                   <div className="mt-2">
                                        <img
                                             src={imagePreview}
                                             alt="Preview"
                                             className="max-w-full h-auto max-h-40 object-contain rounded"
                                        />
                                   </div>
                              )}
                         </div>

                         <div className="flex justify-end gap-3 pt-4">
                              <button
                                   type="button"
                                   onClick={() => router('/projects')}
                                   className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                              >
                                   Cancel
                              </button>
                              <button
                                   type="submit"
                                   className="px-4 py-2 bg-[#3D5A80] text-white hover:bg-[#4d648d] rounded-md disabled:opacity-50"
                                   disabled={isLoading}
                              >
                                   {isLoading ? 'Adding...' : 'Add Project'}
                              </button>
                         </div>
                    </form>
               </div>
          </AppLayout>
     );
}