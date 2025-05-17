import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Github, X } from 'lucide-react';  
import type { Project } from '@/types';
interface Props {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

const ProjectDetailModal: React.FC<Props> = ({ isOpen, onClose, project }) => {
  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl w-full max-w-2xl"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-[#1F3A5F]">{project.title}</h3>
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#3D5A80] hover:text-[#4d648d] flex items-center gap-1 mt-1"
                    >
                      <Github size={16} />
                      <span className="text-sm">View on GitHub</span>
                    </a>
                  )}
                </div>
                <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                  <X size={24} />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-48 bg-[#acc2ef] flex items-center justify-center rounded-lg text-[#1F3A5F]">
                      Project Image
                    </div>
                  )}
                </div>

                <div>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-1">Description</h4>
                    <p className="text-gray-700">{project.description}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech, index) => (
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
                  className="px-4 py-2 bg-[#3D5A80] text-white hover:bg-[#4d648d] rounded-md"
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
