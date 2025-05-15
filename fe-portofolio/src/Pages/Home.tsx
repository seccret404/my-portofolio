import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa'
import Layout from '../Components/Layout/Layout'

export default function Home() {
     return (
          <Layout>
               <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 mb-4">
                    <div className="max-w-6xl w-full">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                              <div className="order-2 md:order-1">
                                   <h1 className="text-4xl md:text-5xl font-bold text-[#cee8ff] mb-6 leading-tight">
                                        Hi, I'm <span className="text-white">Edward Tua Panjaitan</span>.
                                   </h1>
                                   <div className="text-white text-justify text-lg leading-relaxed space-y-4">
                                        <p>
                                             I'm a passionate web and mobile developer with experience in both frontend and backend development. I love building end-to-end digital solutions and continuously learning new technologies to improve my craft.
                                        </p>
                                        <p>
                                             I aim to create impactful applications that solve real problems and deliver meaningful user experiences.
                                        </p>
                                   </div>
                              </div>
                              <div className="order-1 md:order-2 flex justify-center md:justify-end">
                                   <div className="relative">
                                        <img
                                             src="/img.jpg"
                                             alt="Edward Tua Panjaitan"
                                             className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-[#cee8ff] shadow-lg"
                                        />
                                        <div className="absolute -bottom-3 -right-3 bg-[#cee8ff] text-gray-900 px-4 py-2 rounded-lg font-medium">
                                             Developer
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <div className="flex items-center space-x-4 text-white text-2xl mt-6">
                              <a href="https://github.com/seccret404" target="_blank" rel="noopener noreferrer">
                                   <FaGithub className="hover:text-[#acc2ef] transition duration-200" />
                              </a>

                              <a href="https://www.linkedin.com/in/edward-tua-panjaitan/" target="_blank" rel="noopener noreferrer">
                                   <FaLinkedin className="hover:text-[#acc2ef] transition duration-200" />
                              </a>

                              <a href="mailto:edwardtua25@gmail.com">
                                   <FaEnvelope className="hover:text-[#acc2ef] transition duration-200" />
                              </a>
                         </div>
                    </div>
               </div>
          </Layout>
     )
}