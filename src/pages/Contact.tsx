import React, { useState } from 'react';
import { 
  FaEnvelope, 
  FaPhone, 
  FaFacebook, 
  FaInstagram, 
  FaPaperPlane, 
  FaTiktok
} from 'react-icons/fa6';
import { HiSparkles } from 'react-icons/hi2';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Tournament Support',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      // Send form data to Web3Forms API
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          // Free Web3Forms Access Key linked to neparena1@gmail.com
          access_key: '7c49e000-7138-47c9-bd88-1dbbb8bcd94e', 
          name: formData.name,
          email: formData.email,
          subject: `[NepArena Contact] ${formData.subject}`,
          message: formData.message,
          to_email: 'neparena1@gmail.com',
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: 'Tournament Support', message: '' });
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      } else {
        setErrorMessage(result.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-[#E50914] selection:text-white pb-20">
      
      {/* 1. HERO HEADER */}
      <section className="relative py-16 flex items-center justify-center overflow-hidden border-b border-white/10">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15 filter grayscale"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1920')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-flex items-center gap-2 bg-[#E50914]/10 border border-[#E50914]/30 px-4 py-1.5 rounded-full mb-4">
            <HiSparkles size={16} className="text-[#E50914]" />
            <span className="text-xs font-bold tracking-widest text-[#E50914] uppercase">GET IN TOUCH</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white uppercase mb-3">
            Contact <span className="text-[#E50914]">NepArena</span>
          </h1>

          <p className="max-w-xl mx-auto text-gray-400 text-sm">
            Have questions about upcoming tournaments, team registration, or partnerships? Reach out to our team.
          </p>
        </div>
      </section>

      {/* 2. MAIN CONTENT GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* CONTACT INFORMATION CARDS */}
          <div className="space-y-4">
            
            <div className="bg-[#0D0D0D] border border-white/10 p-6 rounded-xl">
              <div className="w-12 h-12 bg-[#E50914]/10 border border-[#E50914]/30 rounded-lg flex items-center justify-center text-[#E50914] mb-4">
                <FaEnvelope size={20} />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Email Us</h3>
              <p className="text-xs text-gray-400 mb-3">Direct support for players & organizers.</p>
              <a href="mailto:neparena1@gmail.com" className="text-sm font-semibold text-[#E50914] hover:underline">
                neparena1@gmail.com
              </a>
            </div>

            <div className="bg-[#0D0D0D] border border-white/10 p-6 rounded-xl">
              <div className="w-12 h-12 bg-[#E50914]/10 border border-[#E50914]/30 rounded-lg flex items-center justify-center text-[#E50914] mb-4">
                <FaPhone size={20} />
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Call / WhatsApp</h3>
              <p className="text-sm font-semibold text-gray-200">+977 9810402146</p>
            </div>

            {/* COMMUNITY SOCIALS */}
            <div className="bg-[#0D0D0D] border border-white/10 p-6 rounded-xl">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Join Our Community</h3>
              <div className="flex items-center gap-3">
                <a href="https://www.tiktok.com/@neparena" target="_blank" rel="noreferrer" className="flex-1 bg-[#050505] border border-white/10 hover:border-[#5865F2] hover:text-[#5865F2] py-3 rounded-lg flex items-center justify-center transition">
                  <FaTiktok size={18} />
                </a>
                <a href="https://www.facebook.com/neparena61" target="_blank" rel="noreferrer" className="flex-1 bg-[#050505] border border-white/10 hover:border-[#1877F2] hover:text-[#1877F2] py-3 rounded-lg flex items-center justify-center transition">
                  <FaFacebook size={18} />
                </a>
                <a href="https://www.instagram.com/neparena/" target="_blank" rel="noreferrer" className="flex-1 bg-[#050505] border border-white/10 hover:border-[#E4405F] hover:text-[#E4405F] py-3 rounded-lg flex items-center justify-center transition">
                  <FaInstagram size={18} />
                </a>
              </div>
            </div>

          </div>

          {/* CONTACT FORM */}
          <div className="lg:col-span-2 bg-[#0D0D0D] border border-white/10 p-8 rounded-xl">
            <h2 className="text-2xl font-black text-white uppercase mb-2">Send Us a Message</h2>
            <p className="text-gray-400 text-xs mb-6">Fill out the form below and our team will get back to you within 24 hours.</p>

            {submitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-xl text-center py-12">
                <FaPaperPlane className="text-emerald-500 text-3xl mx-auto mb-3 animate-bounce" />
                <h3 className="text-lg font-bold text-white">Message Sent Successfully!</h3>
                <p className="text-xs text-gray-400 mt-1">Thank you for reaching out. We have received your query at neparena1@gmail.com.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Your Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sugam Shrestha"
                      className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E50914] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E50914] transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Subject</label>
                  <select 
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#050505] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E50914] transition"
                  >
                    <option value="Tournament Support">Tournament Support</option>
                    <option value="Team / Roster Query">Team / Roster Query</option>
                    <option value="Host a Tournament">Host a Tournament (Organizer)</option>
                    <option value="Sponsorship & Partnership">Sponsorship & Partnership</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Message</label>
                  <textarea 
                    name="message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your request or problem in detail..."
                    className="w-full bg-[#050505] border border-white/10 rounded-lg p-4 text-sm text-white focus:outline-none focus:border-[#E50914] transition resize-none"
                  />
                </div>

                {errorMessage && (
                  <p className="text-xs font-semibold text-red-500 bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-center">
                    {errorMessage}
                  </p>
                )}

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#E50914] hover:bg-[#b80710] text-white font-bold py-3.5 rounded-lg text-sm tracking-wider uppercase transition flex items-center justify-center gap-2 shadow-lg shadow-[#E50914]/20 disabled:opacity-50"
                >
                  <FaPaperPlane size={14} /> {loading ? 'Sending Email...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}