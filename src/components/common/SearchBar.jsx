import { motion } from 'framer-motion';
import { HiSearch } from 'react-icons/hi';

const SearchBar = ({ value, onChange, placeholder = 'Search...' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative max-w-md mx-auto"
    >
      <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-gray-700 placeholder-gray-400 shadow-sm"
      />
    </motion.div>
  );
};

export default SearchBar;
