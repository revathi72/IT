import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaGraduationCap } from 'react-icons/fa';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Faculty', path: '/faculty' },
  { name: 'Students', path: '/students' },
  { name: 'Events', path: '/events' },
  { name: 'Placements', path: '/placements' },
  { name: 'Research', path: '/research' },
  { name: 'Library', path: '/library' },
  { name: 'Awards', path: '/awards' },
  { name: 'Alumni', path: '/alumni' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <nav className="bg-primary text-white shadow-lg sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-primary-dark text-[11px] py-1.5 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span className="truncate">PSR Engineering College (Autonomous) | Affiliated to Anna University</span>
          <span className="whitespace-nowrap ml-4">📧 contact@psr.edu.in | 📞 04562-239600</span>
        </div>
      </div>

      {/* Main navbar */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-14 md:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold no-underline text-white shrink-0">
            <FaGraduationCap className="text-secondary text-xl md:text-2xl" />
            <div className="leading-tight">
              <div className="text-sm md:text-base font-bold">IT Department</div>
              <div className="text-[9px] md:text-[10px] font-normal opacity-80">PSR Engineering College</div>
            </div>
          </Link>

          {/* Desktop links - show from xl (1280px) for 12 links */}
          <div className="hidden xl:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-2.5 py-1.5 rounded text-[13px] font-medium transition-colors no-underline whitespace-nowrap ${
                    isActive
                      ? 'bg-secondary text-primary-dark'
                      : 'text-white hover:bg-primary-light'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile/Tablet toggle */}
          <button
            className="xl:hidden text-white text-2xl bg-transparent border-none cursor-pointer p-1"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet menu */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="xl:hidden fixed inset-0 top-[56px] md:top-[90px] bg-black/40 z-40"
            onClick={() => setIsOpen(false)}
          />
          {/* Menu panel */}
          <div className="xl:hidden fixed left-0 right-0 top-[56px] md:top-[90px] bg-primary-dark border-t border-primary-light z-50 max-h-[calc(100vh-56px)] md:max-h-[calc(100vh-90px)] overflow-y-auto">
            <div className="px-4 py-4 grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors no-underline text-center ${
                      isActive
                        ? 'bg-secondary text-primary-dark'
                        : 'text-white hover:bg-primary-light bg-white/5'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
