import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line, AreaChart, Area } from 'recharts';
import { FaUsers, FaUserGraduate, FaChartLine, FaProjectDiagram } from 'react-icons/fa';
import PageHero from '../components/PageHero';
import SectionTitle from '../components/SectionTitle';
import students from '../data/students.json';
import department from '../data/department.json';

const COLORS = ['#1e3a5f', '#3182ce', '#e2a829', '#48bb78', '#e53e3e', '#805ad5', '#dd6b20'];

export default function Students() {
  const currentBatches = students.batches.filter(b => b.status === 'current');
  const graduatedBatches = students.batches.filter(b => b.status === 'graduated');
  const totalCurrentStrength = currentBatches.reduce((sum, b) => sum + b.totalStudents, 0);
  const totalGraduated = graduatedBatches.reduce((sum, b) => sum + b.totalStudents, 0);

  const barData = students.yearWiseStats.map(s => ({
    year: s.year.split('-')[0],
    batch: s.year,
    Male: s.male,
    Female: s.female,
    Total: s.total,
  }));

  const trendData = students.yearWiseStats.map(s => ({
    year: s.year.split('-')[0],
    batch: s.year,
    Total: s.total,
    Male: s.male,
    Female: s.female,
  }));

  const genderRatio = students.yearWiseStats.reduce(
    (acc, s) => ({ male: acc.male + s.male, female: acc.female + s.female }),
    { male: 0, female: 0 }
  );
  const pieData = [
    { name: 'Male', value: genderRatio.male },
    { name: 'Female', value: genderRatio.female },
  ];

  return (
    <div>
      <PageHero
        title="Our Students"
        subtitle="Meet the bright minds of the IT Department"
        breadcrumb="Students"
      />

      {/* Total Strength Banner */}
      <section className="py-8 sm:py-12 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary to-primary-light rounded-xl p-6 text-white text-center shadow-lg"
            >
              <FaUsers className="text-3xl text-secondary mx-auto mb-2" />
              <p className="text-3xl md:text-4xl font-bold">{totalCurrentStrength}</p>
              <p className="text-sm text-gray-200 mt-1 font-medium">Current Students</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100"
            >
              <FaUserGraduate className="text-3xl text-primary mx-auto mb-2" />
              <p className="text-3xl md:text-4xl font-bold text-primary">{totalGraduated}</p>
              <p className="text-sm text-gray-500 mt-1 font-medium">Recent Graduates</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100"
            >
              <FaChartLine className="text-3xl text-accent mx-auto mb-2" />
              <p className="text-3xl md:text-4xl font-bold text-accent">{currentBatches.length}</p>
              <p className="text-sm text-gray-500 mt-1 font-medium">Active Batches</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-100"
            >
              <FaProjectDiagram className="text-3xl text-secondary-dark mx-auto mb-2" />
              <p className="text-3xl md:text-4xl font-bold text-secondary-dark">{students.projects.length}</p>
              <p className="text-sm text-gray-500 mt-1 font-medium">Active Projects</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Year-wise Stats — 3+ Years */}
      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {/* Bar Chart — Gender Distribution */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-md lg:col-span-2"
            >
              <h3 className="text-base sm:text-lg font-bold text-primary mb-1">Gender Distribution by Batch</h3>
              <p className="text-xs text-gray-400 mb-4">All batches from 2019 to present</p>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={barData} barGap={2}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                    formatter={(value, name) => [value, name]}
                    labelFormatter={(label) => `Batch: ${barData.find(d => d.year === label)?.batch || label}`}
                  />
                  <Legend wrapperStyle={{ fontSize: '13px' }} />
                  <Bar dataKey="Male" fill="#1e3a5f" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Female" fill="#e2a829" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Pie Chart — Overall Gender Ratio */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h3 className="text-lg font-bold text-primary mb-1">Overall Gender Ratio</h3>
              <p className="text-xs text-gray-400 mb-4">Across all 7 batches</p>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={90} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {pieData.map((_, index) => (
                      <Cell key={index} fill={index === 0 ? '#1e3a5f' : '#e2a829'} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6 mt-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-3 h-3 bg-primary rounded-sm" />
                  Male ({genderRatio.male})
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-3 h-3 bg-secondary rounded-sm" />
                  Female ({genderRatio.female})
                </div>
              </div>
            </motion.div>
          </div>

          {/* Enrollment Trend Line Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-4 sm:p-6 shadow-md mb-8 sm:mb-12"
          >
            <h3 className="text-lg font-bold text-primary mb-1">Enrollment Trend</h3>
            <p className="text-xs text-gray-400 mb-4">Student intake across all batches</p>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3182ce" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3182ce" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} domain={[100, 130]} />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  labelFormatter={(label) => `Batch: ${trendData.find(d => d.year === label)?.batch || label}`}
                />
                <Area type="monotone" dataKey="Total" stroke="#3182ce" fill="url(#colorTotal)" strokeWidth={2} dot={{ r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Batch Cards — Current + Graduated */}
          <h3 className="text-lg sm:text-xl font-bold text-primary mb-4 sm:mb-6">Current Batches</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10">
            {currentBatches.map((batch, index) => (
              <motion.div
                key={batch.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md border-l-4 border-accent text-center hover:shadow-lg transition-shadow"
              >
                <div className="bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                  Active
                </div>
                <h4 className="text-xl font-bold text-primary mb-2">{batch.year}</h4>
                <p className="text-3xl font-bold text-accent mb-1">{batch.totalStudents}</p>
                <p className="text-sm text-gray-500">Students</p>
                <p className="text-xs text-gray-400 mt-2">Sections: {batch.sections.join(', ')}</p>
              </motion.div>
            ))}
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-primary mb-4 sm:mb-6">Graduated Batches</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {graduatedBatches.map((batch, index) => (
              <motion.div
                key={batch.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-200 text-center hover:shadow-md transition-shadow"
              >
                <div className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                  Graduated
                </div>
                <h4 className="text-lg font-bold text-gray-700 mb-2">{batch.year}</h4>
                <p className="text-2xl font-bold text-gray-600 mb-1">{batch.totalStudents}</p>
                <p className="text-sm text-gray-500">Students</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Council */}
      <section className="py-10 sm:py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {students.studentCouncil.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-5 shadow-md text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full mx-auto mb-3 flex items-center justify-center overflow-hidden">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `<div class="flex items-center justify-center w-full h-full text-2xl font-bold text-primary/30">${member.name.charAt(0)}</div>`;
                    }}
                  />
                </div>
                <h4 className="font-bold text-primary text-sm">{member.name}</h4>
                <p className="text-xs text-accent font-medium">{member.role}</p>
                <p className="text-xs text-gray-400 mt-1">{member.batch}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Projects */}
      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle title="Student Projects" subtitle="Innovative projects built by our students" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {students.projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:border-accent transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-medium">
                    {project.batch}
                  </span>
                  <span className="text-sm text-gray-400">{project.team}</span>
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{project.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, i) => (
                    <span key={i} className="bg-accent/10 text-accent text-xs px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
