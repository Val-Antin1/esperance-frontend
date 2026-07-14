import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { HiChevronDown, HiMenu, HiPhone, HiX } from 'react-icons/hi';
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
  { path: '/football-academy/football', labelKey: 'football.hero.title' },
  { path: '/football-academy/womens-football', labelKey: 'womenFootball.hero.title' },
  { path: '/football-academy/basketball', labelKey: 'basketball.hero.title' },
  { path: '/football-academy/volleyball', labelKey: 'volleyball.hero.title' },
  { path: '/football-academy/table-tennis', labelKey: 'tableTennis.hero.title' },
  { path: '/football-academy/german-classes', labelKey: 'germanClasses.hero.title' },
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
  }, [location]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-xl' : ''}`}>
      <div className="border-b border-gray-100 bg-[#111111] text-white">
        <div className="mx-auto flex min-h-[38px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-gray-300 sm:text-[11px]">
            <span className="hidden sm:inline">Reach out to us</span>
            <span className="sm:hidden">Contact</span>
            <div className="flex items-center gap-2">
              <a href={contactInfo.social.facebook || '#'} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#d4af37]" aria-label="Facebook">
                <FaFacebookF size={14} />
              </a>
              <a href={contactInfo.social.instagram || '#'} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#d4af37]" aria-label="Instagram">
                <FaInstagram size={14} />
              </a>
            </div>
          </div>

          <div className="ml-auto flex items-center">
            <LanguageSwitcher compact />
          </div>
        </div>
      </div>

      <div className={`border-b border-gray-100 bg-white/95 backdrop-blur-sm ${scrolled ? 'shadow-xl' : ''}`}>
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-4 flex-shrink-0">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white/90 sm:h-20 sm:w-20">
              <img src="/logo.PNG" alt="Esperance FC Academy" className="h-14 w-auto object-contain sm:h-16" />
            </div>
          </Link>

          <div className="hidden lg:flex flex-1 items-center justify-center">
            <div className="flex items-center gap-6 xl:gap-8">
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
                  {t(link.labelKey)}
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
                  {t('nav.programs')}
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
                            {t(link.labelKey)}
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
                  {t(link.labelKey)}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="hidden sm:flex items-center flex-shrink-0 pl-4 lg:pl-8 xl:pl-10">
            <a href={`tel:${phoneNumber}`} className="flex items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-left transition-colors hover:bg-gray-100">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white">
                <HiPhone size={16} />
              </div>
              <div className="leading-tight">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">Call Us Now</p>
                <p className="text-sm font-semibold text-gray-900">{phoneNumber}</p>
              </div>
            </a>
          </div>

          <div className="flex items-center gap-2 sm:hidden">
            <a
              href={`tel:${phoneNumber}`}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-primary transition-colors hover:bg-gray-100"
              aria-label={`Call ${phoneNumber}`}
            >
              <HiPhone size={18} />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-primary hover:bg-gray-100 transition-colors"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hidden p-2 rounded-lg text-primary hover:bg-gray-100 transition-colors sm:hidden"
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
              <a
                href={`tel:${phoneNumber}`}
                className="flex items-center justify-between rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
              >
                <span>Call Us Now</span>
                <HiPhone className="text-primary" size={16} />
              </a>

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
                  {t(link.labelKey)}
                </NavLink>
              ))}

              <button
                type="button"
                onClick={() => setMobileProgramsOpen((prev) => !prev)}
                className="w-full flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 transition duration-200"
                aria-expanded={mobileProgramsOpen}
              >
                {t('nav.programs')}
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
                          {t(link.labelKey)}
                        </NavLink>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mobile Language Switcher */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <LanguageSwitcher compact />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
