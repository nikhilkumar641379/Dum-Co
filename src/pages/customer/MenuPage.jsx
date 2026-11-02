import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Sparkles, X } from 'lucide-react';
import { api } from '../../services/supabase';
import { FoodCard } from '../../components/customer/FoodCard';
import { DietBadge } from '../../components/ui/DietBadge';

export const MenuPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [categories, setCategories] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [dietaryFilter, setDietaryFilter] = useState('all'); // 'all', 'veg', 'non-veg'
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-asc', 'price-desc', 'rating'

  useEffect(() => {
    const fetchData = async () => {
      const cats = await api.getCategories();
      const foods = await api.getFoodItems();
      setCategories(cats);
      setFoodItems(foods);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  const handleCategoryChange = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  // Filter and Sort Logic
  const filteredItems = foodItems
    .filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      // Dietary filter
      if (dietaryFilter !== 'all' && item.dietary !== dietaryFilter) return false;
      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesIng = item.ingredients?.some(ing => ing.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesIng) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // default featured
    });

  return (
    <div className="animate-fade-in" style={{ padding: '3.5rem 0 5rem' }}>
      <div className="container-custom">
        {/* Page Title & Breadcrumb */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 2.5rem' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--secondary)' }}>
            THE ROYAL FEAST CATALOG
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginTop: '6px', marginBottom: '0.75rem' }}>
            Artisanal Dum Kitchen Menu
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
            Each dish is prepared to order using slow-dum cooking techniques in natural earthenware handis.
          </p>
        </div>

        {/* Search & Sort Controls Bar */}
        <div style={{
          backgroundColor: 'var(--surface-raised)',
          padding: '1.25rem',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--surface-border)',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          {/* Search Box */}
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <Search size={18} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search dishes, spices, ingredients (e.g. Biryani, Saffron, Paneer)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-dum"
              style={{ paddingLeft: '2.5rem' }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Dietary Filters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => setDietaryFilter('all')}
              className={`chip ${dietaryFilter === 'all' ? 'active' : ''}`}
            >
              All Types
            </button>
            <button
              onClick={() => setDietaryFilter('veg')}
              className={`chip ${dietaryFilter === 'veg' ? 'active' : ''}`}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <DietBadge type="veg" />
              <span>Veg Only</span>
            </button>
            <button
              onClick={() => setDietaryFilter('non-veg')}
              className={`chip ${dietaryFilter === 'non-veg' ? 'active' : ''}`}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <DietBadge type="non-veg" />
              <span>Non-Veg</span>
            </button>
          </div>

          {/* Sort Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 600 }}>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-dum"
              style={{ width: 'auto', padding: '0.5rem 1rem', fontSize: '0.875rem', cursor: 'pointer' }}
            >
              <option value="featured">Royal Curations</option>
              <option value="rating">Highest Rated ★</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Pills Rail */}
        <div style={{
          display: 'flex',
          gap: '10px',
          overflowX: 'auto',
          paddingBottom: '1rem',
          marginBottom: '2.5rem',
          scrollbarWidth: 'none'
        }}>
          <button
            onClick={() => handleCategoryChange('all')}
            className={`chip ${selectedCategory === 'all' ? 'active' : ''}`}
            style={{ padding: '0.625rem 1.25rem', fontSize: '0.9375rem', whiteSpace: 'nowrap' }}
          >
            All Courses ({foodItems.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`chip ${selectedCategory === cat.id ? 'active' : ''}`}
              style={{ padding: '0.625rem 1.25rem', fontSize: '0.9375rem', whiteSpace: 'nowrap' }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Results Counter Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          <span>Showing <strong>{filteredItems.length}</strong> handcrafted dishes</span>
          {(searchQuery || dietaryFilter !== 'all' || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setDietaryFilter('all');
                handleCategoryChange('all');
              }}
              style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600, fontSize: '0.8125rem' }}
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Food Grid */}
        {filteredItems.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 1rem',
            backgroundColor: 'var(--surface-raised)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--surface-border)'
          }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No Royal Dishes Matched</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Try adjusting your dietary filter or search for other signature ingredients like Biryani, Paneer, or Korma.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setDietaryFilter('all');
                handleCategoryChange('all');
              }}
              className="btn-primary"
            >
              View Full Menu
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
            gap: '2rem'
          }}>
            {filteredItems.map((food) => (
              <FoodCard key={food.id} food={food} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
