import { Home, Settings, Users, FileText, BarChart2, Mail, Menu, X } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsOpen(true);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { path: '/', name: 'Dashboard', icon: <Home size={20} /> },
    { path: '/projects', name: 'Project', icon: <BarChart2 size={20} /> },
    { path: '/experience', name: 'Experience', icon: <FileText size={20} /> },
    { path: '/settings', name: 'Settings', icon: <Settings size={20} /> },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <motion.button
          onClick={toggleSidebar}
          className="fixed z-40 top-6 left-4 p-2 rounded-lg bg-[#3D5A80] text-[#cee8ff]"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      )}

      <AnimatePresence>
        {(isOpen || !isMobile) && (
          <motion.div
            className={`fixed md:relative z-30 w-64 bg-[#0F1C2E] text-[#e0e0e0] min-h-screen p-4 flex flex-col border-r border-[#1F3A5F] ${isMobile ? 'shadow-2xl' : ''}`}
            initial={{ x: isMobile ? -300 : 0, opacity: isMobile ? 0 : 1 }}
            animate={{ 
              x: isMobile ? (isOpen ? 0 : -300) : 0,
              opacity: isMobile ? (isOpen ? 1 : 0) : 1
            }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="flex justify-between items-center mb-8">
              <motion.h1
                className="text-2xl font-bold pl-2 text-[#cee8ff]"
                whileHover={{ scale: 1.02 }}
              >
                Admin Panel
              </motion.h1>
              {isMobile && (
                <button 
                  onClick={toggleSidebar}
                  className="p-1 text-[#94A3B8] hover:text-[#cee8ff]"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            <nav className="flex flex-col gap-1 flex-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => isMobile && setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 p-3 rounded-lg transition-all ${isActive
                      ? 'bg-[#3D5A80] text-[#cee8ff] font-medium shadow-md'
                      : 'hover:bg-[#1F3A5F] hover:text-[#acc2ef]'
                    }`
                  }
                >
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    {item.icon}
                  </motion.span>
                  <motion.span
                    whileHover={{ x: 3 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {item.name}
                  </motion.span>
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto w-2 h-2 bg-[#acc2ef] rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500 }}
                    />
                  )}
                </NavLink>
              ))}
            </nav>

            <motion.div
              className="mt-auto p-3 text-sm text-[#94A3B8] border-t border-[#1F3A5F]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#3D5A80] flex items-center justify-center text-[#cee8ff]">
                  AD
                </div>
                <div>
                  <p className="font-medium text-[#e0e0e0]">Admin User</p>
                  <p className="text-xs">admin@example.com</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <motion.div
          className="fixed inset-0 z-20 bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}