import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2 } from 'lucide-react';
import { api } from '../../services/supabase';

export const AdminEditFoodPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const cats = await api.getCategories();
      const food = await api.getFoodById(id);
      setCategories(cats);
      if (food) {
        setForm({
          ...food,
          ingredientsStr: food.ingredients ? food.ingredients.join(', ') : '',
          portions: food.portions || [{ name: 'Standard', price: food.price }]
        });
      }
    };
    fetchData();
  }, [id]);

  if (!form) return <div>Loading Dish for Editing...</div>;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePortionChange = (index, field, value) => {
    const updated = [...form.portions];
    updated[index][field] = field === 'price' ? Number(value) : value;
    setForm(prev => ({ ...prev, portions: updated }));
  };

  const handleAddPortion = () => {
    setForm(prev => ({
      ...prev,
      portions: [...prev.portions, { name: 'Party Pack Handi', price: Number(prev.price) * 2 }]
    }));
  };

  const handleRemovePortion = (index) => {
    setForm(prev => ({
      ...prev,
      portions: prev.portions.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const catObj = categories.find(c => c.id === form.category);
    const ingredientsArray = form.ingredientsStr.split(',').map(s => s.trim()).filter(Boolean);

    const updatedFood = {
      ...form,
      price: Number(form.price),
      spiceLevel: Number(form.spiceLevel),
      categoryName: catObj ? catObj.name : form.categoryName,
      ingredients: ingredientsArray
    };

    await api.saveFoodItem(updatedFood);
    navigate('/admin/menu');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '840px' }}>
      <div>
        <Link
          to="/admin/menu"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--text-muted)',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: 600,
            marginBottom: '1rem'
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Menu Catalog</span>
        </Link>
        <h1 style={{ fontSize: '1.75rem', margin: 0, color: 'var(--text-high)' }}>
          Edit Dish: {form.name}
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Modify pricing, portions, stock status, and aromatics.
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{
        backgroundColor: '#FFFFFF',
        padding: '2.5rem',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--surface-border)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.75rem'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Dish Name *</label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="input-dum"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Course / Category *</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="input-dum"
            >
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Base Price (₹) *</label>
            <input
              type="number"
              name="price"
              required
              min="0"
              value={form.price}
              onChange={handleChange}
              className="input-dum"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Dietary Profile *</label>
            <select
              name="dietary"
              value={form.dietary}
              onChange={handleChange}
              className="input-dum"
            >
              <option value="veg">Pure Vegetarian (Green)</option>
              <option value="non-veg">Non-Vegetarian (Crimson)</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Spice Intensity *</label>
            <select
              name="spiceLevel"
              value={form.spiceLevel}
              onChange={handleChange}
              className="input-dum"
            >
              <option value="0">0 - Mild / Sweet</option>
              <option value="1">1 - Subtle Spiced</option>
              <option value="2">2 - Signature Dum Spice</option>
              <option value="3">3 - Fiery Royal Spiced</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Cooking & Prep Time *</label>
            <input
              type="text"
              name="prepTime"
              value={form.prepTime}
              onChange={handleChange}
              className="input-dum"
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Food Image URL *</label>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <input
              type="url"
              name="image"
              required
              value={form.image}
              onChange={handleChange}
              className="input-dum"
            />
            {form.image && (
              <img
                src={form.image}
                alt="Preview"
                style={{ width: '50px', height: '50px', borderRadius: 'var(--radius-md)', objectFit: 'cover', border: '1px solid var(--surface-border)' }}
              />
            )}
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Culinary Narrative & Description *</label>
          <textarea
            name="description"
            required
            rows={3}
            value={form.description}
            onChange={handleChange}
            className="input-dum"
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Ingredients & Aromatics</label>
          <input
            type="text"
            name="ingredientsStr"
            value={form.ingredientsStr}
            onChange={handleChange}
            className="input-dum"
          />
        </div>

        {/* Portions */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <label style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-high)' }}>
              Handi Portion Options
            </label>
            <button
              type="button"
              onClick={handleAddPortion}
              className="btn-outline"
              style={{ padding: '4px 10px', fontSize: '0.75rem' }}
            >
              <Plus size={12} />
              <span>Add Portion Option</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {form.portions.map((portion, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                  type="text"
                  value={portion.name}
                  onChange={(e) => handlePortionChange(idx, 'name', e.target.value)}
                  className="input-dum"
                  style={{ flex: 2 }}
                />
                <input
                  type="number"
                  value={portion.price}
                  onChange={(e) => handlePortionChange(idx, 'price', e.target.value)}
                  className="input-dum"
                  style={{ flex: 1 }}
                />
                {form.portions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemovePortion(idx)}
                    style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', padding: '6px' }}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '2rem', padding: '1rem', backgroundColor: 'var(--surface-subdued)', borderRadius: 'var(--radius-md)' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.875rem' }}>
            <input
              type="checkbox"
              name="isBestseller"
              checked={form.isBestseller}
              onChange={handleChange}
              style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }}
            />
            <span>Royal Bestseller</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.875rem' }}>
            <input
              type="checkbox"
              name="isChefSpecial"
              checked={form.isChefSpecial}
              onChange={handleChange}
              style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }}
            />
            <span>Chef's Dum Pick</span>
          </label>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--surface-border)' }}>
          <Link to="/admin/menu" className="btn-outline">Discard</Link>
          <button type="submit" className="btn-primary" style={{ padding: '0.75rem 2rem' }}>
            <Save size={16} />
            <span>Save Dish Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
};
