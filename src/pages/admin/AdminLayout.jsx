import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FaHome, FaUser, FaCode, FaProjectDiagram, FaEnvelope, FaShareAlt, FaSignOutAlt, FaArrowLeft } from 'react-icons/fa';

const sidebarLinks = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: FaHome },
  { name: 'Profile', path: '/admin/profile', icon: FaUser },
  { name: 'Skills', path: '/admin/skills', icon: FaCode },
  { name: 'Projects', path: '/admin/projects', icon: FaProjectDiagram },
  { name: 'Messages', path: '/admin/messages', icon: FaEnvelope },
  { name: 'Social Links', path: '/admin/social', icon: FaShareAlt },
];

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#121217] border-r border-white/5 flex flex-col min-h-screen fixed left-0 top-0">
        <div className="p-6 border-b border-white/5">
          <h1 className="text-xl font-bold">AM<span className="text-[#A855F7]">.</span> <span className="text-sm font-normal text-gray-400">Admin</span></h1>
        </div>
        <nav className="flex-1 py-4">
          {sidebarLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={({ isActive }) => `flex items-center gap-3 px-6 py-3 text-sm transition-all ${isActive ? 'admin-nav-active text-[#A855F7]' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
              <link.icon className="w-4 h-4" />
              {link.name}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5 space-y-2">
          <a href="/" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors">
            <FaArrowLeft className="w-4 h-4" /> View Portfolio
          </a>
          <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:text-red-300 transition-colors w-full">
            <FaSignOutAlt className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        <header className="sticky top-0 z-10 bg-[#0a0a0c]/90 backdrop-blur-md border-b border-white/5 px-8 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Welcome, <span className="text-[#A855F7]">{user?.username || 'Admin'}</span></h2>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
