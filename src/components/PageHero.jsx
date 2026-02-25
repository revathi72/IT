import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function PageHero({ title, subtitle, breadcrumb }) {
  return (
    <section className="bg-gradient-to-r from-primary to-primary-light text-white py-10 sm:py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-300 mb-3 sm:mb-4">
            <Link to="/" className="hover:text-secondary transition-colors no-underline text-gray-300">Home</Link>
            <span>/</span>
            <span className="text-secondary">{breadcrumb || title}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">{title}</h1>
          {subtitle && <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-2xl">{subtitle}</p>}
        </motion.div>
      </div>
    </section>
  );
}
