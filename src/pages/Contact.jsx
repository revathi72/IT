import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, FaLinkedin, FaInstagram, FaTwitter, FaYoutube, FaPaperPlane, FaFax, FaClock, FaBuilding } from 'react-icons/fa';
import PageHero from '../components/PageHero';
import SectionTitle from '../components/SectionTitle';
import department from '../data/department.json';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send to an API or service like Formspree
    console.log('Form submitted:', form);
    setSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div>
      <PageHero
        title="Contact Us"
        subtitle="Get in touch with the Department of Information Technology."
        breadcrumb="Contact"
      />

      <section className="py-10 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h3 className="text-xl sm:text-2xl font-bold text-primary mb-4 sm:mb-6">Get In Touch</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <FaMapMarkerAlt className="text-primary text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Address</h4>
                    <p className="text-sm text-gray-600">{department.contact.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <FaPhone className="text-primary text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Phone (College)</h4>
                    <p className="text-sm text-gray-600">{department.contact.phone}</p>
                    <h4 className="font-semibold text-primary mt-2">Trust Office</h4>
                    <p className="text-sm text-gray-600">{department.contact.trustPhone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <FaEnvelope className="text-primary text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">General Email</h4>
                    <p className="text-sm text-gray-600">{department.contact.email}</p>
                    <h4 className="font-semibold text-primary mt-2">Exam Cell / Verification</h4>
                    <p className="text-sm text-gray-600">{department.contact.examCell}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <FaFax className="text-primary text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Fax (College)</h4>
                    <p className="text-sm text-gray-600">{department.contact.fax}</p>
                    <h4 className="font-semibold text-primary mt-2">Fax (Trust)</h4>
                    <p className="text-sm text-gray-600">{department.contact.trustFax}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <FaClock className="text-primary text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Operating Hours</h4>
                    <p className="text-sm text-gray-600">{department.contact.hours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <FaGlobe className="text-primary text-xl" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Website</h4>
                    <a href={department.contact.website} target="_blank" rel="noreferrer" className="text-sm text-accent hover:underline">{department.contact.website}</a>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8">
                <h4 className="font-semibold text-primary mb-3">Follow Us</h4>
                <div className="flex gap-3">
                  <a href={department.socialMedia.linkedin} target="_blank" rel="noreferrer" className="bg-primary/10 text-primary p-3 rounded-lg hover:bg-primary hover:text-white transition-colors">
                    <FaLinkedin size={20} />
                  </a>
                  <a href={department.socialMedia.instagram} target="_blank" rel="noreferrer" className="bg-primary/10 text-primary p-3 rounded-lg hover:bg-primary hover:text-white transition-colors">
                    <FaInstagram size={20} />
                  </a>
                  <a href={department.socialMedia.twitter} target="_blank" rel="noreferrer" className="bg-primary/10 text-primary p-3 rounded-lg hover:bg-primary hover:text-white transition-colors">
                    <FaTwitter size={20} />
                  </a>
                  <a href={department.socialMedia.youtube} target="_blank" rel="noreferrer" className="bg-primary/10 text-primary p-3 rounded-lg hover:bg-primary hover:text-white transition-colors">
                    <FaYoutube size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-5 sm:p-8 shadow-md border border-gray-100"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-primary mb-4 sm:mb-6">Send Us a Message</h3>

                {submitted && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                    ✅ Thank you! Your message has been sent successfully. We'll get back to you soon.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input
                      type="text"
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      placeholder="What is this regarding?"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Write your message here..."
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-light transition-colors cursor-pointer border-none inline-flex items-center gap-2"
                  >
                    <FaPaperPlane /> Send Message
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="rounded-xl overflow-hidden shadow-md h-60 sm:h-80">
            <iframe
              src={department.contact.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Department Location"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
