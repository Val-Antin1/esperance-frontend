import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { contactInfo } from '../../data/sampleData';

const WhatsAppButton = () => {
  // Extract phone number and remove all non-digit characters except leading +
  const whatsappNumber = contactInfo.phone.replace(/[^\d+]/g, '').replace('+', '');
  const whatsappMessage = 'Hello! I would like to inquire about Esperance FC Academy programs.';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      whileHover={{ scale: 1.1, boxShadow: '0 10px 30px rgba(37, 211, 102, 0.4)' }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 group"
      title="Chat with us on WhatsApp"
    >
      <FaWhatsapp className="text-2xl group-hover:animate-bounce" />
    </motion.a>
  );
};

export default WhatsAppButton;
