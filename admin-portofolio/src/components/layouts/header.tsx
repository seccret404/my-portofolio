import { motion } from 'framer-motion';
import { Bell, Search, ChevronDown } from 'lucide-react';

export default function Header() {
     return (
          <motion.header
               className="bg-[#1F3A5F] shadow-lg px-6 py-3 flex justify-between items-center border-b border-[#3D5A80]"
               initial={{ y: -50, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ duration: 0.5, type: 'spring' }}
          >
               <motion.h2
                    className="text-xl font-semibold text-[#cee8ff]"
                    whileHover={{ scale: 1.02 }}
               >
                    Dashboard
               </motion.h2>

               <div className="flex items-center gap-6">
                    

                    {/* User Profile */}
                    <motion.div
                         className="flex items-center gap-2 cursor-pointer group"
                         whileHover={{ scale: 1.02 }}
                    >
                         <div className="relative">
                              <img
                                   src="https://via.placeholder.com/40"
                                   alt="avatar"
                                   className="rounded-full w-8 h-8 border-2 border-[#4d648d] group-hover:border-[#cee8ff] transition-colors"
                              />
                              <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-[#1F3A5F]"></div>
                         </div>
                         <div className="flex flex-col">
                              <span className="text-sm font-medium text-[#cee8ff]">Admin User</span>
                              <span className="text-xs text-[#94A3B8]">Administrator</span>
                         </div>
                         
                    </motion.div>
               </div>
          </motion.header>
     );
}