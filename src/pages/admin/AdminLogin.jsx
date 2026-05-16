import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../../api/api';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await loginAdmin({ username, password });
      login(res.data.token, res.data.user);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">AM<span className="text-[#A855F7]">.</span></h1>
          <p className="text-gray-400 mt-2">Admin Panel Login</p>
        </div>
        <div className="bg-[#121217] card-border rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">{error}</div>}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Username</label>
              <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-[#0a0a0c] border border-gray-800 focus:border-[#A855F7] rounded-xl p-4 text-white outline-none transition-all" placeholder="admin" required />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-[#0a0a0c] border border-gray-800 focus:border-[#A855F7] rounded-xl p-4 text-white outline-none transition-all" placeholder="••••••••" required />
            </div>
            <button disabled={loading} className="w-full bg-[#A855F7] hover:bg-[#7e22ce] disabled:opacity-50 text-white py-4 rounded-xl font-bold transition-all" type="submit">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
        <p className="text-center text-gray-600 text-sm mt-6">
          <a href="/" className="hover:text-[#A855F7] transition-colors">← Back to Portfolio</a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
