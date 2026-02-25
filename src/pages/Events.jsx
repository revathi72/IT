import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import PageHero from '../components/PageHero';
import SectionTitle from '../components/SectionTitle';
import events from '../data/events.json';

const categories = [
  { key: 'all', label: 'All Events' },
  { key: 'technical', label: 'Technical' },
  { key: 'workshop', label: 'Workshops' },
  { key: 'seminar', label: 'Seminars' },
  { key: 'conference', label: 'Conferences' },
  { key: 'visit', label: 'Visits' },
];

export default function Events() {
  const [activeCategory, setActiveCategory] = useState('all');

  const upcoming = events.filter(e => e.isUpcoming);
  const past = events.filter(e => !e.isUpcoming);

  const filteredPast = activeCategory === 'all'
    ? past
    : past.filter(e => e.category === activeCategory);

  return (
    <div>
      <PageHero
        title="Events & Activities"
        subtitle="Stay updated with our department's technical events, workshops, and seminars."
        breadcrumb="Events"
      />

      {/* Upcoming Events */}
      {upcoming.length > 0 && (
        <section className="py-10 sm:py-16 bg-gradient-to-r from-accent to-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionTitle title="Upcoming Events" subtitle="Don't miss out!" light />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {upcoming.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/30 hover:bg-white/20 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-bold animate-pulse">
                      🔴 UPCOMING
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{event.title}</h3>
                  <p className="text-sm text-gray-200 mb-4">{event.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-secondary" />
                      <span>
                        {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                        {event.endDate && ` - ${new Date(event.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}`}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt className="text-secondary" />
                      <span>{event.venue}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {event.highlights.map((h, i) => (
                      <span key={i} className="bg-secondary/30 text-secondary-light text-xs px-2 py-1 rounded">
                        {h}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Past Events */}
      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer border-none ${
                  activeCategory === cat.key
                    ? 'bg-primary text-white'
                    : 'bg-surface text-gray-600 hover:bg-surface-dark'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <AnimatePresence mode="wait">
              {filteredPast.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  {/* Image placeholder */}
                  <div className="h-40 bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center">
                    <img
                      src={event.images[0]}
                      alt={event.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `<div class="flex items-center justify-center w-full h-full text-4xl">📸</div>`;
                      }}
                    />
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="bg-accent/10 text-accent text-xs px-2 py-1 rounded capitalize">
                        {event.category}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <FaCalendarAlt />
                        {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-2">{event.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{event.description.substring(0, 120)}...</p>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <FaMapMarkerAlt /> {event.venue}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredPast.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p className="text-lg">No events found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
