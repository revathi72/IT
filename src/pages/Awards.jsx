import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrophy, FaMedal, FaStar } from 'react-icons/fa';
import PageHero from '../components/PageHero';
import SectionTitle from '../components/SectionTitle';
import achievements from '../data/achievements.json';

const categories = [
  { key: 'all', label: 'All' },
  { key: 'competition', label: 'Competitions' },
  { key: 'research', label: 'Research' },
  { key: 'academic', label: 'Academic' },
  { key: 'department', label: 'Department' },
  { key: 'entrepreneurship', label: 'Entrepreneurship' },
];

const years = [...new Set(achievements.map(a => a.year))].sort((a, b) => b - a);

const categoryIcons = {
  competition: FaTrophy,
  research: FaStar,
  academic: FaMedal,
  department: FaStar,
  entrepreneurship: FaTrophy,
};

export default function Awards() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeYear, setActiveYear] = useState('all');

  const filtered = achievements.filter(a => {
    const matchesCat = activeCategory === 'all' || a.category === activeCategory;
    const matchesYear = activeYear === 'all' || a.year === Number(activeYear);
    return matchesCat && matchesYear;
  });

  return (
    <div>
      <PageHero
        title="Awards & Achievements"
        subtitle="Celebrating excellence in academics, research, and extracurricular activities."
        breadcrumb="Awards"
      />

      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10 justify-center items-stretch md:items-center">
            <div className="flex flex-wrap justify-center gap-2">
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

            <select
              value={activeYear}
              onChange={(e) => setActiveYear(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-200 focus:border-accent outline-none text-sm"
            >
              <option value="all">All Years</option>
              {years.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {/* Awards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <AnimatePresence mode="wait">
              {filtered.map((award, index) => {
                const Icon = categoryIcons[award.category] || FaTrophy;
                return (
                  <motion.div
                    key={award.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
                  >
                    {/* Image placeholder */}
                    <div className="h-40 bg-gradient-to-br from-secondary/10 to-primary/10 flex items-center justify-center">
                      <img
                        src={award.image}
                        alt={award.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = `<div class="flex items-center justify-center w-full h-full"><span class="text-5xl">🏆</span></div>`;
                        }}
                      />
                    </div>

                    <div className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="bg-secondary/10 text-secondary text-xs px-3 py-1 rounded-full font-medium capitalize flex items-center gap-1">
                          <Icon className="text-xs" /> {award.category}
                        </span>
                        <span className="text-sm text-gray-400 font-medium">{award.year}</span>
                      </div>
                      <h3 className="text-lg font-bold text-primary mb-2">{award.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{award.description}</p>
                      {award.studentNames.length > 0 && (
                        <div className="pt-3 border-t border-gray-100">
                          <p className="text-xs text-gray-400">
                            👤 {award.studentNames.join(', ')}
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <FaTrophy className="text-4xl mx-auto mb-3" />
              <p className="text-lg">No achievements found for the selected filters.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
