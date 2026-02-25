import { motion } from 'framer-motion';
import { FaEye, FaBullseye, FaLaptopCode, FaNetworkWired, FaProjectDiagram, FaMicrophone, FaBook, FaRobot } from 'react-icons/fa';
import PageHero from '../components/PageHero';
import SectionTitle from '../components/SectionTitle';
import department from '../data/department.json';

const infraIcons = {
  computer: FaLaptopCode,
  network: FaNetworkWired,
  project: FaProjectDiagram,
  seminar: FaMicrophone,
  library: FaBook,
  ai: FaRobot,
};

export default function About() {
  return (
    <div>
      <PageHero
        title="About the Department"
        subtitle="Learn about our vision, mission, and the journey of the IT Department."
        breadcrumb="About"
      />

      {/* HOD Message */}
      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-1 text-center"
            >
              <div className="w-48 h-48 bg-surface rounded-2xl mx-auto mb-4 flex items-center justify-center overflow-hidden border-4 border-secondary">
                <img
                  src={department.hodPhoto}
                  alt={department.hodName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `<div class="flex items-center justify-center w-full h-full bg-primary/10 text-primary text-5xl font-bold">${department.hodName.charAt(0)}</div>`;
                  }}
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-primary">{department.hodName}</h3>
              <p className="text-gray-500">Professor & Head of Department</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-2"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">HOD's Message</h2>
              <div className="bg-surface rounded-xl p-4 sm:p-6 border-l-4 border-secondary">
                <p className="text-gray-600 leading-relaxed italic text-sm sm:text-base md:text-lg">
                  "{department.hodMessage}"
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-10 sm:py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl p-5 sm:p-8 shadow-md"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-accent/10 p-3 rounded-lg">
                  <FaEye className="text-accent text-xl sm:text-2xl" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-primary">Our Vision</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">{department.vision}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-xl p-5 sm:p-8 shadow-md"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-secondary/10 p-3 rounded-lg">
                  <FaBullseye className="text-secondary text-xl sm:text-2xl" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-primary">Our Mission</h3>
              </div>
              <ul className="space-y-3">
                {department.mission.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600">
                    <span className="bg-secondary text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle title="Our Journey" subtitle="The story of the IT Department" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-white rounded-xl p-5 sm:p-8 shadow-md border border-gray-100">
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-4">
                <div className="bg-primary text-white text-lg sm:text-xl font-bold px-3 sm:px-4 py-2 rounded-lg whitespace-nowrap">
                  Est. {department.established}
                </div>
                <div className="h-1 flex-1 bg-gradient-to-r from-primary to-secondary rounded hidden sm:block" />
                <div className="bg-secondary text-primary-dark text-lg sm:text-xl font-bold px-3 sm:px-4 py-2 rounded-lg whitespace-nowrap">
                  {new Date().getFullYear()}
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed text-sm sm:text-base md:text-lg">{department.history}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-10 sm:py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle title="Infrastructure & Labs" subtitle="State-of-the-art facilities for learning and research" light />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {department.infrastructure.map((infra, index) => {
              const Icon = infraIcons[infra.icon] || FaLaptopCode;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors"
                >
                  <Icon className="text-secondary text-3xl mb-4" />
                  <h3 className="text-xl font-bold mb-2">{infra.name}</h3>
                  <p className="text-gray-300 text-sm">{infra.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
