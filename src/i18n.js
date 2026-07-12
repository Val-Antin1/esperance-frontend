import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from './locales/en/translation.json';
import deTranslation from './locales/de/translation.json';

i18n
  // Load language detector
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    // Define resources
    resources: {
      en: {
        translation: enTranslation,
      },
      de: {
        translation: deTranslation,
      },
    },
    // Fallback language
    fallbackLng: 'en',
    // Default language if no language is selected
    lng: localStorage.getItem('appLanguage') || 'en',
    // Enable debug mode (set to false in production)
    debug: false,
    // Namespace configuration
    ns: ['translation'],
    defaultNS: 'translation',
    // Interpolation settings
    interpolation: {
      // React already handles escaping
      escapeValue: false,
    },
    // Detector options to use localStorage for persistence
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
