import { useState, useEffect } from 'react';
import { getMessages, markMessageRead, deleteMessage } from '../../api/api';
import { FaTrash, FaEnvelope, FaEnvelopeOpen } from 'react-icons/fa';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => { loadMessages(); }, []);

  const loadMessages = async () => {
    try { const res = await getMessages(); setMessages(res.data); } catch {}
  };

  const handleMarkRead = async (id) => {
    try { await markMessageRead(id); loadMessages(); } catch {}
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return;
    try { await deleteMessage(id); loadMessages(); } catch {}
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Messages Inbox</h1>
      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`bg-[#121217] card-border rounded-2xl p-6 ${!msg.is_read ? 'border-l-4 border-l-[#A855F7]' : ''}`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {msg.is_read ? <FaEnvelopeOpen className="text-gray-600" /> : <FaEnvelope className="text-[#A855F7]" />}
                  <h4 className="font-bold">{msg.sender_name}</h4>
                  <span className="text-sm text-gray-500">{msg.sender_email}</span>
                  {!msg.is_read && <span className="bg-[#A855F7] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">NEW</span>}
                </div>
                <p className="text-gray-400 text-sm ml-8">{msg.message}</p>
                <p className="text-gray-600 text-xs ml-8 mt-2">{new Date(msg.created_at).toLocaleString()}</p>
              </div>
              <div className="flex gap-2 ml-4">
                {!msg.is_read && <button onClick={() => handleMarkRead(msg.id)} className="text-gray-400 hover:text-[#A855F7] text-sm px-3 py-1 border border-gray-800 rounded-lg hover:border-[#A855F7]">Mark Read</button>}
                <button onClick={() => handleDelete(msg.id)} className="text-gray-400 hover:text-red-500"><FaTrash /></button>
              </div>
            </div>
          </div>
        ))}
        {messages.length === 0 && <p className="text-center text-gray-600 py-12">No messages yet.</p>}
      </div>
    </div>
  );
};

export default AdminMessages;
