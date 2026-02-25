import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';
import PageHero from '../components/PageHero';
import gallery from '../data/gallery.json';

const categories = [
  { key: 'all', label: 'All' },
  { key: 'infrastructure', label: 'Infrastructure' },
  { key: 'events', label: 'Events' },
  { key: 'celebrations', label: 'Celebrations' },
  { key: 'placements', label: 'Placements' },
  { key: 'achievements', label: 'Achievements' },
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const filtered = activeCategory === 'all'
    ? gallery
    : gallery.filter(g => g.category === activeCategory);

  return (
    <div>
      <PageHero
        title="Photo Gallery"
        subtitle="A visual journey through our department's activities and events."
        breadcrumb="Gallery"
      />

      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer border-none ${
                  activeCategory === cat.key
                    ? 'bg-primary text-white'
                    : 'bg-surface text-gray-600 hover:bg-surface-dark'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
            <AnimatePresence>
              {filtered.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedImage(item)}
                  className="break-inside-avoid cursor-pointer group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-white"
                >
                  <div className="relative overflow-hidden">
                    <div className="aspect-[4/3] bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center">
                      <img
                        src={item.imageUrl}
                        alt={item.caption}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = `<div class="flex items-center justify-center w-full h-full aspect-[4/3] bg-gradient-to-br from-primary/10 to-accent/10 text-5xl">📸</div>`;
                        }}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                      <div className="p-4 text-white">
                        <p className="font-medium text-sm">{item.caption}</p>
                        <span className="text-xs text-gray-300 capitalize">{item.category}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p className="text-lg">No photos in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white text-2xl bg-transparent border-none cursor-pointer hover:text-secondary z-10"
            >
              <FaTimes />
            </button>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full"
            >
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.caption}
                className="w-full max-h-[80vh] object-contain rounded-lg"
                onError={(e) => {
                  e.target.src = '';
                  e.target.parentElement.innerHTML = `<div class="flex items-center justify-center h-96 bg-gray-800 rounded-lg text-white text-xl">Image not available</div>`;
                }}
              />
              <div className="text-center mt-4">
                <p className="text-white font-medium">{selectedImage.caption}</p>
                <p className="text-gray-400 text-sm capitalize">{selectedImage.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
