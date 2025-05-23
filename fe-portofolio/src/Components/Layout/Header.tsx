import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom'; // Ganti Link dengan NavLink

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Project', path: '/project' },
    { label: 'Experience', path: '/experience' },
    { label: 'Tech Stack', path: '/tech-stack' },
  ];

  // Style untuk link aktif
  const activeStyle = {
    color: '#cee8ff',
    fontWeight: 'bold',
    borderBottom: '2px solid #4d648d'
  };

  return (
    <header className="bg-[#1f2b3e] shadow-md fixed w-[80%] rounded-[25px] mt-4 z-50">
      <div className="max-w-7xl mx-auto px-8 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-[#4d648d]">My Portofolio</div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-6">
          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className="text-[#4d648d] hover:text-[#cee8ff] transition pb-1"
              style={({ isActive }) => isActive ? activeStyle : {}}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-[#4d648d] focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden rounded bg-[#1f2b3e] shadow-md px-4 py-3 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.path}
              className="block text-[#4d648d] hover:text-[#cee8ff] transition py-1"
              style={({ isActive }) => isActive ? activeStyle : {}}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}

      {/* Social Icons */}
      <div className="absolute bottom-4 right-4 flex gap-4">
        <a
          href="https://github.com/edwardtua"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-[#cee8ff] transition"
        >
          <i className="fab fa-github"></i>
        </a>
        <a
          href="https://linkedin.com/in/edwardtua"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 hover:text-[#cee8ff] transition"
        >
          <i className="fab fa-linkedin"></i>
        </a>
        <a
          href="mailto:edwardtua@example.com"
          className="text-gray-700 hover:text-[#cee8ff] transition"
        >
          <i className="fas fa-envelope"></i>
        </a>
      </div>
    </header>
  );
};

export default Header;