import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import Seo from '../components/common/Seo';
import SectionTitle from '../components/common/SectionTitle';
import SearchBar from '../components/common/SearchBar';
import NewsCard from '../components/cards/NewsCard';
import api from '../services/api';

const ITEMS_PER_PAGE = 4;

const News = () => {
  const [newsData, setNewsData] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await api.get('/news?published=true');
        if (data.success) {
          setNewsData(data.data.news);
        }
      } catch (err) {
        console.error('Unable to load news', err);
        setNewsData([]);
      }
    };
    fetchNews();
  }, []);

  const displayNews = newsData;
  const CATEGORIES = ['All', ...new Set(displayNews.map((a) => a.category))];

  const filteredArticles = useMemo(() => {
    return displayNews.filter((article) => {
      const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (article.excerpt || article.content).toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, displayNews]);

  const featuredArticle = filteredArticles.find((a) => a.featured);
  const regularArticles = filteredArticles.filter((a) => !a.featured);
  const totalPages = Math.ceil(regularArticles.length / ITEMS_PER_PAGE);
  const paginatedArticles = regularArticles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div>
      <Seo path="/news" />
      <div className="relative min-h-[45vh] sm:min-h-[50vh] flex items-center justify-center bg-gradient-to-br from-primary via-primary/95 to-primary/80">
        <div className="absolute top-10 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">News & Events</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">Stay up to date with the latest at Esperance FC</p>
        </motion.div>
      </div>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search */}
          <div className="mb-8">
            <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search news..." />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => { setActiveCategory(category); setCurrentPage(1); }}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-primary/10 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Article */}
          {featuredArticle && (
            <div className="mb-12">
              <NewsCard article={featuredArticle} featured />
            </div>
          )}

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {paginatedArticles.map((article, index) => (
              <NewsCard key={article.id} article={article} index={index} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-12">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-lg font-medium transition-all ${
                    currentPage === i + 1
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-primary/10 border border-gray-200'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default News;
