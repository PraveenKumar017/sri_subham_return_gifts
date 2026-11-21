import { formatPrice } from '../utils/format';

export default function ProductCard({ product, onView, onAddToCart }) {
  return (
    <article className="product-card">
      <button type="button" className="product-image-wrap product-image-btn" onClick={() => onView(product)} aria-label={`View ${product.name}`}>
        <img src={product.image} alt={product.name} loading="lazy" width="800" height="1000" />
      </button>
      <div className="product-body">
        <div className="product-category">{product.category}</div>
        <h3 className="product-name"><button type="button" className="product-name-btn" onClick={() => onView(product)}>{product.name}</button></h3>
        {product.size && <div className="product-meta">{product.size}</div>}
        <div className="product-price">{formatPrice(product.price)}</div>
      </div>
      <div className="card-actions">
        <button type="button" className="btn btn-primary btn-sm" onClick={() => onAddToCart?.(product)}>Add to cart</button>
      </div>
    </article>
  );
}

