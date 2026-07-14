import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FaUserLock, FaSpinner, FaExclamationCircle, FaEye, FaEyeSlash, FaArrowRight } from 'react-icons/fa';
import Seo from '../components/common/Seo';
import api from '../services/api';

const AdminLogin = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Track if welcome voice has been played to prevent multiple plays on re-renders
  const voicePlayedRef = useRef(false);

  // If already logged in, redirect to dashboard
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate]);

  /**
   * Play a professional welcome voice greeting using the Web Speech API
   * - Waits 500ms after successful login before speaking
   * - Prevents multiple plays during re-renders using ref
   * - Gracefully handles browsers without speechSynthesis support
   * - Returns a promise that resolves when speech finishes
   */
  const playWelcomeVoice = (email = '') => {
    if (!window.speechSynthesis) {
      console.log('Speech Synthesis not supported in this browser');
      return Promise.resolve();
    }

    if (voicePlayedRef.current) {
      return Promise.resolve();
    }

    voicePlayedRef.current = true;

    return new Promise((resolve) => {
      setTimeout(() => {
        try {
          window.speechSynthesis.cancel();

          const normalizedEmail = (email || '').trim().toLowerCase();
          const greeting = normalizedEmail === 'valentinlyon205@gmail.com'
            ? 'Welcome Valentin.'
            : normalizedEmail === 'domyserry@yahoo.fr'
              ? 'Welcome Domy.'
              : 'Welcome.';

          const utterance = new SpeechSynthesisUtterance(greeting);
          utterance.lang = 'en-US';
          utterance.rate = 0.95;
          utterance.pitch = 1.15;
          utterance.volume = 1;

          const voices = window.speechSynthesis.getVoices();
          const preferredVoice = voices.find((voice) => {
            const name = voice.name.toLowerCase();
            return voice.lang.toLowerCase().startsWith('en') && (
              name.includes('david') ||
              name.includes('mark') ||
              name.includes('james') ||
              name.includes('male') ||
              name.includes('microsoft') ||
              name.includes('google us english')
            );
          }) || voices.find((voice) => voice.lang.toLowerCase().startsWith('en')) || voices[0];

          if (preferredVoice) {
            utterance.voice = preferredVoice;
          }

          utterance.onend = () => resolve();
          utterance.onerror = (error) => {
            console.log('Speech synthesis error:', error.error);
            resolve();
          };

          window.speechSynthesis.speak(utterance);
        } catch (error) {
          console.log('Error initializing speech synthesis:', error);
          resolve();
        }
      }, 500);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await api.post('/auth/login', {
        email: credentials.email,
        password: credentials.password,
      });

      if (data.success && data.data) {
        localStorage.setItem('adminToken', data.data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.data.user));
        if (rememberMe) {
          localStorage.setItem('rememberEmail', credentials.email);
        }

        // Play a personalized, more masculine welcome voice after successful login
        await playWelcomeVoice(credentials.email);
        navigate('/admin/dashboard', { replace: true });
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Login failed. Please check your credentials.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen flex bg-white overflow-hidden">
      <Seo path="/admin" noindex />
      {/* Left Side - Hero Section 60% */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="hidden lg:flex w-3/5 relative overflow-hidden"
      >
        {/* Background gradient with sports theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          {/* Animated background elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-40 -right-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          />
          
          {/* Dark overlay pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full px-12 text-white">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-md"
          >
            {/* Logo Icon */}
            <motion.div
              variants={itemVariants}
              className="mb-8 flex justify-center"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-accent to-accent/60 rounded-3xl flex items-center justify-center shadow-2xl">
                <div className="text-5xl font-bold text-white">⚽</div>
              </div>
            </motion.div>

            {/* Academy Name */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl font-bold mb-4 text-white"
            >
              Esperance FC
            </motion.h1>

            {/* Slogan */}
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-300 mb-3 font-light"
            >
              Premier Sports Academy
            </motion.p>

            {/* Tagline */}
            <motion.div
              variants={itemVariants}
              className="w-16 h-1 bg-accent mx-auto mb-6 rounded-full"
            />

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-400 mb-12 leading-relaxed"
            >
              Empowering athletes to achieve excellence on and off the field. Join our community of champions.
            </motion.p>

            {/* Features */}
            <motion.div
              variants={itemVariants}
              className="space-y-4 text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span className="text-gray-300">World-class coaching facilities</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span className="text-gray-300">Comprehensive athlete development</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span className="text-gray-300">Professional management portal</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Side - Login Form 40% / Full Width on Mobile */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full lg:w-2/5 flex flex-col items-center justify-center p-6 md:p-12 bg-gradient-to-b from-gray-50 to-white relative"
      >
        {/* Glassmorphism background accent */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

        {/* Go back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute top-6 left-6 md:top-8 md:left-8"
        >
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors text-sm font-medium group"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform">←</span>
            {t('buttons.back')}
          </Link>
        </motion.div>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-sm relative z-10"
        >
          {/* Card Header */}
          <div className="text-center mb-10">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
            >
              {t('admin.login.title')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 text-sm md:text-base"
            >
              {t('admin.login.subtitle')}
            </motion.p>
          </div>

          {/* Error Alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3 backdrop-blur-md"
            >
              <FaExclamationCircle className="text-red-500 mt-0.5 shrink-0 text-lg" />
              <p className="text-sm text-red-700 font-medium">{error}</p>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-semibold text-gray-800 mb-2.5">{t('admin.login.email')}</label>
              <input
                type="email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                placeholder={t('admin.login.emailPlaceholder')}
                required
                disabled={loading}
                className="w-full px-5 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-0 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-gray-900 placeholder-gray-400"
              />
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-sm font-semibold text-gray-800 mb-2.5">{t('admin.login.password')}</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  placeholder={t('admin.login.passwordPlaceholder')}
                  required
                  disabled={loading}
                  className="w-full px-5 py-3.5 pr-12 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-0 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-gray-900 placeholder-gray-400"
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </motion.button>
              </div>
            </motion.div>

            {/* Remember Me & Forgot Password */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-between"
            >
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                  className="w-4 h-4 rounded border border-gray-300 text-primary focus:ring-accent disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <span className="text-sm text-gray-700 font-medium group-hover:text-gray-900 transition-colors">{t('admin.login.rememberMe')}</span>
              </label>
              <Link
                to="#"
                className="text-sm text-primary hover:text-primary-light font-medium transition-colors"
              >
                {t('admin.login.forgotPassword')}
              </Link>
            </motion.div>

            {/* Login Button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={loading ? {} : { scale: 1.01, boxShadow: '0 12px 24px rgba(17, 17, 17, 0.2)' }}
              whileTap={loading ? {} : { scale: 0.99 }}
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold rounded-xl hover:from-black hover:to-gray-900 transition-all duration-300 flex items-center justify-center gap-2.5 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" size={18} />
                  <span>{t('admin.login.signingIn')}</span>
                </>
              ) : (
                <>
                  <span>{t('admin.login.signIn')}</span>
                  <FaArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center text-xs text-gray-500 mt-6"
          >
            Secure admin portal • Protected access only
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;