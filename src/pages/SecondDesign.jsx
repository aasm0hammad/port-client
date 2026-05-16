import React, { useState, useEffect } from 'react';
import { getProfile, getSkills, getProjects, getSocialLinks, sendMessage } from '../api/api';
import './SecondDesign.css';

const SecondDesign = () => {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);

  const [formData, setFormData] = useState({ sender_name: '', sender_email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', msg: '' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [profileRes, skillsRes, projectsRes, socialRes] = await Promise.allSettled([
        getProfile(),
        getSkills(),
        getProjects(),
        getSocialLinks(),
      ]);
      if (profileRes.status === 'fulfilled') setProfile(profileRes.value.data);
      if (skillsRes.status === 'fulfilled') setSkills(skillsRes.value.data);
      if (projectsRes.status === 'fulfilled') setProjects(projectsRes.value.data);
      if (socialRes.status === 'fulfilled') setSocialLinks(socialRes.value.data);
    } catch (err) {
      console.log('Using default data - API not connected:', err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.sender_name || !formData.sender_email || !formData.message) {
      setStatus({ type: 'error', msg: 'Please fill all fields.' });
      return;
    }
    setLoading(true);
    try {
      await sendMessage(formData);
      setStatus({ type: 'success', msg: 'Message sent successfully!' });
      setFormData({ sender_name: '', sender_email: '', message: '' });
      setTimeout(() => setStatus({ type: '', msg: '' }), 3000);
    } catch (err) {
      setStatus({ type: 'error', msg: 'Failed to send message. Try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="second-design-wrapper">
      {/* NAVBAR */}
      <nav className="second-nav">
        <div className="container nav-wrapper">
          <div className="logo">{profile?.name ? profile.name.split(' ')[0] + '.' : 'AM.'}</div>
          <div className="menu">
            <a href="#">Home</a>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
          <a href="#contact" className="nav-btn">Let's Talk</a>
        </div>
      </nav>

      {/* HERO */}
      <div className="container">
        <section className="hero">
          <div className="hero-text">
            <h4>{profile?.title || 'Flutter • Firebase • BLoC'}</h4>
            <h1>
              Creative <span>Developer</span><br />
              Portfolio
            </h1>
            <p>
              {profile?.about || 'I build premium mobile applications and beautiful digital experiences using scalable architecture.'}
            </p>
            <div className="hero-buttons">
              {profile?.resume_url ? (
                <a href={profile.resume_url} target="_blank" rel="noreferrer" className="primary-btn">Download CV</a>
              ) : (
                <a href="#" className="primary-btn">Download CV</a>
              )}
              <a href="#projects" className="secondary-btn">View Projects</a>
            </div>
          </div>
          <div className="hero-image">
            <div className="glass-card">
              <img 
                src={profile?.avatarUrl || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop"} 
                alt={profile?.name || "Hero"} 
              />
            </div>
            <div className="floating-box box1">
              🔥 Flutter Expert
            </div>
            <div className="floating-box box2">
              ⚡ Firebase + BLoC
            </div>
          </div>
        </section>
      </div>

      {/* ABOUT */}
      <section id="about">
        <div className="container">
          <h2 className="section-title">
            About <span>Me</span>
          </h2>
          <div className="about-grid">
            <div className="about-image">
              <div className="glass-card" style={{ height: 'auto', width: '100%', maxWidth: '400px', margin: '0 auto' }}>
                <img 
                  src={profile?.about_image_url || profile?.avatarUrl || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop"} 
                  alt="About" 
                  style={{ width: '100%', height: '400px', objectFit: 'cover' }}
                />
              </div>
            </div>
            <div className="about-content">
              <p style={{ fontSize: '18px', lineHeight: '1.8', color: '#cbd5e1', marginBottom: '30px' }}>
                {profile?.bio || profile?.about || 'I am a passionate Developer with experience in building cross-platform applications. I love turning ideas into real products with clean code and beautiful UI.'}
              </p>
              
              <div className="about-info-grid">
                <div className="info-box">
                  <p style={{ color: '#00e5ff', fontSize: '14px', marginBottom: '5px' }}>Name</p>
                  <h4 style={{ fontSize: '18px' }}>{profile?.name || 'Aas Mohammad'}</h4>
                </div>
                <div className="info-box">
                  <p style={{ color: '#00e5ff', fontSize: '14px', marginBottom: '5px' }}>Experience</p>
                  <h4 style={{ fontSize: '18px' }}>{profile?.experience || '1+ Years'}</h4>
                </div>
                <div className="info-box">
                  <p style={{ color: '#00e5ff', fontSize: '14px', marginBottom: '5px' }}>Location</p>
                  <h4 style={{ fontSize: '18px' }}>{profile?.location || 'India'}</h4>
                </div>
                <div className="info-box">
                  <p style={{ color: '#00e5ff', fontSize: '14px', marginBottom: '5px' }}>Email</p>
                  <h4 style={{ fontSize: '18px', wordBreak: 'break-all' }}>{profile?.email || 'aas@gmail.com'}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div className="container">
          <h2 className="section-title">
            My <span>Skills</span>
          </h2>
          <div className="skills-grid">
            {skills.length > 0 ? skills.map((skill) => (
              <div key={skill.id || skill._id} className="skill-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                  {skill.icon_url && <img src={skill.icon_url} alt={skill.name} style={{ width: '40px', height: '40px' }} />}
                  <h3 style={{ marginBottom: 0 }}>{skill.name}</h3>
                </div>
                <p>Proficiency: {skill.level || skill.percentage}%</p>
              </div>
            )) : (
              <>
                <div className="skill-card">
                  <h3>Flutter</h3>
                  <p>Cross-platform mobile and web development with responsive UI.</p>
                </div>
                <div className="skill-card">
                  <h3>Firebase</h3>
                  <p>Authentication, Firestore, Storage and scalable backend services.</p>
                </div>
                <div className="skill-card">
                  <h3>BLoC</h3>
                  <p>Professional state management architecture for scalable apps.</p>
                </div>
                <div className="skill-card">
                  <h3>UI/UX</h3>
                  <p>Modern clean interface design with animations and interactions.</p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="container">
          <h2 className="section-title">
            Featured <span>Projects</span>
          </h2>
          <div className="projects">
            {projects.length > 0 ? projects.map((project) => (
              <div key={project.id || project._id} className="project-card">
                <img src={project.image_url || "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1200&auto=format&fit=crop"} alt={project.title} />
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  {project.technologies && (
                    <div className="tech-stack">
                      {(typeof project.technologies === 'string' ? project.technologies.split(',') : project.technologies).map((tech, i) => (
                        <span key={i}>{tech.trim()}</span>
                      ))}
                    </div>
                  )}
                  <div style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
                    {project.github_url && <a href={project.github_url} target="_blank" rel="noreferrer" style={{ color: '#00e5ff' }}>GitHub</a>}
                    {project.live_url && <a href={project.live_url} target="_blank" rel="noreferrer" style={{ color: '#ff00d4' }}>Live Demo</a>}
                  </div>
                </div>
              </div>
            )) : (
              <>
                <div className="project-card">
                  <img src="https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1200&auto=format&fit=crop" alt="Project 1" />
                  <div className="project-content">
                    <h3>Gym Management App</h3>
                    <p>Premium fitness application with user authentication and membership management.</p>
                    <div className="tech-stack">
                      <span>Flutter</span>
                      <span>Firebase</span>
                      <span>BLoC</span>
                    </div>
                  </div>
                </div>
                <div className="project-card">
                  <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop" alt="Project 2" />
                  <div className="project-content">
                    <h3>Inventory App</h3>
                    <p>Medical inventory management system with barcode scanning and cloud sync.</p>
                    <div className="tech-stack">
                      <span>Flutter</span>
                      <span>Cloud</span>
                      <span>Scanner</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="container">
          <div className="contact-box">
            <div className="contact-info">
              <h2>Let's Build Something Amazing</h2>
              <p>
                Looking for a developer to create modern and scalable applications? Let's collaborate and turn your ideas into reality.
              </p>
              {socialLinks.length > 0 && (
                <div style={{ display: 'flex', gap: '15px', marginTop: '30px', flexWrap: 'wrap' }}>
                  {socialLinks.map((link) => (
                    <a key={link.id || link._id} href={link.url} target="_blank" rel="noreferrer" style={{ color: '#00e5ff' }}>
                      {link.platform}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <form onSubmit={handleSubmit}>
              {status.msg && (
                <div style={{
                  padding: '12px',
                  borderRadius: '10px',
                  backgroundColor: status.type === 'success' ? 'rgba(0,255,0,0.1)' : 'rgba(255,0,0,0.1)',
                  color: status.type === 'success' ? '#00ff00' : '#ff3333',
                  border: `1px solid ${status.type === 'success' ? '#00ff00' : '#ff3333'}`
                }}>
                  {status.msg}
                </div>
              )}
              <input 
                type="text" 
                name="sender_name"
                placeholder="Your Name" 
                value={formData.sender_name}
                onChange={handleInputChange}
              />
              <input 
                type="email" 
                name="sender_email"
                placeholder="Your Email" 
                value={formData.sender_email}
                onChange={handleInputChange}
              />
              <textarea 
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleInputChange}
              ></textarea>
              <button className="primary-btn" disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer>
        © {new Date().getFullYear()} {profile?.name || 'Aas Mohammad'} • Modern Portfolio Design
      </footer>
    </div>
  );
};

export default SecondDesign;
