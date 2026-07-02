import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX, HiChevronDown } from 'react-icons/hi';
import { FaFutbol } from 'react-icons/fa';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/news', label: 'News & Events' },
  { path: '/contact', label: 'Contact' },
];

const programLinks = [
  { path: '/football-academy/football', label: 'Football Academy' },
  { path: '/football-academy/womens-football', label: "Women's Football" },
  { path: '/football-academy/basketball', label: 'Basketball' },
  { path: '/football-academy/volleyball', label: 'Volleyball' },
  { path: '/football-academy/table-tennis', label: 'Table Tennis' },
  { path: '/football-academy/german-classes', label: 'German Classes' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setMobileProgramsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white shadow-xl py-2'
          : 'bg-white/95 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between gap-8">
          <Link to="/" className="flex items-center gap-4 flex-shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 flex items-center justify-center rounded-2xl overflow-hidden">
              <img src="/logo.PNG" alt="Esperance FC Academy" className="h-14 sm:h-16 w-auto object-contain" />
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {navLinks.slice(0, 3).map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition duration-200 ${
                    isActive
                      ? 'text-accent border-b-2 border-accent'
                      : 'text-gray-700 hover:text-primary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <div
              onMouseEnter={() => setProgramsOpen(true)}
              onMouseLeave={() => setProgramsOpen(false)}
              className="relative"
            >
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={programsOpen}
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-primary transition duration-200"
              >
                Programs
                <HiChevronDown className={`transition-transform duration-200 ${programsOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {programsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="absolute right-0 top-full mt-3 w-56 rounded-3xl border border-gray-200 bg-white p-3 shadow-2xl shadow-black/5 backdrop-blur-sm"
                  >
                    <div className="space-y-1">
                      {programLinks.map((link) => (
                        <NavLink
                          key={link.path}
                          to={link.path}
                          className={({ isActive }) =>
                            `block rounded-2xl px-4 py-3 text-sm font-medium transition duration-200 ${
                              isActive
                                ? 'bg-primary text-white'
                                : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
                            }`
                          }
                        >
                          {link.label}
                        </NavLink>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.slice(3).map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition duration-200 ${
                    isActive
                      ? 'text-accent border-b-2 border-accent'
                      : 'text-gray-700 hover:text-primary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-primary hover:bg-gray-100 transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200 shadow-lg overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `block rounded-2xl px-4 py-3 text-sm font-medium transition duration-200 ${
                      isActive
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              <button
                type="button"
                onClick={() => setMobileProgramsOpen((prev) => !prev)}
                className="w-full flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 transition duration-200"
                aria-expanded={mobileProgramsOpen}
              >
                Programs
                <HiChevronDown className={`transition-transform duration-200 ${mobileProgramsOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {mobileProgramsOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 space-y-1">
                      {programLinks.map((link) => (
                        <NavLink
                          key={link.path}
                          to={link.path}
                          className={({ isActive }) =>
                            `block rounded-2xl px-5 py-3 text-sm font-medium transition duration-200 ${
                              isActive
                                ? 'bg-primary text-white'
                                : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
                            }`
                          }
                        >
                          {link.label}
                        </NavLink>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
