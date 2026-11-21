import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CategoryCard({ category }) {
  return (
    <Link to={`/shop?category=${category.slug}`} className="category-card">
      <div className="category-img">
        <img src={category.image} alt={category.name} loading="lazy" width="800" height="1000" />
      </div>
      <div className="category-body">
        <h3>{category.name}</h3>
        <p>{category.description}</p>
        <span className="text-link">Explore collection <ArrowRight size={14} /></span>
      </div>
    </Link>
  );
}
