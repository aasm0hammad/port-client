import { useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaPaperPlane } from 'react-icons/fa';
import { sendMessage } from '../../api/api';

const ContactSection = ({ socialLinks }) => {
  const [form, setForm] = useState({ sender_name: '', sender_email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.sender_name || !form.sender_email || !form.message) return;
    setSending(true);
    try {
      await sendMessage(form);
      setSent(true);
      setForm({ sender_name: '', sender_email: '', message: '' });
      setTimeout(() => setSent(false), 3000);
    } catch (err) {
      console.error('Failed to send message:', err);
    }
    setSending(false);
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-20" id="contact">
      <div className="bg-bg-secondary card-border rounded-3xl p-8 md:p-12">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-1/3">
            <h3 className="text-4xl font-bold mb-6">Get In Touch</h3>
            <p className="text-text-secondary mb-8 leading-relaxed">Have a project in mind? Let's work together and build something amazing!</p>
            <div className="space-y-4">
              {socialLinks?.map((link) => (
                <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="w-full bg-bg-primary border border-border hover:border-[#A855F7] p-3 rounded-xl flex items-center gap-3 transition-all">
                  {link.platform?.toLowerCase() === 'github' && <FaGithub className="w-5 h-5 text-text-secondary" />}
                  {link.platform?.toLowerCase() === 'linkedin' && <FaLinkedin className="w-5 h-5 text-text-secondary" />}
                  {link.platform?.toLowerCase() === 'email' && <FaEnvelope className="w-5 h-5 text-text-secondary" />}
                  {!['github','linkedin','email'].includes(link.platform?.toLowerCase()) && <FaEnvelope className="w-5 h-5 text-text-secondary" />}
                  <span className="text-sm font-medium">{link.platform}</span>
                </a>
              ))}
              {(!socialLinks || socialLinks.length === 0) && (
                <>
                  <button className="w-full bg-bg-primary border border-border hover:border-[#A855F7] p-3 rounded-xl flex items-center gap-3 transition-all"><FaGithub className="w-5 h-5 text-text-secondary" /><span className="text-sm font-medium">Github</span></button>
                  <button className="w-full bg-bg-primary border border-border hover:border-[#A855F7] p-3 rounded-xl flex items-center gap-3 transition-all"><FaLinkedin className="w-5 h-5 text-text-secondary" /><span className="text-sm font-medium">LinkedIn</span></button>
                  <button className="w-full bg-bg-primary border border-border hover:border-[#A855F7] p-3 rounded-xl flex items-center gap-3 transition-all"><FaEnvelope className="w-5 h-5 text-text-secondary" /><span className="text-sm font-medium">Email</span></button>
                </>
              )}
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input value={form.sender_name} onChange={(e) => setForm({...form, sender_name: e.target.value})} className="w-full bg-bg-primary border border-border focus:border-[#A855F7] focus:ring-1 focus:ring-[#A855F7] rounded-xl p-4 text-text-primary placeholder-gray-500 outline-none transition-all" placeholder="Your Name" type="text" required />
                <input value={form.sender_email} onChange={(e) => setForm({...form, sender_email: e.target.value})} className="w-full bg-bg-primary border border-border focus:border-[#A855F7] focus:ring-1 focus:ring-[#A855F7] rounded-xl p-4 text-text-primary placeholder-gray-500 outline-none transition-all" placeholder="Your Email" type="email" required />
              </div>
              <textarea value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} className="w-full bg-bg-primary border border-border focus:border-[#A855F7] focus:ring-1 focus:ring-[#A855F7] rounded-xl p-4 text-text-primary placeholder-gray-500 outline-none transition-all" placeholder="Your Message" rows="6" required></textarea>
              <div className="flex justify-end">
                <button disabled={sending} className="bg-[#A855F7] hover:bg-[#7e22ce] disabled:opacity-50 text-text-primary px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all cursor-pointer" type="submit">
                  <FaPaperPlane className="w-5 h-5" />
                  {sent ? 'Sent!' : sending ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
