import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaBook, FaLink, FaDownload, FaSearch, FaGlobe, FaFilePdf } from 'react-icons/fa';
import PageHero from '../components/PageHero';
import SectionTitle from '../components/SectionTitle';
import library from '../data/library.json';

const typeIcon = {
  ebook: FaBook,
  syllabus: FaFilePdf,
  link: FaGlobe,
};

const typeColor = {
  ebook: 'bg-blue-100 text-blue-700',
  syllabus: 'bg-red-100 text-red-700',
  link: 'bg-green-100 text-green-700',
};

const categoryLabels = {
  textbook: 'Textbooks',
  syllabus: 'Syllabus',
  'digital-library': 'Digital Libraries',
  'online-learning': 'Online Learning',
  practice: 'Practice Platforms',
};

export default function Library() {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filtered = library.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesType;
  });

  const groupedByCategory = filtered.reduce((acc, item) => {
    const cat = item.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  return (
    <div>
      <PageHero
        title="Library & Resources"
        subtitle="Access academic resources, syllabi, e-books, and useful links."
        breadcrumb="Library"
      />

      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10">
            <div className="relative flex-1">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'ebook', 'syllabus', 'link'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer border-none capitalize ${
                    filterType === type
                      ? 'bg-primary text-white'
                      : 'bg-surface text-gray-600 hover:bg-surface-dark'
                  }`}
                >
                  {type === 'all' ? 'All' : type === 'ebook' ? 'E-Books' : type === 'syllabus' ? 'Syllabus' : 'Links'}
                </button>
              ))}
            </div>
          </div>

          {/* Resources grouped by category */}
          {Object.entries(groupedByCategory).map(([category, items]) => (
            <div key={category} className="mb-8 sm:mb-10">
              <h3 className="text-lg sm:text-xl font-bold text-primary mb-3 sm:mb-4 border-b-2 border-secondary pb-2">
                {categoryLabels[category] || category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {items.map((item, index) => {
                  const Icon = typeIcon[item.type] || FaLink;
                  return (
                    <motion.a
                      key={item.id}
                      href={item.url}
                      target={item.type === 'link' ? '_blank' : undefined}
                      rel="noreferrer"
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-accent transition-all no-underline group"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${typeColor[item.type] || 'bg-gray-100 text-gray-600'}`}>
                          <Icon className="text-lg" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-primary text-sm group-hover:text-accent transition-colors truncate">
                            {item.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-400 capitalize">{item.type}</span>
                            {item.semester && (
                              <span className="text-xs bg-surface px-2 py-0.5 rounded">Sem {item.semester}</span>
                            )}
                          </div>
                        </div>
                        {item.type === 'syllabus' && <FaDownload className="text-gray-400 group-hover:text-accent transition-colors shrink-0" />}
                        {item.type === 'link' && <FaLink className="text-gray-400 group-hover:text-accent transition-colors shrink-0" />}
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <FaSearch className="text-4xl mx-auto mb-3" />
              <p className="text-lg">No resources found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
