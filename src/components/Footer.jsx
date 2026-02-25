import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';
import department from '../data/department.json';

const quickLinks = [
  { name: 'About', path: '/about' },
  { name: 'Faculty', path: '/faculty' },
  { name: 'Students', path: '/students' },
  { name: 'Events', path: '/events' },
  { name: 'Placements', path: '/placements' },
  { name: 'Alumni', path: '/alumni' },
];

const resourceLinks = [
  { name: 'Library', path: '/library' },
  { name: 'Research', path: '/research' },
  { name: 'Awards', path: '/awards' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Contact', path: '/contact' },
];

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* About */}
          <div>
            <h3 className="text-secondary text-lg font-bold mb-4">IT Department</h3>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              {department.college} — Department of Information Technology. Committed to excellence in education, research, and innovation since {department.established}.
            </p>
            <div className="flex gap-3">
              <a href={department.socialMedia.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-secondary transition-colors"><FaLinkedin size={20} /></a>
              <a href={department.socialMedia.instagram} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-secondary transition-colors"><FaInstagram size={20} /></a>
              <a href={department.socialMedia.twitter} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-secondary transition-colors"><FaTwitter size={20} /></a>
              <a href={department.socialMedia.youtube} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-secondary transition-colors"><FaYoutube size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-secondary text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-gray-300 hover:text-secondary transition-colors no-underline">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-secondary text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-gray-300 hover:text-secondary transition-colors no-underline">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-secondary text-lg font-bold mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-secondary mt-1 shrink-0" />
                <span>{department.contact.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaPhone className="text-secondary shrink-0" />
                <span>{department.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-secondary shrink-0" />
                <span>{department.contact.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaGlobe className="text-secondary shrink-0" />
                <a href={department.contact.website} target="_blank" rel="noreferrer" className="hover:text-secondary transition-colors">{department.contact.website}</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex flex-col md:flex-row justify-between items-center text-xs sm:text-sm text-gray-400 gap-2">
          <span className="text-center">© {new Date().getFullYear()} Department of IT. All rights reserved.</span>
          <span>Designed with ❤️ for IT Department</span>
        </div>
      </div>
    </footer>
  );
}
