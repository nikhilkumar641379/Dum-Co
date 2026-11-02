import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusCircle, 
  Search, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  Flame, 
  Star 
} from 'lucide-react';
import { api } from '../../services/supabase';
import { DietBadge } from '../../components/ui/DietBadge';
import { SpiceMeter } from '../../components/ui/SpiceMeter';

export const AdminMenuPage = () => {
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchMenu = async () => {
    const items = await api.getFoodItems();
    const cats = await api.getCategories();
    setFoods(items);
    setCategories(cats);
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from the royal menu?`)) {
      await api.deleteFoodItem(id);
      await fetchMenu();
    }
  };

  const handleToggleAvailability = async (food) => {
    await api.saveFoodItem({
      ...food,
      isAvailable: food.isAvailable === false ? true : false
    });
    await fetchMenu();
  };

  const filteredFoods = foods.filter((f) => {
    if (selectedCat !== 'all' && f.category !== selectedCat) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      if (!f.name.toLowerCase().includes(q) && !f.description?.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Page Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', margin: '0 0 4px', color: 'var(--text-high)' }}>
            Menu Catalog Management
          </h1>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            Oversee active handi dishes, pricing, dietary indicators, and stock availability.
          </p>
        </div>

        <Link to="/admin/menu/add" className="btn-primary" style={{ padding: '0.625rem 1.25rem', fontSize: '0.875rem' }}>
          <PlusCircle size={16} />
          <span>Add New Handi Dish</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        backgroundColor: '#FFFFFF',
        padding: '1.25rem',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--surface-border)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
      }}>
        <div style={{ position: 'relative', minWidth: '280px', flex: 1 }}>
          <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search dishes by name or ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-dum"
            style={{ paddingLeft: '2.5rem' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          <button
            onClick={() => setSelectedCat('all')}
            className={`chip ${selectedCat === 'all' ? 'active' : ''}`}
            style={{ fontSize: '0.8125rem', padding: '0.45rem 1rem' }}
          >
            All Courses ({foods.length})
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCat(c.id)}
              className={`chip ${selectedCat === c.id ? 'active' : ''}`}
              style={{ fontSize: '0.8125rem', padding: '0.45rem 1rem' }}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Dishes Table */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--surface-border)',
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#FBF9F5', borderBottom: '1px solid var(--surface-border)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Dish Preview</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Course</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Base Price</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Spice & Diet</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Stock Availability</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFoods.map((food) => {
                const inStock = food.isAvailable !== false;
                return (
                  <tr key={food.id} style={{ borderBottom: '1px solid var(--surface-border)' }}>
                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img
                          src={food.image}
                          alt={food.name}
                          style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
                        />
                        <div>
                          <strong style={{ display: 'block', color: 'var(--text-high)' }}>{food.name}</strong>
                          <div style={{ display: 'flex', gap: '6px', marginTop: '2px' }}>
                            {food.isBestseller && (
                              <span style={{ fontSize: '0.625rem', backgroundColor: 'var(--secondary-glow)', color: 'var(--secondary)', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
                                Bestseller
                              </span>
                            )}
                            {food.isChefSpecial && (
                              <span style={{ fontSize: '0.625rem', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>
                                Chef Special
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td style={{ padding: '1rem 1.5rem', color: 'var(--text-muted)' }}>
                      {food.categoryName || food.category}
                    </td>

                    <td style={{ padding: '1rem 1.5rem', fontWeight: 700, fontSize: '0.9375rem' }}>
                      ₹{food.price}
                    </td>

                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <DietBadge type={food.dietary} />
                        <SpiceMeter level={food.spiceLevel} />
                      </div>
                    </td>

                    <td style={{ padding: '1rem 1.5rem' }}>
                      <button
                        onClick={() => handleToggleAvailability(food)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-full)',
                          border: 'none',
                          backgroundColor: inStock ? '#DCFCE7' : '#FEE2E2',
                          color: inStock ? '#15803D' : '#B91C1C',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        {inStock ? 'In Stock (Available)' : 'Sold Out (Hidden)'}
                      </button>
                    </td>

                    <td style={{ padding: '1rem 1.5rem' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <Link
                          to={`/admin/menu/edit/${food.id}`}
                          className="btn-outline"
                          style={{ padding: '6px 10px', fontSize: '0.75rem' }}
                          title="Edit Dish"
                        >
                          <Edit3 size={14} />
                          <span>Edit</span>
                        </Link>
                        <button
                          onClick={() => handleDelete(food.id, food.name)}
                          style={{
                            background: 'none',
                            border: '1px solid #FCA5A5',
                            color: '#DC2626',
                            padding: '6px 10px',
                            borderRadius: 'var(--radius-sm)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            fontSize: '0.75rem'
                          }}
                          title="Delete Dish"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
