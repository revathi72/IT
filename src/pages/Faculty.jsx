import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope, FaPhone, FaBookOpen, FaTimes, FaChalkboardTeacher, FaUserTie, FaUserCheck } from 'react-icons/fa';
import PageHero from '../components/PageHero';
import SectionTitle from '../components/SectionTitle';
import faculty from '../data/faculty.json';
import department from '../data/department.json';

const categories = [
  { key: 'all', label: 'All Faculty' },
  { key: 'professor', label: 'Professors' },
  { key: 'associate', label: 'Associate Professors' },
  { key: 'assistant', label: 'Assistant Professors' },
];

export default function Faculty() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedFaculty, setSelectedFaculty] = useState(null);

  const filtered = activeCategory === 'all'
    ? faculty
    : faculty.filter(f => f.category === activeCategory);

  const facultyStats = department.stats.facultyBreakdown;
  const totalPublications = faculty.reduce((sum, f) => sum + f.publications, 0);

  return (
    <div>
      <PageHero
        title="Our Faculty"
        subtitle="Meet our experienced and dedicated faculty members"
        breadcrumb="Faculty"
      />

      {/* Faculty Strength Banner */}
      <section className="py-8 sm:py-12 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary to-primary-light rounded-xl p-4 sm:p-6 text-white text-center shadow-lg col-span-2 sm:col-span-1"
            >
              <FaChalkboardTeacher className="text-2xl text-secondary mx-auto mb-2" />
              <p className="text-3xl font-bold">{department.stats.totalFaculty}</p>
              <p className="text-xs text-gray-200 mt-1 font-medium">Total Faculty</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="bg-white rounded-xl p-6 text-center shadow-md border border-gray-100"
            >
              <FaUserTie className="text-xl text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-primary">{facultyStats.professors}</p>
              <p className="text-xs text-gray-500 mt-1 font-medium">Professors</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 text-center shadow-md border border-gray-100"
            >
              <FaUserCheck className="text-xl text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold text-accent">{facultyStats.associateProfessors}</p>
              <p className="text-xs text-gray-500 mt-1 font-medium">Associates</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-xl p-6 text-center shadow-md border border-gray-100"
            >
              <FaChalkboardTeacher className="text-xl text-secondary-dark mx-auto mb-2" />
              <p className="text-2xl font-bold text-secondary-dark">{facultyStats.assistantProfessors}</p>
              <p className="text-xs text-gray-500 mt-1 font-medium">Assistants</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 text-center shadow-md border border-gray-100"
            >
              <FaBookOpen className="text-xl text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">{totalPublications}</p>
              <p className="text-xs text-gray-500 mt-1 font-medium">Publications</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2 rounded-full font-medium text-sm transition-colors cursor-pointer border-none ${
                  activeCategory === cat.key
                    ? 'bg-primary text-white'
                    : 'bg-surface text-gray-600 hover:bg-surface-dark'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Faculty Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <AnimatePresence mode="wait">
              {filtered.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => setSelectedFaculty(member)}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer group overflow-hidden border border-gray-100 flex flex-col"
                >
                  {/* Photo */}
                  <div className="h-52 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center overflow-hidden">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `<div class="flex items-center justify-center w-full h-full text-6xl font-bold text-primary/30">${member.name.charAt(0)}</div>`;
                      }}
                    />
                  </div>

                  {/* Info */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-primary mb-1 leading-tight">{member.name}</h3>
                    <p className="text-sm text-accent font-medium mb-1">{member.designation}</p>
                    <p className="text-xs text-gray-500 mb-3 flex-1">{member.specialization}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100">
                      <span>{member.publications} Publications</span>
                      <span>{member.experience}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Faculty Detail Modal */}
      <AnimatePresence>
        {selectedFaculty && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedFaculty(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="bg-gradient-to-r from-primary to-primary-light text-white p-6 rounded-t-2xl relative">
                <button
                  onClick={() => setSelectedFaculty(null)}
                  className="absolute top-4 right-4 text-white/70 hover:text-white bg-transparent border-none cursor-pointer text-xl"
                >
                  <FaTimes />
                </button>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center overflow-hidden shrink-0">
                    <img
                      src={selectedFaculty.photo}
                      alt={selectedFaculty.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = `<div class="flex items-center justify-center w-full h-full text-3xl font-bold text-white">${selectedFaculty.name.charAt(0)}</div>`;
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{selectedFaculty.name}</h3>
                    <p className="text-secondary">{selectedFaculty.designation}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h4 className="font-semibold text-primary mb-1">Qualification</h4>
                  <p className="text-gray-600 text-sm">{selectedFaculty.qualification}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">Specialization</h4>
                  <p className="text-gray-600 text-sm">{selectedFaculty.specialization}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-1">Experience</h4>
                  <p className="text-gray-600 text-sm">{selectedFaculty.experience}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-primary mb-2">Research Interests</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedFaculty.researchInterests.map((interest, i) => (
                      <span key={i} className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-4 pt-2 border-t">
                  <a href={`mailto:${selectedFaculty.email}`} className="flex items-center gap-2 text-sm text-accent hover:text-primary no-underline">
                    <FaEnvelope /> {selectedFaculty.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FaBookOpen className="text-accent" />
                  <span>{selectedFaculty.publications} Publications</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
