import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Seo from '../components/common/Seo';
import SectionTitle from '../components/common/SectionTitle';
import { contactInfo } from '../data/sampleData';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaYoutube, FaWhatsapp, FaClock, FaGlobeAfrica } from 'react-icons/fa';

const Contact = () => {
  const { t } = useTranslation();
  const contactDetails = [
    {
      icon: FaPhone,
      label: t('buttons.contactUs'),
      value: contactInfo.phone,
      href: `tel:${contactInfo.phone}`,
      bg: 'bg-gray-100',
      shadow: 'shadow-slate-200/50',
      delay: 0,
    },
    {
      icon: FaEnvelope,
      label: t('contact.form.email'),
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
      bg: 'bg-gray-100',
      shadow: 'shadow-slate-200/50',
      delay: 0.1,
    },
    {
      icon: FaMapMarkerAlt,
      label: t('common.noData'),
      value: contactInfo.address,
      bg: 'bg-gray-100',
      shadow: 'shadow-slate-200/50',
      delay: 0.2,
    },
    {
      icon: FaClock,
      label: t('common.loading'),
      value: 'Mon - Sat: 6:00 AM - 7:00 PM',
      bg: 'bg-gray-100',
      shadow: 'shadow-slate-200/50',
      delay: 0.3,
    },
  ];

  const socialLinks = [
    { icon: FaFacebook, href: contactInfo.social.facebook, color: 'hover:bg-[#1877F2]', label: 'Facebook' },
    { icon: FaInstagram, href: contactInfo.social.instagram, color: 'hover:bg-[#E4405F]', label: 'Instagram' },
    { icon: FaYoutube, href: contactInfo.social.youtube, color: 'hover:bg-[#FF0000]', label: 'Youtube' },
    { icon: FaWhatsapp, href: contactInfo.social.whatsapp, color: 'hover:bg-[#25D366]', label: 'WhatsApp' },
  ];

  return (
    <div>
      <Seo path="/contact" />
      {/* Hero Section */}
      <div className="relative min-h-[45vh] sm:min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-primary via-primary/95 to-primary/80 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6"
          >
            <FaGlobeAfrica className="text-4xl text-white" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{t('contact.hero.title')}</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">{t('contact.hero.subtitle')}</p>
        </motion.div>
      </div>

      {/* Contact Info Cards Section */}
      <section className="py-20 bg-white relative">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-50 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <SectionTitle
              title="Contact Information"
              subtitle="We're here to help. Choose your preferred way to connect with us."
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactDetails.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: item.delay }}
                whileHover={{ y: -6 }}
                className="group relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.bg} rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 ${item.shadow} blur-xl`} />
                <div className="relative bg-white border border-gray-100 rounded-2xl p-8 text-center group-hover:border-transparent transition-all duration-500 shadow-[0_10px_40px_rgba(15,23,42,0.06)] group-hover:shadow-2xl">
                  <div className={`${item.bg} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg ${item.shadow} group-hover:scale-110 transition-transform duration-500`}>
                    <item.icon className="text-2xl text-gray-700" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.label}</h3>
                  {item.href ? (
                    <a href={item.href} className="text-gray-600 group-hover:text-gray-800 transition-colors text-sm leading-relaxed">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-gray-600 text-sm leading-relaxed">{item.value}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Social Media Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative max-w-2xl mx-auto text-center"
          >
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 border border-gray-100 shadow-[0_10px_40px_rgba(15,23,42,0.04)]">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Follow Our Journey</h3>
              <p className="text-gray-500 mb-8">Stay connected with us on social media for the latest updates and behind-the-scenes content.</p>
              <div className="flex items-center justify-center gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-14 h-14 bg-primary text-white rounded-2xl flex items-center justify-center ${social.color} transition-all duration-300 shadow-lg shadow-primary/20 hover:shadow-xl`}
                    title={social.label}
                  >
                    <social.icon className="text-xl" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <SectionTitle title="Visit Our Campus" subtitle="Come see our facilities in person. We're located at GS Kimisagara." />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="h-[320px] sm:h-[420px] rounded-3xl overflow-hidden border border-gray-200 shadow-[0_30px_80px_rgba(15,23,42,0.08)] group"
            >
              <iframe
                title="GS Kimisagara Directions"
                src="https://www.google.com/maps?q=GS+Kimisagara,+Kigali,+Rwanda&output=embed"
                className="w-full h-full group-hover:scale-105 transition-transform duration-700"
                frameBorder="0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col justify-between p-8 bg-white rounded-3xl border border-gray-200 shadow-[0_30px_80px_rgba(15,23,42,0.05)]"
            >
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-amber-500 flex items-center justify-center text-white text-xl shadow-lg shadow-accent/20">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-primary">GS Kimisagara</h3>
                    <p className="text-gray-500 text-sm">Kimisagara, Kigali, Rwanda</p>
                  </div>
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Our academy is located near GS Kimisagara in Kigali. Use the map to get real-time directions directly to the campus.
                </p>
                <div className="space-y-4 p-5 bg-gray-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-accent flex-shrink-0" />
                    <div>
                      <span className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Address</span>
                      <span className="text-sm text-gray-700">{contactInfo.address}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaPhone className="text-accent flex-shrink-0" />
                    <div>
                      <span className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Phone</span>
                      <a href={`tel:${contactInfo.phone}`} className="text-sm text-accent hover:underline">{contactInfo.phone}</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaEnvelope className="text-accent flex-shrink-0" />
                    <div>
                      <span className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Email</span>
                      <a href={`mailto:${contactInfo.email}`} className="text-sm text-accent hover:underline">{contactInfo.email}</a>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="https://www.google.com/maps/dir/?api=1&destination=GS+Kimisagara,+Kigali,+Rwanda"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-4 mt-6 w-full rounded-2xl bg-gradient-to-r from-primary to-primary-light text-white font-semibold shadow-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                <FaMapMarkerAlt className="mr-2" />
                Get real directions
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
