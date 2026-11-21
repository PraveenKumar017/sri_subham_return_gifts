import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Search, X, MessageCircle } from 'lucide-react';
import { generalEnquiry, hasWhatsAppNumber } from '../utils/whatsapp';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const solid = !isHome || scrolled || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!isHome) { setActiveHash(''); return; }
    const ids = ['about', 'contact'];
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActiveHash(e.target.id); });
    }, { rootMargin: '-30% 0px -60% 0px' });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [isHome, location.pathname]);

  const goSearch = () => { navigate('/shop?focus=search'); setOpen(false); };
  const navClass = ({ isActive }) => `nav-link ${isActive ? 'active' : ''}`;
  const hashClass = (id) => `nav-link ${isHome && activeHash === id ? 'active' : ''}`;

  return (
    <div className={`site-top ${solid ? 'solid' : 'transparent'} ${isHome ? 'home' : ''}`.trim()}>
      <header className={`site-header ${solid ? 'solid' : 'transparent'}`}>
        <div className="container header-inner">
          <Link className="brand" to="/" aria-label="Sri Subham Return Gifts home">
            <img src="/images/subham_return_gifts_logo.png" alt="Sri Subham Return Gifts" />
            <div>Sri Subham <small>Memories that last forever</small></div>
          </Link>
          <nav className="nav-desktop" aria-label="Primary">
            <NavLink to="/" end className={navClass}>Home</NavLink>
            <NavLink to="/shop" className={navClass}>Shop</NavLink>
            <a href="/#about" className={hashClass('about')}>About</a>
            <a href="/#contact" className={hashClass('contact')}>Contact</a>
          </nav>
          <div className="header-actions">
            <button type="button" className="icon-btn" aria-label="Search products" onClick={goSearch}><Search size={20} /></button>
            {hasWhatsAppNumber() && <a className="icon-btn" href={generalEnquiry()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp enquiry"><MessageCircle size={20} /></a>}
            <button type="button" className="icon-btn mobile-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {open && (
          <div className="mobile-menu">
            <nav className="container" aria-label="Mobile">
              <NavLink to="/" end className={navClass}>Home</NavLink>
              <NavLink to="/shop" className={navClass}>Shop</NavLink>
              <a href="/#about" className={hashClass('about')}>About</a>
              <a href="/#contact" className={hashClass('contact')}>Contact</a>
            </nav>
          </div>
        )}
      </header>
    </div>
  );
}

