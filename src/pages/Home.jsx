import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaUsers, FaChalkboardTeacher, FaBriefcase, FaAward, FaTrophy, FaBookOpen, FaCalendarAlt, FaArrowRight, FaUserGraduate, FaHandshake } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import department from '../data/department.json';
import events from '../data/events.json';
import announcements from '../data/announcements.json';
import achievements from '../data/achievements.json';

function AnimatedCounter({ end, duration = 2, suffix = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
}

const secondaryStats = [
  { icon: FaBriefcase, label: 'Placement Rate', value: department.stats.placementRate, suffix: '%' },
  { icon: FaUserGraduate, label: 'Alumni Network', value: department.stats.totalAlumni, suffix: '+' },
  { icon: FaTrophy, label: 'Years of Excellence', value: department.stats.yearsOfExcellence, suffix: '' },
  { icon: FaBookOpen, label: 'Research Papers', value: department.stats.researchPapers, suffix: '+' },
  { icon: FaHandshake, label: 'Industry Partners', value: department.stats.industryPartners, suffix: '+' },
  { icon: FaAward, label: 'Ph.D. Holders', value: department.stats.phdHolders, suffix: '' },
];

const latestEvents = events.slice(0, 3);
const latestAchievements = achievements.slice(0, 3);
const activeAnnouncements = announcements.filter(a => a.isActive);

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-light to-accent text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 md:top-20 left-4 md:left-10 w-48 md:w-72 h-48 md:h-72 bg-secondary rounded-full blur-3xl" />
          <div className="absolute bottom-10 md:bottom-20 right-4 md:right-10 w-64 md:w-96 h-64 md:h-96 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24 lg:py-32 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block bg-secondary/20 text-secondary-light px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                🎓 PSR Engineering College (Autonomous) | NAAC 'A' Grade
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                Department of{' '}
                <span className="text-secondary">Information Technology</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-200 mb-6 sm:mb-8 leading-relaxed">
                {department.hodMessage.substring(0, 200)}...
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <Link
                  to="/about"
                  className="bg-secondary text-primary-dark px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-secondary-light transition-colors no-underline inline-flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  Explore Department <FaArrowRight />
                </Link>
                <Link
                  to="/contact"
                  className="border-2 border-white text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors no-underline text-sm sm:text-base text-center"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden md:block"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="text-center mb-6">
                  <div className="w-24 h-24 bg-secondary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <FaChalkboardTeacher className="text-secondary text-4xl" />
                  </div>
                  <h3 className="text-xl font-bold">{department.hodName}</h3>
                  <p className="text-gray-300 text-sm">Head of Department</p>
                </div>
                <p className="text-gray-200 text-sm italic text-center leading-relaxed">
                  "{department.hodMessage.substring(0, 150)}..."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Announcements Ticker */}
      {activeAnnouncements.length > 0 && (
        <section className="bg-secondary text-primary-dark py-2.5 sm:py-3 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 flex items-center gap-3 sm:gap-4">
            <span className="bg-primary text-white px-2.5 sm:px-3 py-1 rounded text-xs sm:text-sm font-bold whitespace-nowrap">📢 News</span>
            <div className="overflow-hidden flex-1">
              <div className="animate-marquee whitespace-nowrap">
                {activeAnnouncements.map((a, i) => (
                  <span key={a.id} className="mx-8 font-medium">
                    {a.title} — {a.content}
                    {i < activeAnnouncements.length - 1 && ' • '}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Department Strength Section */}
      <section className="py-10 sm:py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Primary Strength Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 sm:mb-12">
            {/* Total Student Strength */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-primary via-primary-light to-accent rounded-2xl p-8 text-white shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-10 translate-x-10" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-8 -translate-x-8" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <FaUsers className="text-3xl text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-200 uppercase tracking-wider font-medium">Total Student Strength</p>
                    <p className="text-xs text-gray-300">Currently Enrolled</p>
                  </div>
                </div>
                <div className="text-5xl md:text-6xl font-bold mb-3">
                  <AnimatedCounter end={department.stats.totalStudents} suffix="+" />
                </div>
                <div className="flex items-center gap-6 text-sm text-gray-200">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-secondary rounded-full" />
                    4 Active Batches
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full" />
                    2 Sections Each
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Total Faculty Strength */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full -translate-y-10 translate-x-10" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/5 rounded-full translate-y-8 -translate-x-8" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                    <FaChalkboardTeacher className="text-3xl text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 uppercase tracking-wider font-medium">Total Faculty Strength</p>
                    <p className="text-xs text-gray-400">Teaching & Research Staff</p>
                  </div>
                </div>
                <div className="text-5xl md:text-6xl font-bold text-primary mb-3">
                  <AnimatedCounter end={department.stats.totalFaculty} suffix="+" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-surface rounded-lg p-2 text-center">
                    <p className="text-lg font-bold text-primary">{department.stats.facultyBreakdown.professors}</p>
                    <p className="text-xs text-gray-500">Professors</p>
                  </div>
                  <div className="bg-surface rounded-lg p-2 text-center">
                    <p className="text-lg font-bold text-accent">{department.stats.facultyBreakdown.associateProfessors}</p>
                    <p className="text-xs text-gray-500">Associates</p>
                  </div>
                  <div className="bg-surface rounded-lg p-2 text-center">
                    <p className="text-lg font-bold text-secondary-dark">{department.stats.facultyBreakdown.assistantProfessors}</p>
                    <p className="text-xs text-gray-500">Assistants</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Secondary Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {secondaryStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-white rounded-xl p-5 text-center shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <stat.icon className="text-2xl text-accent mx-auto mb-2" />
                <div className="text-xl md:text-2xl font-bold text-primary mb-0.5">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-gray-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Quick Section */}
      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                About Our Department
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">{department.history}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-surface rounded-lg p-4">
                  <h4 className="font-bold text-primary text-lg">Vision</h4>
                  <p className="text-sm text-gray-600 mt-1">{department.vision.substring(0, 100)}...</p>
                </div>
                <div className="bg-surface rounded-lg p-4">
                  <h4 className="font-bold text-primary text-lg">Mission</h4>
                  <p className="text-sm text-gray-600 mt-1">{department.mission[0].substring(0, 100)}...</p>
                </div>
              </div>
              <Link
                to="/about"
                className="text-accent font-semibold hover:text-primary transition-colors no-underline inline-flex items-center gap-2"
              >
                Learn More <FaArrowRight />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {department.infrastructure.slice(0, 4).map((infra, i) => (
                <div key={i} className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100 hover:border-accent transition-colors">
                  <h4 className="font-bold text-primary mb-2">{infra.name}</h4>
                  <p className="text-sm text-gray-500">{infra.description.substring(0, 80)}...</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Latest Events */}
      <section className="py-10 sm:py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Latest Events</h2>
            <p className="text-gray-300">Stay updated with our department activities</p>
            <div className="w-20 h-1 bg-secondary mx-auto mt-4 rounded" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            {latestEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <FaCalendarAlt className="text-secondary" />
                  <span className="text-sm text-gray-300">
                    {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                  {event.isUpcoming && (
                    <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full ml-auto">Upcoming</span>
                  )}
                </div>
                <h3 className="text-lg font-bold mb-2">{event.title}</h3>
                <p className="text-sm text-gray-300 mb-3">{event.description.substring(0, 120)}...</p>
                <div className="flex flex-wrap gap-1">
                  {event.highlights.slice(0, 3).map((h, i) => (
                    <span key={i} className="bg-secondary/20 text-secondary-light text-xs px-2 py-1 rounded">
                      {h}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/events"
              className="border-2 border-secondary text-secondary px-6 py-3 rounded-lg font-semibold hover:bg-secondary hover:text-primary-dark transition-colors no-underline inline-flex items-center gap-2"
            >
              View All Events <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Achievements */}
      <section className="py-10 sm:py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-3">Recent Achievements</h2>
            <p className="text-gray-600">Our students and faculty making us proud</p>
            <div className="w-20 h-1 bg-secondary mx-auto mt-4 rounded" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            {latestAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow border-l-4 border-secondary"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-medium capitalize">
                    {achievement.category}
                  </span>
                  <span className="text-sm text-gray-400">{achievement.year}</span>
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{achievement.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                {achievement.studentNames.length > 0 && (
                  <p className="text-xs text-gray-400">
                    👤 {achievement.studentNames.join(', ')}
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/awards"
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-light transition-colors no-underline inline-flex items-center gap-2"
            >
              View All Awards <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 sm:py-16 bg-gradient-to-r from-accent to-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Ready to Join PSR's IT Family?</h2>
            <p className="text-lg text-gray-200 mb-8">
              Be a part of an NAAC 'A' Grade, NBA accredited department at PSR Engineering College. Admissions through TNEA counselling.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
              <Link
                to="/contact"
                className="bg-secondary text-primary-dark px-8 py-3 rounded-lg font-semibold hover:bg-secondary-light transition-colors no-underline"
              >
                Get in Touch
              </Link>
              <Link
                to="/placements"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors no-underline"
              >
                View Placements
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Marquee animation style */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
