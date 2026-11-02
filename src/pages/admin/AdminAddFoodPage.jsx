import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Trash2, Sparkles, Image as ImageIcon } from 'lucide-react';
import { api } from '../../services/supabase';

export const AdminAddFoodPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    name: '',
    category: 'cat-biryani',
    price: 495,
    dietary: 'veg',
    spiceLevel: 2,
    prepTime: '25 mins',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    description: '',
    ingredientsStr: 'Aged Basmati, Saffron, Desi Ghee, Rosewater, Potli Spices',
    isBestseller: false,
    isChefSpecial: false,
    portions: [
      { name: 'Regular Handi (Serves 1-2)', price: 495 },
      { name: 'Royal Feast Handi (Serves 3-4)', price: 895 }
    ]
  });

  useEffect(() => {
    const fetchCats = async () => {
      const cats = await api.getCategories();
      setCategories(cats);
    };
    fetchCats();
  }, []);

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

    const newFood = {
      ...form,
      price: Number(form.price),
      spiceLevel: Number(form.spiceLevel),
      categoryName: catObj ? catObj.name : 'Dum Specials',
      ingredients: ingredientsArray,
      isAvailable: true
    };

    await api.saveFoodItem(newFood);
    navigate('/admin/menu');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '840px' }}>
      {/* Top Header */}
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
          Add New Dum Dish to Menu
        </h1>
        <p style={{ margin: '4px 0 0', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Configure dish pricing, high-res presentation photo, portion sizes, and aromatics.
        </p>
      </div>

      {/* Main Form */}
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
        {/* Name and Course */}
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
              placeholder="e.g. Rampuri Gosht Dum Biryani"
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

        {/* Price, Dietary, Spice, Prep Time */}
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
              <option value="0">0 - Zero Spice (Mithai/Drinks)</option>
              <option value="1">1 - Mild & Fragrant</option>
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
              placeholder="e.g. 30 mins"
            />
          </div>
        </div>

        {/* High-res Image URL & Live Preview */}
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
              placeholder="https://images.unsplash.com/photo-..."
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

        {/* Description */}
        <div>
          <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Culinary Narrative & Description *</label>
          <textarea
            name="description"
            required
            rows={3}
            value={form.description}
            onChange={handleChange}
            className="input-dum"
            placeholder="Describe the marination, handi preparation, aroma, and royal heritage..."
          />
        </div>

        {/* Key Aromatics & Ingredients */}
        <div>
          <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '6px' }}>Ingredients & Potli Spices (Comma Separated)</label>
          <input
            type="text"
            name="ingredientsStr"
            value={form.ingredientsStr}
            onChange={handleChange}
            className="input-dum"
          />
        </div>

        {/* Portions & Sizes */}
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
                  placeholder="Portion description (e.g. Regular Handi 1-2)"
                  style={{ flex: 2 }}
                />
                <input
                  type="number"
                  value={portion.price}
                  onChange={(e) => handlePortionChange(idx, 'price', e.target.value)}
                  className="input-dum"
                  placeholder="Price"
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

        {/* Bestseller & Chef Special Checkboxes */}
        <div style={{ display: 'flex', gap: '2rem', padding: '1rem', backgroundColor: 'var(--surface-subdued)', borderRadius: 'var(--radius-md)' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.875rem' }}>
            <input
              type="checkbox"
              name="isBestseller"
              checked={form.isBestseller}
              onChange={handleChange}
              style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }}
            />
            <span>Feature as <strong>Royal Bestseller</strong></span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.875rem' }}>
            <input
              type="checkbox"
              name="isChefSpecial"
              checked={form.isChefSpecial}
              onChange={handleChange}
              style={{ accentColor: 'var(--primary)', width: '16px', height: '16px' }}
            />
            <span>Mark as <strong>Chef's Dum Masterpiece</strong></span>
          </label>
        </div>

        {/* Submit Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--surface-border)' }}>
          <Link to="/admin/menu" className="btn-outline">Cancel</Link>
          <button type="submit" className="btn-primary" style={{ padding: '0.75rem 2rem' }}>
            <Save size={16} />
            <span>Publish Dish to Menu</span>
          </button>
        </div>
      </form>
    </div>
  );
};
