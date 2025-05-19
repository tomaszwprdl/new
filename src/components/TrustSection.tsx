import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export default function TrustSection() {
  const { language } = useLanguage();
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="text-xl text-blue-700 mb-8 max-w-2xl text-center mx-auto"
    >
      {language === 'pl' 
        ? 'Dołącz do naszych zadowolonych podróżników i przekonaj się sam!'
        : <>
            <div>Join Our Happy Travelers and See for</div>
            <span className="text-blue-700 font-bold">Yourself!</span>
          </>}
    </motion.div>
  );
} 