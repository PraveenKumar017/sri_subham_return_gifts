import { Link } from 'react-router-dom';
import { Instagram, MessageCircle } from 'lucide-react';
import { categories } from '../data/catalog';
import { generalEnquiry, hasWhatsAppNumber } from '../utils/whatsapp';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="brand" style={{ color: 'var(--ivory)' }}>
            <img src="/favicon.svg" alt="" width="44" height="44" />
            <div>Sri Subham <small style={{ color: 'rgba(255,248,238,.72)' }}>Memories that last forever</small></div>
          </div>
          <p>Thoughtfully curated return gifts for celebrations that deserve something special.</p>
          <div className="socials">
            {hasWhatsAppNumber() && <a href={generalEnquiry()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><MessageCircle size={18} /></a>}
            <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
          </div>
        </div>
        <div>
          <h4>Navigate</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><a href="/#about">About</a></li>
            <li><a href="/#contact">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4>Categories</h4>
          <ul>
            {categories.slice(0, 8).map((c) => <li key={c.id}><Link to={`/shop?category=${c.slug}`}>{c.name}</Link></li>)}
          </ul>
        </div>
        <div>
          <h4>More Categories</h4>
          <ul>
            {categories.slice(8).map((c) => <li key={c.id}><Link to={`/shop?category=${c.slug}`}>{c.name}</Link></li>)}
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">© {year} Sri Subham Return Gifts. All rights reserved.</div>
    </footer>
  );
}
