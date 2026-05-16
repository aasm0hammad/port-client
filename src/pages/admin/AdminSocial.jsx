import { useState, useEffect } from 'react';
import { getSocialLinks, createSocialLink, updateSocialLink, deleteSocialLink } from '../../api/api';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';

const emptySocial = { platform: '', url: '', icon: 'link', display_order: 0 };

const AdminSocial = () => {
  const [links, setLinks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptySocial);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { loadLinks(); }, []);

  const loadLinks = async () => {
    try { const res = await getSocialLinks(); setLinks(res.data); } catch {}
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editing) { await updateSocialLink(editing, form); }
      else { await createSocialLink(form); }
      setShowForm(false); setEditing(null); setForm(emptySocial); loadLinks();
    } catch (err) { console.error(err); }
  };

  const handleEdit = (link) => { setForm(link); setEditing(link.id); setShowForm(true); };

  const handleDelete = async (id) => {
    if (!confirm('Delete this link?')) return;
    try { await deleteSocialLink(id); loadLinks(); } catch {}
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-white">Social Links</h1>
        <button onClick={() => { setForm(emptySocial); setEditing(null); setShowForm(true); }} className="bg-[#A855F7] hover:bg-[#7e22ce] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold"><FaPlus /> Add Link</button>
      </div>

      {showForm && (
        <div className="bg-[#121217] card-border rounded-2xl p-6 mb-8">
          <div className="flex justify-between items-center mb-4"><h3 className="font-bold text-white">{editing ? 'Edit' : 'New'} Social Link</h3><button onClick={() => setShowForm(false)}><FaTimes className="text-gray-400" /></button></div>
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input value={form.platform} onChange={(e) => setForm({...form, platform: e.target.value})} placeholder="Platform (e.g. GitHub)" className="bg-[#0a0a0c] border border-gray-800 focus:border-[#A855F7] rounded-xl p-3 text-white outline-none text-sm" required />
            <input value={form.url} onChange={(e) => setForm({...form, url: e.target.value})} placeholder="URL" className="bg-[#0a0a0c] border border-gray-800 focus:border-[#A855F7] rounded-xl p-3 text-white outline-none text-sm" required />
            <input value={form.icon} onChange={(e) => setForm({...form, icon: e.target.value})} placeholder="Icon key" className="bg-[#0a0a0c] border border-gray-800 focus:border-[#A855F7] rounded-xl p-3 text-white outline-none text-sm" />
            <input type="number" value={form.display_order} onChange={(e) => setForm({...form, display_order: parseInt(e.target.value)})} placeholder="Order" className="bg-[#0a0a0c] border border-gray-800 focus:border-[#A855F7] rounded-xl p-3 text-white outline-none text-sm" />
            <button className="bg-[#A855F7] hover:bg-[#7e22ce] text-white py-3 rounded-xl font-bold col-span-full" type="submit">{editing ? 'Update' : 'Create'}</button>
          </form>
        </div>
      )}

      <div className="bg-[#121217] card-border rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-white/5">
            <th className="text-left p-4 text-sm text-gray-400">Platform</th>
            <th className="text-left p-4 text-sm text-gray-400">URL</th>
            <th className="text-left p-4 text-sm text-gray-400">Order</th>
            <th className="text-right p-4 text-sm text-gray-400">Actions</th>
          </tr></thead>
          <tbody>
            {links.map((l) => (
              <tr key={l.id} className="border-b border-white/5">
                <td className="p-4 font-medium text-white">{l.platform}</td>
                <td className="p-4 text-gray-400 text-sm truncate max-w-xs">{l.url}</td>
                <td className="p-4 text-gray-400">{l.display_order}</td>
                <td className="p-4 text-right">
                  <button onClick={() => handleEdit(l)} className="text-gray-400 hover:text-[#A855F7] mr-3"><FaEdit /></button>
                  <button onClick={() => handleDelete(l.id)} className="text-gray-400 hover:text-red-500"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {links.length === 0 && <p className="text-center text-gray-600 py-8">No social links yet.</p>}
      </div>
    </div>
  );
};

export default AdminSocial;
