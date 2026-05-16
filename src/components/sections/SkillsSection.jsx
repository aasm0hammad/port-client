const CircularProgress = ({ percentage, color }) => {
  return (
    <div className="circular-progress">
      <svg className="w-full h-full" viewBox="0 0 36 36">
        <path
          className="text-gray-800"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke={color || '#A855F7'}
          strokeDasharray={`${percentage}, 100`}
          strokeLinecap="round"
          strokeWidth="3"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">
        {percentage}%
      </span>
    </div>
  );
};

const SkillsSection = ({ skills }) => {
  const defaultSkills = [
    { id: 1, name: 'Flutter', percentage: 90, color: '#A855F7', icon_url: '' },
    { id: 2, name: 'Dart', percentage: 85, color: '#60A5FA', icon_url: '' },
    { id: 3, name: 'Firebase', percentage: 80, color: '#EAB308', icon_url: '' },
    { id: 4, name: 'Java', percentage: 75, color: '#EF4444', icon_url: '' },
    { id: 5, name: 'UI/UX Design', percentage: 80, color: '#22C55E', icon_url: '' },
  ];

  const displaySkills = skills && skills.length > 0 ? skills : defaultSkills;

  return (
    <section className="max-w-7xl mx-auto px-6 py-20" id="skills">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
        <div>
          <h3 className="text-3xl font-bold mb-2">My Skills</h3>
          <p className="text-text-secondary">Technical proficiency and expertise</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {displaySkills.map((skill) => (
          <div
            key={skill.id}
            className="bg-bg-secondary card-border p-6 rounded-2xl flex items-center justify-between hover:border-[#A855F7]/30 transition-all duration-300 group"
          >
            <div className="flex items-center gap-4">
              {skill.icon_url ? (
                <img alt={skill.name} className="w-10 h-10" src={skill.icon_url} />
              ) : (
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-text-primary font-bold text-sm" style={{ backgroundColor: skill.color + '33' }}>
                  {skill.name.charAt(0)}
                </div>
              )}
              <span className="font-semibold text-sm">{skill.name}</span>
            </div>
            <CircularProgress percentage={skill.percentage} color={skill.color} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
