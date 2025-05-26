import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { X } from 'lucide-react';
import type { Project } from '../../api/types';
import { updateProject, getProjectById } from '../../api/projectApi';
import AppLayout from '../../components/layouts/AppLayout';

const EditProject = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    name: '',
    desc: '',
    stack: [],
    link: '',
    image: '',
    feature: '',
    user_id: '',
    periode: '',
    ID: Number(id)
  });

  const [currentStack, setCurrentStack] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch project data
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const project = await getProjectById(Number(id)!);
        if (project) {
          setFormData({
            ...project,
            stack: typeof project.stack === 'string'
              ? project.stack
              : project.stack
          });
        }
      } catch (err) {
        setError('Failed to load project data');
      }
    };

    fetchProject();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await updateProject(id!, formData);
      navigate('/projects');
    } catch (err) {
      setError('Failed to update project');
      console.error('Update error:', err);
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
      stack: formData.stack.filter(t => t !== tech)
    });
  };


  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#1F3A5F]">Edit Project</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-gray-500 hover:text-gray-700"
            disabled={isSubmitting}
          >
            <X size={24} />
          </button>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className='text-gray-700 bg-white rounded-lg shadow p-6'>
          <div className="space-y-6">
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
                rows={4}
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
                  className="px-4 py-2 bg-[#3D5A80] text-white rounded-md"
                  disabled={isSubmitting}
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.stack.map((tech, index) => (
                  <span key={index} className="px-3 py-1 bg-[#acc2ef] text-[#1F3A5F] rounded-full text-sm flex items-center">
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeStack(tech)}
                      className="ml-1.5"
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
                value={typeof formData.image === 'string' ? formData.image : ''}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                disabled={isSubmitting}
              />
            </div>


            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
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
            </div>
        </form>
      </div>
    </AppLayout>
  );
};

export default EditProject;