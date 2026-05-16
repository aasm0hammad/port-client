import { useState, useEffect } from 'react';
import { FaProjectDiagram, FaCode, FaEnvelope, FaEnvelopeOpen } from 'react-icons/fa';
import { getDashboardStats } from '../../api/api';

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-[#121217] card-border rounded-2xl p-6 flex items-center gap-4">
    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: color + '20' }}>
      <Icon className="w-6 h-6" style={{ color }} />
    </div>
    <div>
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-gray-400">{label}</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({ projects: 0, skills: 0, messages: 0, unread: 0 });

  useEffect(() => {
    getDashboardStats().then(res => setStats(res.data)).catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={FaProjectDiagram} label="Total Projects" value={stats.projects} color="#A855F7" />
        <StatCard icon={FaCode} label="Total Skills" value={stats.skills} color="#60A5FA" />
        <StatCard icon={FaEnvelope} label="Total Messages" value={stats.messages} color="#22C55E" />
        <StatCard icon={FaEnvelopeOpen} label="Unread Messages" value={stats.unread} color="#EAB308" />
      </div>
    </div>
  );
};

export default AdminDashboard;
