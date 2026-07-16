import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaYoutube, FaWhatsapp, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { contactInfo } from '../../data/sampleData';

const quickLinks = [
  { labelKey: 'nav.home', path: '/' },
  { labelKey: 'nav.about', path: '/about' },
  { labelKey: 'nav.gallery', path: '/gallery' },
  { labelKey: 'nav.news', path: '/news' },
  { labelKey: 'nav.contact', path: '/contact' },
];

const sportLinks = [
  { label: 'Football Academy', path: '/football-academy/football' },
  { label: "Women's Football", path: '/football-academy/womens-football' },
  { label: 'Basketball', path: '/football-academy/basketball' },
  { label: 'Volleyball', path: '/football-academy/volleyball' },
  { label: 'Table Tennis', path: '/football-academy/table-tennis' },
  { label: 'German Classes', path: '/football-academy/german-classes' },
];

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-white text-black border-t-2 border-yellow-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-24 h-24 bg-white/90 flex items-center justify-center">
                <img src="/logo.PNG" alt="Esperance FC Academy" className="h-20 w-auto object-contain" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-black">Esperance FC Academy</h3>
                <p className="text-gray-700 text-sm">{t('footer.tagline')}</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {t('footer.description')}
            </p>
            {/* Social Icons */}
            <div className="flex space-x-3 mt-6">
              <a href={contactInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white text-black hover:bg-yellow-500 hover:text-white rounded-full flex items-center justify-center transition-colors">
                <FaFacebook className="text-lg" />
              </a>
              <a href={contactInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white text-black hover:bg-yellow-500 hover:text-white rounded-full flex items-center justify-center transition-colors">
                <FaInstagram className="text-lg" />
              </a>
              <a href={contactInfo.social.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white text-black hover:bg-yellow-500 hover:text-white rounded-full flex items-center justify-center transition-colors">
                <FaYoutube className="text-lg" />
              </a>
              <a href={contactInfo.social.whatsapp} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white text-black hover:bg-yellow-500 hover:text-white rounded-full flex items-center justify-center transition-colors">
                <FaWhatsapp className="text-lg" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold text-black mb-6 relative after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-0.5 after:bg-yellow-500">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-black hover:text-yellow-500 transition-colors text-sm">
                    {t(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Sports Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-black mb-6 relative after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-0.5 after:bg-yellow-500">
              {t('footer.sports')}
            </h4>
            <ul className="space-y-3">
              {sportLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-black hover:text-yellow-500 transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold text-black mb-6 relative after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-0.5 after:bg-yellow-500">
              {t('contact.form.name')}
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <FaMapMarkerAlt className="text-yellow-500 mt-1" />
                <span className="text-black">{contactInfo.address}</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaPhoneAlt className="text-yellow-500" />
                <a href={`tel:${contactInfo.phone}`} className="text-black hover:text-yellow-500 transition-colors">{contactInfo.phone}</a>
              </li>
              <li className="flex items-center space-x-2">
                <FaEnvelope className="text-yellow-500" />
                <a href={`mailto:${contactInfo.email}`} className="text-black hover:text-yellow-500 transition-colors">{contactInfo.email}</a>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-700 text-sm">
            &copy; {new Date().getFullYear()} Esperance FC Academy. {t('footer.allRightsReserved')}
          </p>
          <div className="flex space-x-4 text-sm text-gray-700 items-center">
            <Link to="/admin" className="hover:text-yellow-500 transition-colors">{t('admin.login.title')}</Link>
            <span>{t('footer.privacy')}</span>
            <span>{t('footer.terms')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
