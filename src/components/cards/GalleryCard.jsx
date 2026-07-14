import { motion } from 'framer-motion';
import { FaImage } from 'react-icons/fa';
import { useEffect, useRef, useState } from 'react';
import { normalizeImageUrl } from '../../utils/imageUrl';

const GalleryCard = ({ image, index = 0 }) => {
  const mediaSrc = normalizeImageUrl(image.imageUrl || image.src);
  const isVideo = image.type === 'video' || /\.(mp4|webm|mov)$/i.test(mediaSrc || '');
  const videoRef = useRef(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (!isVideo || !videoRef.current || typeof IntersectionObserver === 'undefined') {
      if (isVideo && mediaSrc) {
        setShouldLoadVideo(true);
      }
      return undefined;
    }

    const video = videoRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry) return;

        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
          if (entry.intersectionRatio >= 0.6) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        } else {
          video.pause();
        }
      },
      { rootMargin: '120px 0px 120px 0px', threshold: [0, 0.6] }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [isVideo, mediaSrc]);

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
          shouldLoadVideo && mediaSrc ? (
            <video
              ref={videoRef}
              src={mediaSrc}
              autoPlay
              muted
              playsInline
              loop
              preload="metadata"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <FaImage className="text-4xl text-gray-400" />
            </div>
          )
        ) : mediaSrc && !imgError ? (
          <img
            src={mediaSrc}
            alt={image.title}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
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
