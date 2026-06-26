import { motion } from 'framer-motion';
import { FaNewspaper } from 'react-icons/fa';
import { normalizeImageUrl } from '../../utils/imageUrl';

const NewsCard = ({ article, index = 0, featured = false }) => {
  const imageUrl = normalizeImageUrl(article.imageUrl);

  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 group"
      >
        {imageUrl ? (
          <div className="h-72 overflow-hidden">
            <img src={imageUrl} alt={article.title} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="h-72 bg-gradient-to-br from-primary to-primary-light flex items-center justify-center">
            <FaNewspaper className="text-6xl text-accent/40" />
          </div>
        )}
        <div className="p-8">
          <div className="flex items-center space-x-3 mb-4">
            <span className="px-3 py-1 bg-accent/10 text-accent-dark text-sm font-medium rounded-full">{article.category}</span>
            <span className="text-gray-400 text-sm">{new Date(article.date || article.createdAt).toLocaleDateString()}</span>
          </div>
          <h3 className="text-2xl font-bold text-primary mb-4">{article.title}</h3>
          <p className="text-gray-600 leading-relaxed">{article.excerpt || article.content?.substring(0, 150)}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group"
    >
      {imageUrl ? (
        <div className="h-48 overflow-hidden">
          <img src={imageUrl} alt={article.title} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <FaNewspaper className="text-4xl text-gray-400" />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-3">
          <span className="px-2 py-0.5 bg-accent/10 text-accent-dark text-xs font-medium rounded-full">{article.category}</span>
          <span className="text-gray-400 text-xs">{new Date(article.date || article.createdAt).toLocaleDateString()}</span>
        </div>
        <h3 className="text-lg font-bold text-primary mb-2 line-clamp-2">{article.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{article.excerpt || article.content?.substring(0, 100)}</p>
      </div>
    </motion.div>
  );
};

export default NewsCard;
