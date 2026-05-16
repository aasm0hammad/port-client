import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Initial theme setup
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Detect active section
      const sections = navLinks.map((l) => l.href.replace('#', ''));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href) => {
    setIsOpen(false);
    const el = document.getElementById(href.replace('#', ''));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-bg-primary/90 backdrop-blur-md border-b border-border shadow-lg'
            : 'bg-bg-primary/80 backdrop-blur-md border-b border-border'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold tracking-tighter">
            AM<span className="text-[#A855F7]">.</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className={`transition-colors cursor-pointer ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-[#A855F7] border-b-2 border-[#A855F7] pb-1'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Theme toggle */}
            <div 
              onClick={toggleTheme}
              className="hidden md:flex w-12 h-6 bg-bg-secondary rounded-full items-center px-1 cursor-pointer transition-colors border border-border"
            >
              <div className={`w-4 h-4 bg-brand-purple rounded-full transition-all duration-300 ${theme === 'dark' ? 'ml-auto' : 'ml-0'}`}></div>
            </div>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#contact');
              }}
              className="hidden sm:inline-block bg-[#A855F7] hover:bg-[#7e22ce] text-text-primary px-6 py-2 rounded-lg font-medium transition-all cursor-pointer"
            >
              Hire Me
            </a>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-text-primary text-xl p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] mobile-menu-overlay md:hidden">
          <div className="flex justify-end p-6">
            <button onClick={() => setIsOpen(false)} className="text-text-primary text-2xl">
              <FaTimes />
            </button>
          </div>
          <div className="flex flex-col items-center space-y-8 pt-12">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className={`text-2xl font-semibold transition-colors ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-[#A855F7]'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => handleNavClick('#contact')}
              className="bg-[#A855F7] hover:bg-[#7e22ce] text-text-primary px-8 py-3 rounded-lg font-semibold mt-4"
            >
              Hire Me
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
