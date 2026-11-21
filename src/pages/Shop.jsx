import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta';
import SectionHeading from '../components/SectionHeading';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { ProductSkeleton } from '../components/Skeleton';
import { categories, occasions, products } from '../data/catalog';

const PAGE_SIZE = 12;

const parseList = (v) => (v ? v.split(',').map((s) => s.trim()).filter(Boolean) : []);

export default function Shop({ addToCart }) {
  usePageMeta('Shop Return Gifts | Sri Subham Return Gifts', 'Explore thoughtfully selected return gifts by category, occasion, and price.');
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState(params.get('search') || '');
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const searchRef = useRef(null);

  const selectedCategories = parseList(params.get('category'));
  const selectedOccasion = params.get('occasion') || '';
  const minPrice = params.get('minPrice') || '';
  const maxPrice = params.get('maxPrice') || '';
  const sort = params.get('sort') || 'featured';
  const productSlug = params.get('product') || '';

  useEffect(() => { setSearch(params.get('search') || ''); }, [params]);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(t);
  }, [search]);
  useEffect(() => {
    if (params.get('focus') === 'search') searchRef.current?.focus();
  }, [params]);
  useEffect(() => { setLoading(true); const t = setTimeout(() => setLoading(false), 180); return () => clearTimeout(t); }, [debouncedSearch, selectedCategories.join(','), selectedOccasion, minPrice, maxPrice, sort]);
  useEffect(() => { setVisibleCount(PAGE_SIZE); }, [debouncedSearch, selectedCategories.join(','), selectedOccasion, minPrice, maxPrice, sort]);

  const updateParams = (patch) => {
    const next = new URLSearchParams(params);
    Object.entries(patch).forEach(([k, v]) => {
      if (v === '' || v === null || v === undefined || (Array.isArray(v) && !v.length)) next.delete(k);
      else next.set(k, Array.isArray(v) ? v.join(',') : v);
    });
    if (patch.focus !== 'search') next.delete('focus');
    setParams(next, { replace: true });
  };

  const toggleCategory = (slug) => {
    if (!slug) return updateParams({ category: [] });
    const has = selectedCategories.includes(slug);
    const next = has ? selectedCategories.filter((s) => s !== slug) : [...selectedCategories, slug];
    updateParams({ category: next });
  };

  const filtered = useMemo(() => {
    let list = [...products];
    if (selectedCategories.length) list = list.filter((p) => selectedCategories.includes(p.categorySlug));
    if (selectedOccasion) list = list.filter((p) => p.occasions.includes(selectedOccasion));
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    const min = minPrice !== '' ? Number(minPrice) : null;
    const max = maxPrice !== '' ? Number(maxPrice) : null;
    if (min !== null && !Number.isNaN(min)) list = list.filter((p) => p.price !== null && p.price >= min);
    if (max !== null && !Number.isNaN(max)) list = list.filter((p) => p.price !== null && p.price <= max);

    const byPriceAsc = (a, b) => (a.price === null ? 1 : b.price === null ? -1 : a.price - b.price);
    const byPriceDesc = (a, b) => (a.price === null ? 1 : b.price === null ? -1 : b.price - a.price);
    if (sort === 'price_asc') list.sort(byPriceAsc);
    else if (sort === 'price_desc') list.sort(byPriceDesc);
    else if (sort === 'newest') list.sort((a, b) => b.id - a.id);
    else list.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured) || a.id - b.id);
    return list;
  }, [debouncedSearch, selectedCategories, selectedOccasion, minPrice, maxPrice, sort]);

  const visible = filtered.slice(0, visibleCount);
  const selectedProduct = products.find((p) => p.slug === productSlug) || null;
  const hasPrice = products.some((p) => p.price !== null);

  const clearFilters = () => {
    setSearch('');
    setParams(new URLSearchParams(), { replace: true });
  };

  const openProduct = (p) => updateParams({ product: p.slug });
  const closeProduct = () => { const n = new URLSearchParams(params); n.delete('product'); setParams(n, { replace: true }); };

  return (
    <main id="main-content">
      <section className="shop-hero">
        <div className="container">
          <h1>Explore Our Gift Collections</h1>
          <p>Discover thoughtfully selected return gifts for every celebration and special occasion.</p>
        </div>
      </section>

      <div className="container shop-layout">
        <aside className="shop-sidebar" aria-label="Category filters">
          <h2>Categories</h2>
          <div className="category-list">
            <button type="button" className={!selectedCategories.length ? 'active' : ''} onClick={() => toggleCategory('')}>All</button>
            {categories.map((c) => (
              <button key={c.id} type="button" className={selectedCategories.includes(c.slug) ? 'active' : ''} onClick={() => toggleCategory(c.slug)}>{c.name}</button>
            ))}
          </div>
        </aside>

        <section aria-label="Products">
          <div className="chip-bar" aria-label="Category filters">
            <button type="button" className={`chip ${!selectedCategories.length ? 'active' : ''}`} onClick={() => toggleCategory('')}>All</button>
            {categories.map((c) => (
              <button key={c.id} type="button" className={`chip ${selectedCategories.includes(c.slug) ? 'active' : ''}`} onClick={() => toggleCategory(c.slug)}>{c.name}</button>
            ))}
          </div>

          <div className="shop-toolbar">
            <div className="field">
              <label htmlFor="search">Search</label>
              <input ref={searchRef} id="search" value={search} onChange={(e) => { setSearch(e.target.value); updateParams({ search: e.target.value }); }} placeholder="Search by product name" />
            </div>
            <div className="field">
              <label htmlFor="occasion">Occasion</label>
              <select id="occasion" value={selectedOccasion} onChange={(e) => updateParams({ occasion: e.target.value })}>
                <option value="">All occasions</option>
                {occasions.map((o) => <option key={o.id} value={o.slug}>{o.name}</option>)}
              </select>
            </div>
            {hasPrice && <>
              <div className="field"><label htmlFor="minPrice">Min price</label><input id="minPrice" type="number" min="0" value={minPrice} onChange={(e) => updateParams({ minPrice: e.target.value })} /></div>
              <div className="field"><label htmlFor="maxPrice">Max price</label><input id="maxPrice" type="number" min="0" value={maxPrice} onChange={(e) => updateParams({ maxPrice: e.target.value })} /></div>
            </>}
            <div className="field">
              <label htmlFor="sort">Sort</label>
              <select id="sort" value={sort} onChange={(e) => updateParams({ sort: e.target.value })}>
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price_asc">Price low to high</option>
                <option value="price_desc">Price high to low</option>
              </select>
            </div>
            <button type="button" className="btn btn-secondary btn-sm" onClick={clearFilters}>Clear filters</button>
          </div>

          <div className="shop-meta">
            <span>{filtered.length} product{filtered.length !== 1 ? 's' : ''}</span>
          </div>

          {loading ? (
            <div className="products-grid">{Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)}</div>
          ) : filtered.length ? (
            <>
              <div className="products-grid">
                {visible.map((p) => <ProductCard key={p.id} product={p} onView={openProduct} onAddToCart={addToCart} />)}
              </div>
              {visibleCount < filtered.length && (
                <div className="load-more-wrap">
                  <button type="button" className="btn btn-secondary" onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}>Load more</button>
                </div>
              )}
            </>
          ) : (
            <div className="empty-state">
              <h3>No gifts match your filters</h3>
              <p>Try adjusting your search or clearing filters to see more products.</p>
              <button type="button" className="btn btn-primary" onClick={clearFilters}>Clear filters</button>
            </div>
          )}
        </section>
      </div>

      <ProductModal product={selectedProduct} onClose={closeProduct} onAddToCart={addToCart} />
    </main>
  );
}
