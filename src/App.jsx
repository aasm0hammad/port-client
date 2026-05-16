import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useEffect } from 'react';
import Home from './pages/Home';
import SecondDesign from './pages/SecondDesign';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProfile from './pages/admin/AdminProfile';
import AdminSkills from './pages/admin/AdminSkills';
import AdminProjects from './pages/admin/AdminProjects';
import AdminMessages from './pages/admin/AdminMessages';
import AdminSocial from './pages/admin/AdminSocial';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center"><div className="w-8 h-8 border-2 border-[#A855F7] border-t-transparent rounded-full animate-spin"></div></div>;
  if (!user) return <Navigate to="/admin/login" />;
  return children;
};

const MainRoute = () => {
  const hasVisited = sessionStorage.getItem('hasVisited');
  
  useEffect(() => {
    if (!hasVisited) {
      sessionStorage.setItem('hasVisited', 'true');
    }
  }, [hasVisited]);

  return !hasVisited ? <Home /> : <SecondDesign />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainRoute />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="profile" element={<AdminProfile />} />
        <Route path="skills" element={<AdminSkills />} />
        <Route path="projects" element={<AdminProjects />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="social" element={<AdminSocial />} />
      </Route>
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
