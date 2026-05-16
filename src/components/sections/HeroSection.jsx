import { FaDownload, FaComments, FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

const HeroSection = ({ profile, socialLinks }) => {
  const name = profile?.name || 'Aas Mohammad';
  const title = profile?.title || 'Flutter Developer';
  const greeting = profile?.greeting || "Hello, I'm";
  const bio = profile?.bio || 'I build modern, beautiful and high-performance mobile applications using Flutter & Firebase.';
  const profileImage = profile?.profile_image_url || '';

  const getSocialIcon = (platform) => {
    const p = platform?.toLowerCase();
    if (p === 'github') return <FaGithub className="w-5 h-5" />;
    if (p === 'linkedin') return <FaLinkedin className="w-5 h-5" />;
    if (p === 'twitter') return <FaTwitter className="w-5 h-5" />;
    if (p === 'email') return <FaEnvelope className="w-5 h-5" />;
    return <FaEnvelope className="w-5 h-5" />;
  };

  return (
    <section
      id="home"
      className="max-w-7xl mx-auto px-6 py-20 min-h-[80vh] flex flex-col md:flex-row items-center justify-between relative overflow-hidden"
    >
      {/* Background Decorative */}
      <div className="absolute top-20 right-20 w-32 h-32 bg-[#A855F7]/5 blur-[100px] rounded-full"></div>

      {/* Left Content */}
      <div className="w-full md:w-1/2 z-10 animate-fadeInUp">
        <p className="text-[#A855F7] font-medium mb-4">{greeting}</p>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-2">{name}</h1>
        <h2 className="text-4xl md:text-6xl font-extrabold text-[#A855F7] mb-8">{title}</h2>
        <p className="text-text-secondary text-lg mb-10 max-w-lg leading-relaxed">{bio}</p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 mb-10">
          {profile?.resume_url && (
            <a
              href={profile.resume_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#A855F7] hover:bg-[#7e22ce] text-text-primary px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all"
            >
              <FaDownload className="w-5 h-5" />
              Download Resume
            </a>
          )}
          {!profile?.resume_url && (
            <button className="bg-[#A855F7] hover:bg-[#7e22ce] text-text-primary px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all">
              <FaDownload className="w-5 h-5" />
              Download Resume
            </button>
          )}
          <a
            href="#contact"
            className="bg-transparent border border-border hover:border-[#A855F7] text-text-primary px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all"
          >
            <FaComments className="w-5 h-5" />
            Contact Me
          </a>
        </div>

        {/* Social Links */}
        <div className="flex gap-4">
          {socialLinks?.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-lg bg-bg-secondary border border-border flex items-center justify-center hover:border-[#A855F7] cursor-pointer transition-all text-text-secondary hover:text-[#A855F7]"
            >
              {getSocialIcon(link.platform)}
            </a>
          ))}
          {(!socialLinks || socialLinks.length === 0) && (
            <>
              <div className="w-10 h-10 rounded-lg bg-bg-secondary border border-border flex items-center justify-center hover:border-[#A855F7] cursor-pointer transition-all text-text-secondary">
                <FaGithub className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 rounded-lg bg-bg-secondary border border-border flex items-center justify-center hover:border-[#A855F7] cursor-pointer transition-all text-text-secondary">
                <FaLinkedin className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 rounded-lg bg-bg-secondary border border-border flex items-center justify-center hover:border-[#A855F7] cursor-pointer transition-all text-text-secondary">
                <FaTwitter className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 rounded-lg bg-bg-secondary border border-border flex items-center justify-center hover:border-[#A855F7] cursor-pointer transition-all text-text-secondary">
                <FaEnvelope className="w-5 h-5" />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right - Profile Photo */}
      <div className="w-full md:w-1/2 flex justify-center mt-12 md:mt-0">
        <div className="relative">
          {/* Glow background */}
          <div className="absolute -inset-10 bg-[#A855F7]/20 rounded-full blur-[60px]"></div>
          <div className="w-80 h-80 md:w-[450px] md:h-[450px] profile-glow rounded-full overflow-hidden z-20 relative">
            {profileImage ? (
              <img
                alt={`${name} Profile`}
                className="w-full h-full object-cover"
                src={profileImage}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#A855F7]/30 to-[#121217] flex items-center justify-center text-6xl font-bold text-[#A855F7]">
                {name.charAt(0)}
              </div>
            )}
          </div>
          {/* Geometric Accents */}
          <div className="absolute -top-4 -left-4 w-6 h-6 border-2 border-[#A855F7] rounded-full animate-float"></div>
          <div className="absolute top-1/4 -right-10 w-4 h-4 border-2 border-blue-500 transform rotate-45 animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 -left-12 w-6 h-6 border-2 border-red-400 rounded-sm transform -rotate-12 animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
