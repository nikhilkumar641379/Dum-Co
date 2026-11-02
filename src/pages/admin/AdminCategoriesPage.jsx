import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit3, Trash2, Layers, Image as ImageIcon } from 'lucide-react';
import { api } from '../../services/supabase';

export const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    sortOrder: 1,
    status: 'active'
  });

  const fetchCats = async () => {
    const data = await api.getCategories();
    setCategories(data);
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setForm({
      name: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
      sortOrder: categories.length + 1,
      status: 'active'
    });
    setShowModal(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingCategory(cat);
    setForm({
      name: cat.name,
      description: cat.description,
      image: cat.image,
      sortOrder: cat.sortOrder || 1,
      status: cat.status || 'active'
    });
    setShowModal(true);
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete category "${name}"?`)) {
      await api.deleteCategory(id);
      await fetchCats();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = editingCategory 
      ? { ...editingCategory, ...form, sortOrder: Number(form.sortOrder) }
      : { ...form, sortOrder: Number(form.sortOrder) };

    await api.saveCategory(payload);
    setShowModal(false);
    await fetchCats();
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', margin: '0 0 4px', color: 'var(--text-high)' }}>
            Course Categories Management
          </h1>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Organize customer menu sections, handi courses, and banners.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="btn-primary"
          style={{ padding: '0.625rem 1.25rem', fontSize: '0.875rem' }}
        >
          <PlusCircle size={16} />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Categories Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}>
        {categories.map((cat) => (
          <div
            key={cat.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--surface-border)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ position: 'relative', height: '140px' }}>
              <img
                src={cat.image}
                alt={cat.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <span style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                backgroundColor: 'rgba(0,0,0,0.7)',
                color: '#FFFFFF',
                fontSize: '0.75rem',
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
                fontWeight: 600
              }}>
                Sequence #{cat.sortOrder || 1}
              </span>
            </div>

            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <h3 style={{ fontSize: '1.1875rem', margin: 0, color: 'var(--text-high)' }}>{cat.name}</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--secondary)', fontWeight: 700 }}>
                  {cat.itemCount || 0} Dishes
                </span>
              </div>

              <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', lineHeight: '1.45', marginBottom: '1.25rem', flex: 1 }}>
                {cat.description}
              </p>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', paddingTop: '0.75rem', borderTop: '1px solid var(--surface-border-subtle)' }}>
                <button
                  onClick={() => handleOpenEdit(cat)}
                  className="btn-outline"
                  style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                >
                  <Edit3 size={14} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(cat.id, cat.name)}
                  style={{
                    background: 'none',
                    border: '1px solid #FCA5A5',
                    color: '#DC2626',
                    padding: '6px 10px',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer'
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Category Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: '1rem' }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-xl)',
            width: '100%',
            maxWidth: '500px',
            boxShadow: 'var(--shadow-modal)',
            overflow: 'hidden'
          }}>
            <div style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid var(--surface-border)', backgroundColor: '#FBF9F5', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.25rem', margin: 0 }}>
                {editingCategory ? 'Edit Category' : 'Create New Category'}
              </h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem', color: 'var(--text-muted)' }}>
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Category Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="input-dum"
                  placeholder="e.g. Royal Mughlai Starters"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Banner Image URL *</label>
                <input
                  type="url"
                  required
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="input-dum"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Description</label>
                <textarea
                  rows={2}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="input-dum"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Sort Order</label>
                  <input
                    type="number"
                    value={form.sortOrder}
                    onChange={(e) => setForm({ ...form, sortOrder: e.target.value })}
                    className="input-dum"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="input-dum"
                  >
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '1rem' }}>
                <button type="button" onClick={() => setShowModal(false)} className="btn-outline">Cancel</button>
                <button type="submit" className="btn-primary">Save Category</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
