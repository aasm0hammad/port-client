import { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../../api/api';

const AdminProfile = () => {
  const [form, setForm] = useState({ name: '', title: '', greeting: '', bio: '', experience: '', location: '', email: '', profile_image_url: '', about_image_url: '', resume_url: '' });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getProfile().then(res => setForm(res.data)).catch(() => {});
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateProfile(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) { console.error(err); }
    setSaving(false);
  };

  const Field = ({ label, name, type = 'text', rows }) => (
    <div>
      <label className="text-sm text-gray-400 mb-2 block">{label}</label>
      {rows ? (
        <textarea value={form[name] || ''} onChange={(e) => setForm({...form, [name]: e.target.value})} rows={rows} className="w-full bg-[#0a0a0c] border border-gray-800 focus:border-[#A855F7] rounded-xl p-3 text-white outline-none transition-all text-sm" />
      ) : (
        <input type={type} value={form[name] || ''} onChange={(e) => setForm({...form, [name]: e.target.value})} className="w-full bg-[#0a0a0c] border border-gray-800 focus:border-[#A855F7] rounded-xl p-3 text-white outline-none transition-all text-sm" />
      )}
    </div>
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8 text-white">Edit Profile</h1>
      <form onSubmit={handleSave} className="bg-[#121217] card-border rounded-2xl p-8 space-y-6 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Full Name" name="name" />
          <Field label="Title / Role" name="title" />
          <Field label="Greeting Text" name="greeting" />
          <Field label="Experience" name="experience" />
          <Field label="Location" name="location" />
          <Field label="Email" name="email" type="email" />
        </div>
        <Field label="Bio / About" name="bio" rows={4} />
        <Field label="Profile Image URL" name="profile_image_url" />
        <Field label="About Section Image URL" name="about_image_url" />
        <Field label="Resume Download URL" name="resume_url" />
        <button disabled={saving} className="bg-[#A855F7] hover:bg-[#7e22ce] disabled:opacity-50 text-white px-8 py-3 rounded-xl font-bold transition-all" type="submit">
          {saved ? '✓ Saved!' : saving ? 'Saving...' : 'Save Profile'}
        </button>
      </form>
    </div>
  );
};

export default AdminProfile;
