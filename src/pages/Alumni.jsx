import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaSearch, FaQuoteLeft } from 'react-icons/fa';
import PageHero from '../components/PageHero';
import SectionTitle from '../components/SectionTitle';
import alumni from '../data/alumni.json';

export default function Alumni() {
  const [search, setSearch] = useState('');

  const filtered = alumni.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.currentCompany.toLowerCase().includes(search.toLowerCase()) ||
    a.batchYear.includes(search)
  );

  return (
    <div>
      <PageHero
        title="Our Alumni"
        subtitle="Our graduates are making a mark across the globe."
        breadcrumb="Alumni"
      />

      {/* Alumni Directory */}
      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          {/* Search */}
          <div className="max-w-md mx-auto mb-8 sm:mb-10">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, company, or batch..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
              />
            </div>
          </div>

          {/* Alumni Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filtered.map((person, index) => (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="bg-gradient-to-r from-primary to-primary-light p-5 text-white">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center overflow-hidden shrink-0">
                      <img
                        src={person.photo}
                        alt={person.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.innerHTML = `<div class="flex items-center justify-center w-full h-full text-2xl font-bold text-white">${person.name.charAt(0)}</div>`;
                        }}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{person.name}</h3>
                      <p className="text-secondary text-sm">{person.designation}</p>
                      <p className="text-gray-300 text-xs">{person.currentCompany}</p>
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">
                      Batch: {person.batchYear}
                    </span>
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-accent hover:text-primary transition-colors"
                    >
                      <FaLinkedin size={20} />
                    </a>
                  </div>

                  {person.testimonial && (
                    <div className="bg-surface rounded-lg p-3 mt-3">
                      <FaQuoteLeft className="text-secondary/30 text-sm mb-1" />
                      <p className="text-sm text-gray-600 italic">
                        {person.testimonial.substring(0, 150)}...
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <p className="text-lg">No alumni found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-10 sm:py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle title="What Our Alumni Say" subtitle="Testimonials from our proud graduates" light />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {alumni.filter(a => a.testimonial).map((person, index) => (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
              >
                <FaQuoteLeft className="text-secondary text-2xl mb-4" />
                <p className="text-gray-200 text-sm italic leading-relaxed mb-4">
                  "{person.testimonial}"
                </p>
                <div className="flex items-center gap-3 pt-3 border-t border-white/20">
                  <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-primary-dark font-bold">
                    {person.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{person.name}</p>
                    <p className="text-xs text-gray-300">{person.currentCompany} | {person.batchYear}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
