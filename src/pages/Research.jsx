import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaSearch, FaBookOpen } from 'react-icons/fa';
import PageHero from '../components/PageHero';
import SectionTitle from '../components/SectionTitle';
import publications from '../data/publications.json';

const years = [...new Set(publications.map(p => p.year))].sort((a, b) => b - a);
const types = [
  { key: 'all', label: 'All' },
  { key: 'journal', label: 'Journals' },
  { key: 'conference', label: 'Conferences' },
];

export default function Research() {
  const [filterYear, setFilterYear] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = publications.filter(p => {
    const matchesYear = filterYear === 'all' || p.year === Number(filterYear);
    const matchesType = filterType === 'all' || p.type === filterType;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.authors.join(' ').toLowerCase().includes(search.toLowerCase()) ||
      p.journal.toLowerCase().includes(search.toLowerCase());
    return matchesYear && matchesType && matchesSearch;
  });

  return (
    <div>
      <PageHero
        title="Research & Publications"
        subtitle="Explore the research contributions of our faculty and students."
        breadcrumb="Research"
      />

      {/* Stats */}
      <section className="py-8 sm:py-12 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-2xl mx-auto">
            <div className="bg-white rounded-xl p-5 text-center shadow-sm">
              <div className="text-3xl font-bold text-primary">{publications.length}</div>
              <div className="text-sm text-gray-500">Total Papers</div>
            </div>
            <div className="bg-white rounded-xl p-5 text-center shadow-sm">
              <div className="text-3xl font-bold text-accent">{publications.filter(p => p.type === 'journal').length}</div>
              <div className="text-sm text-gray-500">Journal Papers</div>
            </div>
            <div className="bg-white rounded-xl p-5 text-center shadow-sm">
              <div className="text-3xl font-bold text-secondary">{publications.filter(p => p.type === 'conference').length}</div>
              <div className="text-sm text-gray-500">Conference Papers</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10 justify-center items-stretch md:items-center">
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search papers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
              />
            </div>
            <div className="flex gap-2">
              {types.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setFilterType(t.key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer border-none ${
                    filterType === t.key
                      ? 'bg-primary text-white'
                      : 'bg-surface text-gray-600 hover:bg-surface-dark'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-200 focus:border-accent outline-none text-sm"
            >
              <option value="all">All Years</option>
              {years.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {/* Publications List */}
          <div className="space-y-4">
            {filtered.map((paper, index) => (
              <motion.div
                key={paper.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-accent/30 transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        paper.type === 'journal'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        {paper.type === 'journal' ? '📄 Journal' : '🎤 Conference'}
                      </span>
                      <span className="text-sm text-gray-400">{paper.year}</span>
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-2">{paper.title}</h3>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Authors:</span> {paper.authors.join(', ')}
                    </p>
                    <p className="text-sm text-gray-500 italic">
                      <FaBookOpen className="inline mr-1" /> {paper.journal}
                    </p>
                  </div>
                  <a
                    href={paper.doi}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-accent/10 text-accent p-3 rounded-lg hover:bg-accent hover:text-white transition-colors shrink-0"
                  >
                    <FaExternalLinkAlt />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <FaBookOpen className="text-4xl mx-auto mb-3" />
              <p className="text-lg">No publications found.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
