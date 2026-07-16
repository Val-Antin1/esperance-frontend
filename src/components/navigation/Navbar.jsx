import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Phone, ChevronDown, Menu, X } from 'lucide-react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import LanguageSwitcher from '../common/LanguageSwitcher';
import { contactInfo } from '../../data/sampleData';

const navLinks = [
  { path: '/', labelKey: 'nav.home' },
  { path: '/about', labelKey: 'nav.about' },
  { path: '/gallery', labelKey: 'nav.gallery' },
  { path: '/news', labelKey: 'nav.news' },
  { path: '/contact', labelKey: 'nav.contact' },
];

const programLinks = [
  { path: '/football-academy/football', label: 'Football Academy' },
  { path: '/football-academy/womens-football', label: "Women's Football" },
  { path: '/football-academy/basketball', label: 'Basketball' },
  { path: '/football-academy/volleyball', label: 'Volleyball' },
  { path: '/football-academy/table-tennis', label: 'Table Tennis' },
  { path: '/football-academy/german-classes', label: 'German Classes' },
  { path: '/football-academy', label: 'Programs' },
];

const Navbar = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);
  const location = useLocation();
  const phoneNumber = contactInfo?.phone || '+250 XXX XXX XXX';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setMobileProgramsOpen(false);
    setProgramsOpen(false);
  }, [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-xl' : ''}`}>
      {/* Top Bar with Social Icons */}
      <div className="bg-gray-900 text-white">
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-gray-300">
            <span>Reach out to us</span>
            <a href={contactInfo.social.facebook || '#'} target="_blank" rel="noreferrer" className="transition-colors hover:text-yellow-500" aria-label="Facebook">
              <FaFacebookF size={14} />
            </a>
            <a href={contactInfo.social.instagram || '#'} target="_blank" rel="noreferrer" className="transition-colors hover:text-yellow-500" aria-label="Instagram">
              <FaInstagram size={14} />
            </a>
          </div>

          <div className="ml-auto">
            <LanguageSwitcher compact />
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img src="/logo.PNG" alt="Esperance FC Academy" className="h-20 w-auto object-contain" />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-semibold transition duration-200 ${
                    isActive ? 'text-yellow-500 border-b-2 border-yellow-500 pb-1' : 'text-gray-700 hover:text-yellow-500'
                  }`
                }
              >
                {t(link.labelKey)}
              </NavLink>
            ))}

            {/* Programs Dropdown */}
            <div
              onMouseEnter={() => setProgramsOpen(true)}
              onMouseLeave={() => setProgramsOpen(false)}
              className="relative"
            >
              <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={programsOpen}
                className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-yellow-500 transition duration-200"
              >
                {t('nav.programs')}
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${programsOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {programsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-gray-200 bg-white p-2 shadow-xl"
                  >
                    <div className="space-y-1">
                      {programLinks.map((link) => (
                        <NavLink
                          key={link.path}
                          to={link.path}
                          className={({ isActive }) =>
                            `block rounded-lg px-4 py-2 text-sm font-medium transition duration-200 ${
                              isActive ? 'bg-yellow-500 text-white' : 'text-gray-700 hover:bg-gray-100'
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
          </div>

          {/* Call Button */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <a href={`tel:${phoneNumber}`} className="hidden sm:flex items-center gap-3 rounded-full bg-gray-900 text-white px-4 py-2 hover:bg-black transition-colors">
              <Phone size={18} />
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest">Call Us Now</p>
                <p className="text-sm font-bold">{phoneNumber}</p>
              </div>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 lg:hidden text-gray-700 hover:text-yellow-500 transition-colors"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `block rounded-lg px-4 py-3 text-sm font-medium transition duration-200 ${
                      isActive ? 'bg-yellow-500 text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  {t(link.labelKey)}
                </NavLink>
              ))}

              <button
                type="button"
                onClick={() => setMobileProgramsOpen((prev) => !prev)}
                className="w-full flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 transition duration-200"
                aria-expanded={mobileProgramsOpen}
              >
                {t('nav.programs')}
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileProgramsOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {mobileProgramsOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-2 space-y-1 pl-2">
                      {programLinks.map((link) => (
                        <NavLink
                          key={link.path}
                          to={link.path}
                          className={({ isActive }) =>
                            `block rounded-lg px-4 py-2 text-sm font-medium transition duration-200 ${
                              isActive ? 'bg-yellow-500 text-white' : 'text-gray-700 hover:bg-gray-100'
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

              <a
                href={`tel:${phoneNumber}`}
                className="flex items-center gap-3 rounded-lg bg-gray-900 text-white px-4 py-3 hover:bg-black transition-colors"
              >
                <Phone size={18} />
                <div>
                  <p className="text-xs font-semibold uppercase">Call Us Now</p>
                  <p className="text-sm font-bold">{phoneNumber}</p>
                </div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
