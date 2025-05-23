import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from "../../Components/Layout/Layout";

interface Project {
     id: number;
     title: string;
     shortDescription: string;
     longDescription: string;
     technologies: string[];
     features: string[];
     image: string;
     link: string;
     client: string;
}

const projectsData: Project[] = [
     {
          id: 1,
          title: "E-commerce Platform",
          shortDescription: "Full-featured online store with payment integration",
          longDescription: "Developed a complete e-commerce solution with product management, user authentication, and Stripe payment integration. Implemented advanced search functionality and recommendation engine.",
          technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
          features: [
               "Product catalog with filters",
               "User authentication system",
               "Payment gateway integration",
               "Admin dashboard",
               "Order tracking"
          ],
          image: "/ecommerce.jpg",
          link: "https://example-ecommerce.com",
          client: "Fashion Co."
     },
     {
          id: 2,
          title: "Health Tracking App",
          shortDescription: "Mobile app for health and fitness monitoring",
          longDescription: "Created a cross-platform mobile application for tracking workouts, nutrition, and health metrics. Integrated with wearable devices and health APIs for comprehensive data collection.",
          technologies: ["React Native", "Firebase", "GraphQL", "Apple HealthKit"],
          features: [
               "Workout tracking",
               "Nutrition logging",
               "Health data visualization",
               "Progress reports",
               "Social sharing"
          ],
          image: "/health-app.jpg",
          link: "https://example-healthapp.com",
          client: "Wellness Inc."
     },
];

export default function ProjectsPage() {
     const [selectedProject, setSelectedProject] = useState<Project | null>(null);

     // Animation variants
     const container = {
          hidden: { opacity: 0 },
          show: {
               opacity: 1,
               transition: {
                    staggerChildren: 0.1
               }
          }
     };

     const item = {
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
     };

     return (
          <Layout>
               <div className="min-h-screen">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                         <motion.div
                              initial={{ opacity: 0, y: -20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5 }}
                              className="text-center mb-16"
                         >
                              <h1 className="text-5xl md:text-7xl font-bold text-[#cee8ff] mb-4">My Projects</h1>
                              <p className="text-xl text-[#94A3B8] max-w-3xl mx-auto">
                                   Projects showcasing end-to-end development—from concept to deployment
                              </p>
                         </motion.div>

                         <motion.div
                              variants={container}
                              initial="hidden"
                              animate="show"
                              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                         >
                              {projectsData.map((project) => (
                                   <motion.div
                                        key={project.id}
                                        variants={item}
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="bg-[#1F3A5F] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-[#3D5A80] cursor-pointer"
                                        onClick={() => setSelectedProject(project)}
                                   >
                                        <motion.div
                                             initial={{ opacity: 0 }}
                                             animate={{ opacity: 1 }}
                                             transition={{ duration: 0.5 }}
                                        >
                                             <img
                                                  src={project.image}
                                                  alt={project.title}
                                                  className="w-full h-48 object-cover border-b border-[#3D5A80]"
                                             />
                                        </motion.div>
                                        <div className="p-5">
                                             <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                                             <p className="text-[#cee8ff] text-sm mb-4">
                                                  {project.shortDescription}
                                             </p>
                                             <div className="flex justify-between items-center mt-4">
                                                  <div className="flex flex-wrap gap-2">
                                                       {project.technologies.slice(0, 3).map((tech, i) => (
                                                            <motion.span
                                                                 key={i}
                                                                 className="text-xs px-3 py-1 bg-[#4d648d] rounded-full text-white"
                                                                 whileHover={{ scale: 1.1 }}
                                                            >
                                                                 {tech}
                                                            </motion.span>
                                                       ))}
                                                  </div>
                                             </div>
                                        </div>
                                   </motion.div>
                              ))}
                         </motion.div>

                         <AnimatePresence>
                              {selectedProject && (
                                   <ProjectModal
                                        project={selectedProject}
                                        onClose={() => setSelectedProject(null)}
                                   />
                              )}
                         </AnimatePresence>
                    </div>
               </div>
          </Layout>
     );
}

interface ProjectModalProps {
     project: Project;
     onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
     return (
          <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.3 }}
               className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          >
               <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ type: "spring", damping: 25 }}
                    className="bg-[#1F3A5F] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#3D5A80]"
               >
                    <div className="relative">
                         <motion.img
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2 }}
                              src={project.image}
                              alt={project.title}
                              className="w-full h-64 object-cover"
                         />
                         <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={onClose}
                              className="absolute top-4 right-4 bg-[#3D5A80] text-white rounded-full p-2 hover:bg-[#4d648d] transition-colors"
                         >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                   <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                         </motion.button>
                    </div>

                    <div className="p-6">
                         <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 }}
                         >
                              <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
                              <p className="text-[#94A3B8] mb-4">Client: {project.client}</p>
                         </motion.div>

                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                              <div className="md:col-span-2">
                                   <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 }}
                                   >
                                        <h3 className="text-xl font-semibold text-[#cee8ff] mb-3">Project Overview</h3>
                                        <p className="text-white mb-6">{project.longDescription}</p>

                                        <h3 className="text-xl font-semibold text-[#cee8ff] mb-3">Key Features</h3>
                                        <ul className="list-disc pl-5 text-white space-y-2 mb-6">
                                             {project.features.map((feature, i) => (
                                                  <motion.li
                                                       key={i}
                                                       initial={{ opacity: 0, x: -10 }}
                                                       animate={{ opacity: 1, x: 0 }}
                                                       transition={{ delay: 0.5 + i * 0.1 }}
                                                  >
                                                       {feature}
                                                  </motion.li>
                                             ))}
                                        </ul>
                                   </motion.div>
                              </div>

                              <motion.div
                                   initial={{ opacity: 0, x: 20 }}
                                   animate={{ opacity: 1, x: 0 }}
                                   transition={{ delay: 0.5 }}
                              >
                                   <div className="bg-[#3D5A80]/50 rounded-lg p-4 mb-6">
                                        <h3 className="text-xl font-semibold text-[#cee8ff] mb-3">Project Details</h3>
                                        <div className="space-y-3">
                                             <div>
                                                  <h4 className="text-sm text-[#94A3B8]">Client</h4>
                                                  <p className="text-white">{project.client}</p>
                                             </div>
                                             <div>
                                                  <h4 className="text-sm text-[#94A3B8]">Technologies</h4>
                                                  <div className="flex flex-wrap gap-2 mt-2">
                                                       {project.technologies.map((tech, i) => (
                                                            <motion.span
                                                                 key={i}
                                                                 className="text-xs px-3 py-1 bg-[#4d648d] rounded-full text-white"
                                                                 initial={{ opacity: 0, scale: 0.5 }}
                                                                 animate={{ opacity: 1, scale: 1 }}
                                                                 transition={{ delay: 0.6 + i * 0.1 }}
                                                            >
                                                                 {tech}
                                                            </motion.span>
                                                       ))}
                                                  </div>
                                             </div>
                                        </div>
                                   </div>

                                   <motion.a
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center w-full bg-[#3D5A80] hover:bg-[#4d648d] text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 mb-4"
                                   >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                             <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                                        </svg>
                                        View Github Project
                                   </motion.a>
                              </motion.div>
                         </div>
                    </div>
               </motion.div>
          </motion.div>
     );
};