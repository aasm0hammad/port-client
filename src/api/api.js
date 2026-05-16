import axios from 'axios';

const API_BASE = '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Public API
export const getProfile = () => api.get('/profile');
export const getSkills = () => api.get('/skills');
export const getProjects = () => api.get('/projects');
export const getSocialLinks = () => api.get('/social');
export const sendMessage = (data) => api.post('/messages', data);

// Auth API
export const loginAdmin = (data) => api.post('/auth/login', data);
export const getMe = () => api.get('/auth/me');

// Admin API
export const updateProfile = (data) => api.put('/profile', data);

export const createSkill = (data) => api.post('/skills', data);
export const updateSkill = (id, data) => api.put(`/skills/${id}`, data);
export const deleteSkill = (id) => api.delete(`/skills/${id}`);

export const getAllProjects = () => api.get('/projects/all');
export const createProject = (data) => api.post('/projects', data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

export const getMessages = () => api.get('/messages');
export const getMessageStats = () => api.get('/messages/stats');
export const markMessageRead = (id) => api.put(`/messages/${id}/read`);
export const deleteMessage = (id) => api.delete(`/messages/${id}`);

export const createSocialLink = (data) => api.post('/social', data);
export const updateSocialLink = (id, data) => api.put(`/social/${id}`, data);
export const deleteSocialLink = (id) => api.delete(`/social/${id}`);

export const getDashboardStats = () => api.get('/dashboard/stats');

export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append('image', file);
  return api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export default api;
