import { useState, useEffect } from 'react';
import { getAllProjects, createProject, updateProject, deleteProject } from '../../api/api';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaEye, FaEyeSlash } from 'react-icons/fa';

const emptyProject = { title: '', description: '', image_url: '', live_url: '', github_url: '', tags: [], display_order: 0, is_visible: true };

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyProject);
  const [tagInput, setTagInput] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { loadProjects(); }, []);

  const loadProjects = async () => {
    try { const res = await getAllProjects(); setProjects(res.data); } catch {}
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editing) { await updateProject(editing, form); }
      else { await createProject(form); }
      setShowForm(false); setEditing(null); setForm(emptyProject); loadProjects();
    } catch (err) { console.error(err); }
  };

  const handleEdit = (p) => {
    setForm({ ...p, tags: Array.isArray(p.tags) ? p.tags : [] }); setEditing(p.id); setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    try { await deleteProject(id); loadProjects(); } catch {}
  };

  const addTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      setForm({...form, tags: [...form.tags, tagInput.trim()]}); setTagInput('');
    }
  };

  const removeTag = (tag) => setForm({...form, tags: form.tags.filter(t => t !== tag)});

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Manage Projects</h1>
        <button onClick={() => { setForm(emptyProject); setEditing(null); setShowForm(true); }} className="bg-[#A855F7] hover:bg-[#7e22ce] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold"><FaPlus /> Add Project</button>
      </div>

      {showForm && (
        <div className="bg-[#121217] card-border rounded-2xl p-6 mb-8">
          <div className="flex justify-between items-center mb-4"><h3 className="font-bold">{editing ? 'Edit' : 'New'} Project</h3><button onClick={() => setShowForm(false)}><FaTimes className="text-gray-400" /></button></div>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} placeholder="Project Title" className="bg-[#0a0a0c] border border-gray-800 focus:border-[#A855F7] rounded-xl p-3 text-white outline-none text-sm" required />
              <input type="number" value={form.display_order} onChange={(e) => setForm({...form, display_order: parseInt(e.target.value)})} placeholder="Order" className="bg-[#0a0a0c] border border-gray-800 focus:border-[#A855F7] rounded-xl p-3 text-white outline-none text-sm" />
            </div>
            <textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} placeholder="Description" rows={3} className="w-full bg-[#0a0a0c] border border-gray-800 focus:border-[#A855F7] rounded-xl p-3 text-white outline-none text-sm" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input value={form.image_url} onChange={(e) => setForm({...form, image_url: e.target.value})} placeholder="Image URL" className="bg-[#0a0a0c] border border-gray-800 focus:border-[#A855F7] rounded-xl p-3 text-white outline-none text-sm" />
              <input value={form.live_url} onChange={(e) => setForm({...form, live_url: e.target.value})} placeholder="Live URL" className="bg-[#0a0a0c] border border-gray-800 focus:border-[#A855F7] rounded-xl p-3 text-white outline-none text-sm" />
              <input value={form.github_url} onChange={(e) => setForm({...form, github_url: e.target.value})} placeholder="GitHub URL" className="bg-[#0a0a0c] border border-gray-800 focus:border-[#A855F7] rounded-xl p-3 text-white outline-none text-sm" />
            </div>
            <div className="flex gap-2">
              <input value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); }}} placeholder="Add tag" className="bg-[#0a0a0c] border border-gray-800 focus:border-[#A855F7] rounded-xl p-3 text-white outline-none text-sm flex-1" />
              <button type="button" onClick={addTag} className="bg-gray-800 px-4 rounded-xl text-sm text-white">Add</button>
            </div>
            <div className="flex flex-wrap gap-2">{form.tags.map((tag) => (<span key={tag} className="bg-[#A855F7]/20 text-[#A855F7] px-3 py-1 rounded-lg text-sm flex items-center gap-2">{tag}<button type="button" onClick={() => removeTag(tag)}><FaTimes className="w-3 h-3" /></button></span>))}</div>
            <label className="flex items-center gap-2 text-sm text-gray-400"><input type="checkbox" checked={form.is_visible} onChange={(e) => setForm({...form, is_visible: e.target.checked})} className="accent-[#A855F7]" /> Visible on portfolio</label>
            <button className="bg-[#A855F7] hover:bg-[#7e22ce] text-white py-3 rounded-xl font-bold w-full" type="submit">{editing ? 'Update' : 'Create'} Project</button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div key={p.id} className="bg-[#121217] card-border rounded-2xl overflow-hidden">
            <div className="h-40 overflow-hidden bg-gray-900">
              {p.image_url ? <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-600">No Image</div>}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold">{p.title}</h4>
                {p.is_visible ? <FaEye className="text-green-500 w-4 h-4" /> : <FaEyeSlash className="text-gray-600 w-4 h-4" />}
              </div>
              <p className="text-gray-400 text-sm mb-3 line-clamp-2">{p.description}</p>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(p)} className="text-[#A855F7] hover:text-[#d8b4fe] text-sm flex items-center gap-1"><FaEdit /> Edit</button>
                <button onClick={() => handleDelete(p.id)} className="text-red-400 hover:text-red-300 text-sm flex items-center gap-1"><FaTrash /> Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {projects.length === 0 && <p className="text-center text-gray-600 py-8">No projects yet.</p>}
    </div>
  );
};

export default AdminProjects;
