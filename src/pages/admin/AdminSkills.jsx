import { useState, useEffect } from 'react';
import { getSkills, createSkill, updateSkill, deleteSkill } from '../../api/api';
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';

const emptySkill = { name: '', percentage: 50, icon_url: '', color: '#A855F7', display_order: 0 };

const AdminSkills = () => {
  const [skills, setSkills] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptySkill);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => { loadSkills(); }, []);

  const loadSkills = async () => {
    try { const res = await getSkills(); setSkills(res.data); } catch {}
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editing) { await updateSkill(editing, form); }
      else { await createSkill(form); }
      setShowForm(false); setEditing(null); setForm(emptySkill); loadSkills();
    } catch (err) { console.error(err); }
  };

  const handleEdit = (skill) => {
    setForm(skill); setEditing(skill.id); setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this skill?')) return;
    try { await deleteSkill(id); loadSkills(); } catch {}
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Manage Skills</h1>
        <button onClick={() => { setForm(emptySkill); setEditing(null); setShowForm(true); }} className="bg-[#A855F7] hover:bg-[#7e22ce] text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold">
          <FaPlus /> Add Skill
        </button>
      </div>

      {showForm && (
        <div className="bg-[#121217] card-border rounded-2xl p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold">{editing ? 'Edit Skill' : 'New Skill'}</h3>
            <button onClick={() => setShowForm(false)}><FaTimes className="text-gray-400" /></button>
          </div>
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Skill Name" className="bg-[#0a0a0c] border border-gray-800 focus:border-[#A855F7] rounded-xl p-3 text-white outline-none text-sm" required />
            <input type="number" min="0" max="100" value={form.percentage} onChange={(e) => setForm({...form, percentage: parseInt(e.target.value)})} placeholder="Percentage" className="bg-[#0a0a0c] border border-gray-800 focus:border-[#A855F7] rounded-xl p-3 text-white outline-none text-sm" />
            <input value={form.color} onChange={(e) => setForm({...form, color: e.target.value})} placeholder="Color (#hex)" className="bg-[#0a0a0c] border border-gray-800 focus:border-[#A855F7] rounded-xl p-3 text-white outline-none text-sm" />
            <input value={form.icon_url} onChange={(e) => setForm({...form, icon_url: e.target.value})} placeholder="Icon URL" className="bg-[#0a0a0c] border border-gray-800 focus:border-[#A855F7] rounded-xl p-3 text-white outline-none text-sm col-span-2" />
            <input type="number" value={form.display_order} onChange={(e) => setForm({...form, display_order: parseInt(e.target.value)})} placeholder="Order" className="bg-[#0a0a0c] border border-gray-800 focus:border-[#A855F7] rounded-xl p-3 text-white outline-none text-sm" />
            <button className="bg-[#A855F7] hover:bg-[#7e22ce] text-white py-3 rounded-xl font-bold col-span-full" type="submit">
              {editing ? 'Update' : 'Create'} Skill
            </button>
          </form>
        </div>
      )}

      <div className="bg-[#121217] card-border rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-white/5">
            <th className="text-left p-4 text-sm text-gray-400">Skill</th>
            <th className="text-left p-4 text-sm text-gray-400">Progress</th>
            <th className="text-left p-4 text-sm text-gray-400">Color</th>
            <th className="text-left p-4 text-sm text-gray-400">Order</th>
            <th className="text-right p-4 text-sm text-gray-400">Actions</th>
          </tr></thead>
          <tbody>
            {skills.map((s) => (
              <tr key={s.id} className="border-b border-white/5 hover:bg-white/2">
                <td className="p-4 flex items-center gap-3">
                  {s.icon_url && <img src={s.icon_url} className="w-8 h-8" alt={s.name} />}
                  <span className="font-medium">{s.name}</span>
                </td>
                <td className="p-4"><div className="flex items-center gap-2"><div className="w-24 h-2 bg-gray-800 rounded-full"><div className="h-full rounded-full" style={{ width: `${s.percentage}%`, backgroundColor: s.color }}></div></div><span className="text-sm text-gray-400">{s.percentage}%</span></div></td>
                <td className="p-4"><div className="flex items-center gap-2"><div className="w-4 h-4 rounded" style={{ backgroundColor: s.color }}></div><span className="text-sm text-gray-400">{s.color}</span></div></td>
                <td className="p-4 text-gray-400">{s.display_order}</td>
                <td className="p-4 text-right">
                  <button onClick={() => handleEdit(s)} className="text-gray-400 hover:text-[#A855F7] mr-3"><FaEdit /></button>
                  <button onClick={() => handleDelete(s.id)} className="text-gray-400 hover:text-red-500"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {skills.length === 0 && <p className="text-center text-gray-600 py-8">No skills yet. Add your first skill!</p>}
      </div>
    </div>
  );
};

export default AdminSkills;
