import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

const ProjectCard = ({ project }) => {
  const tags = Array.isArray(project.tags) ? project.tags : [];
  return (
    <div className="bg-bg-secondary card-border rounded-2xl overflow-hidden group hover:border-[#A855F7]/20 transition-all duration-300">
      <div className="h-48 overflow-hidden">
        {project.image_url ? (
          <img alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={project.image_url} />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#A855F7]/10 to-[#121217] flex items-center justify-center">
            <span className="text-gray-600">{project.title}</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h4 className="text-lg font-bold mb-2">{project.title}</h4>
        <p className="text-text-secondary text-sm mb-6 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, i) => (
            <span key={i} className="text-[10px] px-2 py-1 bg-bg-primary rounded-md text-text-secondary">{tag}</span>
          ))}
        </div>
        <div className="flex items-center gap-4">
          {project.live_url && <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-[#A855F7] transition-colors"><FaExternalLinkAlt className="w-5 h-5" /></a>}
          {project.github_url && <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-[#A855F7] transition-colors"><FaGithub className="w-5 h-5" /></a>}
          {!project.live_url && !project.github_url && (
            <>
              <span className="text-text-secondary hover:text-[#A855F7] cursor-pointer"><FaExternalLinkAlt className="w-5 h-5" /></span>
              <span className="text-text-secondary hover:text-[#A855F7] cursor-pointer"><FaGithub className="w-5 h-5" /></span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = ({ projects }) => {
  const defaults = [
    { id: 1, title: 'Gym App', description: 'A complete gym management app.', tags: ['Flutter', 'Firebase', 'Bloc'], image_url: '' },
    { id: 2, title: 'Inventory App', description: 'Inventory management app.', tags: ['Flutter', 'Firebase', 'Bloc'], image_url: '' },
    { id: 3, title: 'Chat App', description: 'Real-time chat application.', tags: ['Flutter', 'Firebase', 'Bloc'], image_url: '' },
    { id: 4, title: 'AI Image Generator', description: 'Generate images using AI.', tags: ['Flutter', 'API', 'Bloc'], image_url: '' },
  ];
  const list = projects && projects.length > 0 ? projects : defaults;
  return (
    <section className="max-w-7xl mx-auto px-6 py-20" id="projects">
      <div className="flex items-center justify-between mb-12">
        <h3 className="text-3xl font-bold">My Projects</h3>
        <button className="bg-transparent border border-border px-6 py-2 rounded-lg text-sm hover:border-[#A855F7] transition-all text-text-primary">View All Projects</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {list.map((p) => <ProjectCard key={p.id} project={p} />)}
      </div>
    </section>
  );
};

export default ProjectsSection;
