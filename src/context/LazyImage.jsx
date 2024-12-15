import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const LazyImage = ({ src, alt }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) observer.disconnect();
    };
  }, []);

  return (
    <motion.div
      ref={imgRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      {!isLoaded && (
        <div
            className='bg-gray-200'
          style={{
            position: 'absolute',
            animation: 'pulse 1.5s infinite',
            borderRadius: '8px',
            width: '100%', height: '100%'
          }}
        ></div>
      )}
      {isVisible && (
        <img
          src={src}
          alt={alt}
          style={{
            display: isLoaded ? 'block' : 'none', // Hide image until loaded
            borderRadius: '8px',
          }}
          onLoad={() => setIsLoaded(true)} // Mark as loaded when image finishes loading
        />
      )}
      <style>
        {`
        @keyframes pulse {
          0% {
            opacity: 0.8;
          }
          50% {
            opacity: 0.2;
          }
          100% {
            opacity: 0.8;
          }
        }
        `}
      </style>
    </motion.div>
  );
};

export default LazyImage;
