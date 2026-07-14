import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronDown } from 'react-icons/hi';
import { FaCheck, FaGlobe, FaLanguage } from 'react-icons/fa';

const LanguageSwitcher = ({ compact = false }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  // Language configuration
  const languages = [
    { code: 'en', label: 'English', icon: FaLanguage },
    { code: 'de', label: 'Deutsch', icon: FaGlobe },
  ];

  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
    localStorage.setItem('appLanguage', languageCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Language Switcher Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className={`flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 font-medium transition-all duration-200 hover:bg-gray-100 hover:border-gray-300 hover:shadow-md ${compact ? 'px-2.5 py-1.5 text-xs shadow-sm' : 'px-4 py-2.5 text-sm shadow-sm'}`}
      >
        <FaGlobe className={`text-primary ${compact ? 'h-3.5 w-3.5' : 'h-4 w-4'}`} />
        <span>{currentLanguage.label}</span>
        <HiChevronDown
          className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''} ${compact ? 'h-3.5 w-3.5' : 'h-4 w-4'}`}
        />
      </motion.button>

      {/* Language Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-3 w-48 rounded-2xl bg-white border border-gray-200 shadow-xl shadow-black/10 p-2 z-50"
          >
            <div className="space-y-1">
              {languages.map((language) => (
                <motion.button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  whileHover={{ x: 4 }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    currentLanguage.code === language.code
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                  }`}
                >
                  {language.icon && <language.icon className="h-4 w-4 text-primary" />}
                  <span>{language.label}</span>
                  {currentLanguage.code === language.code && (
                    <FaCheck className="ml-auto h-3.5 w-3.5 text-primary" />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
