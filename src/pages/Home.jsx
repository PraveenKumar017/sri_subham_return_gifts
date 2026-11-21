import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gift, Sparkles, CalendarHeart, PartyPopper } from 'lucide-react';
import usePageMeta from '../hooks/usePageMeta';
import useReducedMotion from '../hooks/useReducedMotion';
import SectionHeading from '../components/SectionHeading';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { categories, occasions, products } from '../data/catalog';
import { featuredCollections } from '../data/collections';
import { reveal, heroReveal, viewportOnce } from '../utils/motion';
import { bulkEnquiry, hasWhatsAppNumber } from '../utils/whatsapp';
import { useState } from 'react';

const whyItems = [
  { icon: Gift, title: 'Thoughtfully Selected Gifts', text: 'Carefully chosen gifts that suit meaningful celebrations.' },
  { icon: Sparkles, title: 'Elegant Gift Collections', text: 'A refined range of traditional and useful gifting options.' },
  { icon: CalendarHeart, title: 'Gifts for Every Occasion', text: 'Collections suited for weddings, festivals, and personal milestones.' },
  { icon: PartyPopper, title: 'Memorable Celebrations', text: 'Return gifts designed to leave a warm, lasting impression.' }
];

export default function Home({ addToCart }) {
  usePageMeta('Sri Subham Return Gifts | Memories that last forever', 'Thoughtfully curated return gifts for weddings, engagements, birthdays, baby showers, festivals and special occasions.');
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState(null);
  const featured = products.filter((p) => p.isFeatured).slice(0, 8);
  const v = reduce ? {} : reveal;
  const vp = reduce ? {} : viewportOnce;
  const hv = reduce ? {} : heroReveal;

  return (
    <main id="main-content">
      <section className="hero">
        <picture className="hero-media">
          <source media="(max-width: 768px)" srcSet="/images/hero_image_bg_mobile_view.jpg" />
          <img src="/images/hero_bg_image.jpeg" alt="" fetchPriority="high" />
        </picture>
        <div className="container">
          <motion.div className="hero-content" initial="hidden" animate="visible" variants={hv}>
            <span className="eyebrow">Sri Subham Return Gifts</span>
            <h1>Gifts That Make Every Moment Memorable</h1>
            <p>Thoughtfully curated return gifts that bring joy, elegance, and lasting memories to every celebration.</p>
            <div className="hero-actions">
              <Link to="/shop" className="btn btn-primary">Explore Collections</Link>
              {hasWhatsAppNumber() && <a href={bulkEnquiry()} className="btn btn-secondary on-dark" target="_blank" rel="noopener noreferrer">Enquire on WhatsApp</a>}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="about" className="section">
        <div className="container intro-grid">
          <div className="intro-image">
            <img src="/images/about.svg" alt="Elegant return gift presentation" loading="lazy" width="800" height="1000" />
          </div>
          <motion.div className="intro-copy" initial="hidden" whileInView="visible" viewport={vp} variants={v}>
            <span className="eyebrow">Our Story</span>
            <h2>Every Gift Tells a Beautiful Story</h2>
            <div className="gold-rule" aria-hidden="true" />
            <p>At Sri Subham Return Gifts, we believe every celebration deserves something special. Discover thoughtfully selected gifts that turn precious occasions into unforgettable memories.</p>
          </motion.div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={v}>
            <SectionHeading eyebrow="Browse" title="Shop by Category" text="Explore our complete range of return gift categories for every celebration." center />
          </motion.div>
          <div className="category-grid">
            {categories.map((c) => <CategoryCard key={c.id} category={c} />)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={v}>
            <SectionHeading eyebrow="Curated" title="Featured Collections" text="Handpicked collections designed for meaningful gifting moments." center />
          </motion.div>
          <div className="collections-grid">
            {featuredCollections.map((item) => (
              <Link key={item.title} to={item.to} className={`collection-card ${item.large ? 'large' : ''}`}>
                <img src={item.image} alt="" loading="lazy" width="1000" height="1200" />
                <div className="collection-content">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={v}>
            <SectionHeading eyebrow="Favourites" title="Customer Favourites" text="Popular gift choices selected for their charm and usefulness." center />
          </motion.div>
          <div className="products-grid">
            {featured.map((p) => <ProductCard key={p.id} product={p} onView={setSelected} onAddToCart={addToCart} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/shop" className="btn btn-secondary">View all products</Link>
          </div>
        </div>
      </section>

      <section className="section section-dark">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={v}>
            <SectionHeading eyebrow="Why Choose Us" title="Why Choose Sri Subham?" center />
          </motion.div>
          <div className="feature-blocks">
            {whyItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="feature-block">
                  <Icon className="feature-icon" size={28} strokeWidth={1.5} />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={v}>
            <SectionHeading eyebrow="Occasions" title="Shop by Occasion" text="Find return gifts suited to the moments you are celebrating." center />
          </motion.div>
          <div className="occasion-grid">
            {occasions.map((o) => (
              <Link key={o.id} to={`/shop?occasion=${o.slug}`} className="occasion-card">
                <img src={o.image} alt="" loading="lazy" width="800" height="1000" />
                <span>{o.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-band">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={v}>
            <span className="eyebrow">Get Started</span>
            <h2>Make Your Special Moments Even More Special</h2>
            <p>Discover beautiful gifts for every celebration with Sri Subham.</p>
            <div className="cta-actions">
              <Link to="/shop" className="btn btn-primary">Explore Our Collection</Link>
              {hasWhatsAppNumber() && <a href={bulkEnquiry()} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">Bulk Gifting Enquiry</a>}
            </div>
          </motion.div>
        </div>
      </section>

      <ProductModal product={selected} onClose={() => setSelected(null)} onAddToCart={addToCart} />
    </main>
  );
}
