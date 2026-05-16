import { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import SkillsSection from '../components/sections/SkillsSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import ContactSection from '../components/sections/ContactSection';
import { getProfile, getSkills, getProjects, getSocialLinks } from '../api/api';

const Home = () => {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);

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

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <HeroSection profile={profile} socialLinks={socialLinks} />
        <AboutSection profile={profile} />
        <SkillsSection skills={skills} />
        <ProjectsSection projects={projects} />
        <ContactSection socialLinks={socialLinks} />
      </main>
      <Footer />
    </>
  );
};

export default Home;
