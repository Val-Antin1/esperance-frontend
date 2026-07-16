import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Phone, Search, ChevronDown, Menu, X } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
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
  { path: '/football-academy', labelKey: 'footballAcademy.hero.title' },
];

const searchOptions = [
  { path: '/football-academy/football', labelKey: 'football.hero.title', keywords: ['football', 'foot'] },
  { path: '/football-academy/womens-football', labelKey: 'womenFootball.hero.title', keywords: ['women', 'women\'s football', 'women football', 'womens', 'football'] },
  { path: '/football-academy/basketball', labelKey: 'basketball.hero.title', keywords: ['basketball'] },
  { path: '/football-academy/volleyball', labelKey: 'volleyball.hero.title', keywords: ['volleyball'] },
  { path: '/football-academy/table-tennis', labelKey: 'tableTennis.hero.title', keywords: ['table tennis', 'tabletennis', 'table'] },
  { path: '/football-academy/german-classes', labelKey: 'germanClasses.hero.title', keywords: ['german', 'german classes', 'language'] },
  { path: '/football-academy', labelKey: 'footballAcademy.hero.title', keywords: ['academy', 'training'] },
];

const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);
  const [searchMenuOpen, setSearchMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProgram, setSelectedProgram] = useState(null);
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
    setSearchMenuOpen(false);
  }, [location]);

  const normalizeQuery = (value) => value.trim().toLowerCase();

  const getProgramLabel = (option) => t(option.labelKey);

  const getProgramMatch = (query) => {
    const normalized = normalizeQuery(query);
    if (!normalized) return null;

    const exactMatch = searchOptions.find((option) => {
      const labelMatch = getProgramLabel(option).toLowerCase() === normalized;
      const keywordExact = option.keywords.some((keyword) => keyword === normalized);
      return labelMatch || keywordExact;
    });

    if (exactMatch) return exactMatch;

    return searchOptions.find((option) => {
      const labelMatch = getProgramLabel(option).toLowerCase().includes(normalized);
      const keywordPartial = option.keywords.some((keyword) => keyword.includes(normalized) || normalized.includes(keyword));
      return labelMatch || keywordPartial;
    });
  };

  const filteredSearchOptions = searchQuery
    ? searchOptions.filter((option) => {
        const normalized = normalizeQuery(searchQuery);
        return (
          getProgramLabel(option).toLowerCase().includes(normalized) ||
          option.keywords.some((keyword) => keyword.includes(normalized) || normalized.includes(keyword))
        );
      })
    : [];

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const program = getProgramMatch(searchQuery);
    if (program) {
      navigate(program.path);
      setSearchMenuOpen(false);
      setIsOpen(false);
      return;
    }

    const fallback = normalizeQuery(searchQuery);
    if (fallback.includes('academy') || fallback.includes('training')) {
      navigate('/football-academy');
      setSearchMenuOpen(false);
      setIsOpen(false);
    }
  };

  const handleProgramSelect = (option) => {
    setSelectedProgram(option);
    setSearchQuery(getProgramLabel(option));
    setSearchMenuOpen(false);
  };

  const handleSuggestionClick = (option) => {
    navigate(option.path);
    setSearchMenuOpen(false);
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-xl' : ''}`}>
      <div className="border-b border-gray-100 bg-[#111111] text-white">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-gray-300 sm:text-[11px]">
            <span className="hidden sm:inline">Reach out to us</span>
            <a href={contactInfo.social.facebook || '#'} target="_blank" rel="noreferrer" className="transition-colors hover:text-accent" aria-label="Facebook">
              <FaFacebookF size={14} />
            </a>
            <a href={contactInfo.social.instagram || '#'} target="_blank" rel="noreferrer" className="transition-colors hover:text-accent" aria-label="Instagram">
              <FaInstagram size={14} />
            </a>
            <a href={contactInfo.social.youtube || '#'} target="_blank" rel="noreferrer" className="transition-colors hover:text-accent" aria-label="YouTube">
              <FaYoutube size={14} />
            </a>
          </div>

          <div className="ml-auto">
            <LanguageSwitcher compact />
          </div>
        </div>
      </div>

      <div className="border-b border-gray-100 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-4 flex-shrink-0">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white/90 sm:h-20 sm:w-20">
              <img src="/logo.PNG" alt="Esperance FC Academy" className="h-14 w-auto object-contain sm:h-16" />
            </div>
          </Link>

          <div className="flex-1 hidden lg:flex items-center justify-center">
            <div className="flex items-center gap-6 xl:gap-10">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-medium transition duration-200 ${
                      isActive ? 'text-accent border-b-2 border-accent pb-1' : 'text-gray-700 hover:text-primary'
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
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${programsOpen ? 'rotate-180' : ''}`} />
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
                                isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
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
            </div>
          </div>

          <div className="hidden sm:flex items-center flex-shrink-0 pl-4 lg:pl-8 xl:pl-10">
            <a href={`tel:${phoneNumber}`} className="flex items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-left transition-colors hover:bg-gray-100">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white">
                <Phone size={16} />
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
              <Phone size={18} />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-primary hover:bg-gray-100 transition-colors"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:w-72">
            <button
              type="button"
              onClick={() => setSearchMenuOpen((prev) => !prev)}
              className="flex w-full items-center justify-between rounded-full border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
            >
              <span>{selectedProgram ? getProgramLabel(selectedProgram) : 'Programs'}</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${searchMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {searchMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  className="absolute left-0 right-0 z-20 mt-2 rounded-3xl border border-gray-200 bg-white p-3 shadow-2xl shadow-black/5"
                >
                  <div className="space-y-1">
                    {searchOptions.map((option) => (
                      <button
                        key={option.path}
                        type="button"
                        onClick={() => handleProgramSelect(option)}
                        className="w-full rounded-2xl px-4 py-3 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                      >
                        {getProgramLabel(option)}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative w-full lg:max-w-3xl">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search programs..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-full rounded-full border border-gray-200 bg-white px-5 py-4 pr-16 text-sm text-gray-700 outline-none transition duration-200 focus:border-accent focus:ring-2 focus:ring-accent/20"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-primary p-3 text-white transition-all duration-200 hover:bg-opacity-90"
                aria-label="Search programs"
              >
                <Search size={18} />
              </button>
            </form>
            {searchQuery && filteredSearchOptions.length > 0 && (
              <div className="mt-2 rounded-3xl border border-gray-200 bg-white shadow-2xl shadow-black/5">
                {filteredSearchOptions.map((option) => (
                  <button
                    key={option.path}
                    type="button"
                    onClick={() => handleSuggestionClick(option)}
                    className="w-full px-4 py-3 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    {getProgramLabel(option)}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-center gap-3">
            <a href={contactInfo.social.facebook || '#'} target="_blank" rel="noreferrer" className="rounded-full p-3 text-gray-700 transition-colors hover:bg-gray-100 hover:text-accent" aria-label="Facebook">
              <FaFacebookF size={18} />
            </a>
            <a href={contactInfo.social.instagram || '#'} target="_blank" rel="noreferrer" className="rounded-full p-3 text-gray-700 transition-colors hover:bg-gray-100 hover:text-accent" aria-label="Instagram">
              <FaInstagram size={18} />
            </a>
            <a href={contactInfo.social.youtube || '#'} target="_blank" rel="noreferrer" className="rounded-full p-3 text-gray-700 transition-colors hover:bg-gray-100 hover:text-accent" aria-label="YouTube">
              <FaYoutube size={18} />
            </a>
          </div>
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
                className="flex items-center gap-3 rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-left transition-colors hover:bg-gray-100"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white">
                  <Phone size={16} />
                </div>
                <div className="leading-tight">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">Call Us Now</p>
                  <p className="text-sm font-semibold text-gray-900">{phoneNumber}</p>
                </div>
              </a>

              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `block rounded-2xl px-4 py-3 text-sm font-medium transition duration-200 ${
                      isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
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
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileProgramsOpen ? 'rotate-180' : ''}`} />
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
                              isActive ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-primary'
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
