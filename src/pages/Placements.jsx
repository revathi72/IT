import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { FaArrowUp, FaBriefcase, FaChartLine, FaBuilding } from 'react-icons/fa';
import PageHero from '../components/PageHero';
import SectionTitle from '../components/SectionTitle';
import placements from '../data/placements.json';

const chartData = placements.yearWiseData.map(d => ({
  year: d.year.split('-')[0],
  Placed: d.placed,
  Total: d.totalStudents,
  'Higher Studies': d.higherStudies,
})).reverse();

const packageData = placements.yearWiseData.map(d => ({
  year: d.year.split('-')[0],
  Highest: parseFloat(d.highestPackage),
  Average: parseFloat(d.averagePackage),
  Median: parseFloat(d.medianPackage),
})).reverse();

const latest = placements.yearWiseData[0];

export default function Placements() {
  return (
    <div>
      <PageHero
        title="Placements"
        subtitle="Our students are placed in top companies across the globe."
        breadcrumb="Placements"
      />

      {/* Quick Stats */}
      <section className="py-8 sm:py-12 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {[
              { icon: FaBriefcase, label: 'Students Placed', value: latest.placed, color: 'text-green-600' },
              { icon: FaArrowUp, label: 'Highest Package', value: latest.highestPackage, color: 'text-accent' },
              { icon: FaChartLine, label: 'Average Package', value: latest.averagePackage, color: 'text-secondary' },
              { icon: FaBuilding, label: 'Recruiters', value: `${placements.topRecruiters.length}+`, color: 'text-primary' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-md text-center"
              >
                <stat.icon className={`text-3xl ${stat.color} mx-auto mb-2`} />
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
                <div className="text-xs text-gray-400 mt-1">{latest.year}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Charts */}
      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle title="Placement Trends" subtitle="Year-wise placement statistics" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Placement Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h3 className="text-lg font-bold text-primary mb-4 text-center">Students Placed vs Total</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Total" fill="#cbd5e0" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Placed" fill="#1e3a5f" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Higher Studies" fill="#e2a829" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Package Trend */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <h3 className="text-lg font-bold text-primary mb-4 text-center">Package Trends (LPA)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={packageData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Highest" stroke="#e2a829" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="Average" stroke="#1e3a5f" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="Median" stroke="#3182ce" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Year-wise Data Table */}
      <section className="py-10 sm:py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full bg-white rounded-xl shadow-md overflow-hidden min-w-[600px]">
              <thead>
                <tr className="bg-primary text-white">
                  <th className="px-4 py-3 text-left text-sm">Year</th>
                  <th className="px-4 py-3 text-center text-sm">Total</th>
                  <th className="px-4 py-3 text-center text-sm">Placed</th>
                  <th className="px-4 py-3 text-center text-sm">Higher Studies</th>
                  <th className="px-4 py-3 text-center text-sm">Highest Pkg</th>
                  <th className="px-4 py-3 text-center text-sm">Avg Pkg</th>
                  <th className="px-4 py-3 text-center text-sm">Median Pkg</th>
                </tr>
              </thead>
              <tbody>
                {placements.yearWiseData.map((row, i) => (
                  <tr key={row.year} className={`${i % 2 === 0 ? 'bg-white' : 'bg-surface'} hover:bg-accent/5 transition-colors`}>
                    <td className="px-4 py-3 font-medium text-primary text-sm">{row.year}</td>
                    <td className="px-4 py-3 text-center text-sm">{row.totalStudents}</td>
                    <td className="px-4 py-3 text-center text-sm font-semibold text-green-600">{row.placed}</td>
                    <td className="px-4 py-3 text-center text-sm">{row.higherStudies}</td>
                    <td className="px-4 py-3 text-center text-sm font-semibold text-secondary">{row.highestPackage}</td>
                    <td className="px-4 py-3 text-center text-sm">{row.averagePackage}</td>
                    <td className="px-4 py-3 text-center text-sm">{row.medianPackage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Top Recruiters */}
      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle title="Our Top Recruiters" subtitle="Leading companies that recruit from our department" />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-6">
            {placements.topRecruiters.map((recruiter, index) => (
              <motion.div
                key={recruiter.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col items-center justify-center hover:shadow-md transition-shadow aspect-square"
              >
                <img
                  src={recruiter.logo}
                  alt={recruiter.name}
                  className="w-16 h-16 object-contain mb-2"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <span className="text-sm font-semibold text-primary text-center">{recruiter.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
