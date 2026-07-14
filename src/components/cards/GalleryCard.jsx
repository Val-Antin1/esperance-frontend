import { motion } from 'framer-motion';
import { FaImage } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import { normalizeImageUrl } from '../../utils/imageUrl';

const GalleryCard = ({ image, index = 0 }) => {
  const mediaSrc = normalizeImageUrl(image.imageUrl || image.src);
  const isVideo = image.type === 'video' || /\.(mp4|webm|mov)$/i.test(mediaSrc || '');
  const videoRef = useRef(null);
  const [retryCount, setRetryCount] = useState(0);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (!isVideo || !videoRef.current) return undefined;

    const video = videoRef.current;
    setVideoError(false);

    const tryPlay = () => {
      video.play().catch(() => {});
    };

    const handleError = () => {
      if (retryCount < 2) {
        setTimeout(() => {
          setRetryCount((prev) => prev + 1);
          setVideoError(true);
          if (video.currentSrc) {
            video.load();
            tryPlay();
          }
        }, 800);
      }
    };

    video.addEventListener('error', handleError);

    // Handle Intersection Observer for play/pause
    if (typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry) return;

        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: '50px', threshold: 0.6 }
    );

    observer.observe(video);

    return () => {
      video.removeEventListener('error', handleError);
      observer.disconnect();
    };
  }, [isVideo, retryCount]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ scale: 1.03 }}
      className="group relative overflow-hidden rounded-xl cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 h-full"
    >
      <div className="w-full h-full bg-gray-100 flex items-center justify-center overflow-hidden">
        {isVideo ? (
          mediaSrc ? (
            <video
              ref={videoRef}
              key={`${mediaSrc}-${retryCount}`}
              src={mediaSrc}
              autoPlay
              muted
              playsInline
              loop
              preload="auto"
              className="w-full h-full object-cover"
              onError={() => setVideoError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <FaImage className="text-4xl text-gray-400" />
            </div>
          )
        ) : mediaSrc ? (
          <img
            src={mediaSrc}
            alt={image.title}
            className="w-full h-full object-cover"
            onError={() => {}}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <FaImage className="text-4xl text-gray-400" />
          </div>
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-white font-semibold">{image.title}</p>
          <p className="text-accent text-sm">{image.category}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default GalleryCard;

