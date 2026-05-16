import { FaUser } from 'react-icons/fa';

const AboutSection = ({ profile }) => {
  const name = profile?.name || 'Aas Mohammad';
  const bio = profile?.bio || "I'm Aas Mohammad, a passionate Flutter Developer with experience in building cross-platform mobile applications. I love turning ideas into real products with clean code and beautiful UI.";
  const experience = profile?.experience || '1+ Years';
  const location = profile?.location || 'India';
  const email = profile?.email || 'aas@gmail.com';
  const aboutImage = profile?.about_image_url || '';

  const infoItems = [
    { label: 'Name', value: name },
    { label: 'Experience', value: experience },
    { label: 'Location', value: location },
    { label: 'Email', value: email },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-20" id="about">
      <div className="bg-bg-secondary card-border rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-12">
        {/* Left Content */}
        <div className="w-full md:w-1/2">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-[#A855F7]/20 rounded-xl flex items-center justify-center">
              <FaUser className="w-6 h-6 text-[#A855F7]" />
            </div>
            <h3 className="text-2xl font-bold">About Me</h3>
          </div>
          <p className="text-text-secondary leading-relaxed mb-8">{bio}</p>
          <div className="grid grid-cols-2 gap-4">
            {infoItems.map((item) => (
              <div
                key={item.label}
                className="bg-bg-primary/50 border border-border p-4 rounded-xl"
              >
                <p className="text-[#A855F7] text-xs font-semibold uppercase mb-1">
                  {item.label}
                </p>
                <p className="font-medium truncate">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right - Image */}
        <div className="w-full md:w-1/2 relative">
          {aboutImage ? (
            <img
              alt="Work Environment"
              className="rounded-2xl w-full"
              src={aboutImage}
            />
          ) : (
            <div className="rounded-2xl w-full h-72 bg-gradient-to-br from-[#A855F7]/10 to-[#121217] flex items-center justify-center">
              <span className="text-gray-600 text-lg">About Image</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
