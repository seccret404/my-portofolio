import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Github, X, Link as LinkIcon } from 'lucide-react';
import type { Project } from '../../api/types';

interface ProjectDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ isOpen, onClose, project }) => {
  // Utility function to parse stack string into array
  const parseStack = (stackString: string): string[] => {
    return stackString.split(',').map(tech => tech.trim());
  };

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-[#1F3A5F]">{project.name}</h3>
                  <p className="text-sm text-[#3D5A80] mt-1">{project.periode}</p>
                </div>
                <button 
                  onClick={onClose} 
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  {project.image && typeof project.image === 'string' ? (
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-48 bg-[#acc2ef] flex items-center justify-center rounded-lg">
                      <span className="text-[#1F3A5F] font-medium">Project Image</span>
                    </div>
                  )}

                  {project.link && (
                    <div className="flex items-center gap-2">
                      <LinkIcon size={16} className="text-[#3D5A80]" />
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#3D5A80] hover:text-[#4d648d] text-sm underline"
                      >
                        View Live Project
                      </a>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Description</h4>
                    <p className="text-gray-700 whitespace-pre-line">{project.desc}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Features</h4>
                    <p className="text-gray-700 whitespace-pre-line">{project.feature}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {parseStack(project.stack).map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-[#acc2ef] text-[#1F3A5F] rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-[#3D5A80] text-white hover:bg-[#4d648d] rounded-md transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectDetailModal;