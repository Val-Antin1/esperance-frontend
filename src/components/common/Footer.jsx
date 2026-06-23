import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import { contactInfo } from '../../data/sampleData';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'News & Events', path: '/news' },
  { label: 'Contact', path: '/contact' },
];

const sportLinks = [
  { label: 'Football Academy', path: '/football' },
  { label: "Women's Football", path: '/women-football' },
  { label: 'Basketball', path: '/basketball' },
  { label: 'Volleyball', path: '/volleyball' },
  { label: 'Table Tennis', path: '/table-tennis' },
  { label: 'German Classes', path: '/german-classes' },
];

const Footer = () => {
  return (
    <footer className="bg-white">
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
                <h3 className="text-xl font-bold text-gray-800">Esperance FC Academy</h3>
                <p className="text-gray-500 text-sm">Premium sports training for elite talent</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Developing champions through world-class sports training, character building, and academic excellence since 2011.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-3 mt-6">
              <a href={contactInfo.social.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 text-gray-600 hover:bg-accent hover:text-white rounded-full flex items-center justify-center transition-colors">
                <FaFacebook className="text-lg" />
              </a>
              <a href={contactInfo.social.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 text-gray-600 hover:bg-accent hover:text-white rounded-full flex items-center justify-center transition-colors">
                <FaInstagram className="text-lg" />
              </a>
              <a href={contactInfo.social.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 text-gray-600 hover:bg-accent hover:text-white rounded-full flex items-center justify-center transition-colors">
                <FaYoutube className="text-lg" />
              </a>
              <a href={contactInfo.social.whatsapp} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 text-gray-600 hover:bg-accent hover:text-white rounded-full flex items-center justify-center transition-colors">
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
            <h4 className="text-lg font-semibold text-gray-800 mb-6 relative after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-0.5 after:bg-accent">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-600 hover:text-accent transition-colors text-sm">
                    {link.label}
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
            <h4 className="text-lg font-semibold text-gray-800 mb-6 relative after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-0.5 after:bg-accent">
              Our Sports
            </h4>
            <ul className="space-y-3">
              {sportLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-600 hover:text-accent transition-colors text-sm">
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
            <h4 className="text-lg font-semibold text-gray-800 mb-6 relative after:absolute after:-bottom-2 after:left-0 after:w-10 after:h-0.5 after:bg-accent">
              Contact
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <span className="text-accent mt-1">📍</span>
                <span className="text-gray-600">{contactInfo.address}</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-accent">📞</span>
                <a href={`tel:${contactInfo.phone}`} className="text-gray-600 hover:text-accent transition-colors">{contactInfo.phone}</a>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-accent">✉️</span>
                <a href={`mailto:${contactInfo.email}`} className="text-gray-600 hover:text-accent transition-colors">{contactInfo.email}</a>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Esperance FC Academy. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm text-gray-500 items-center">
            <Link to="/admin" className="hover:text-accent transition-colors">Admin Login</Link>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
