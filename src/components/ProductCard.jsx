import { formatPrice } from '../utils/format';
import { hasWhatsAppNumber, productEnquiry } from '../utils/whatsapp';

export default function ProductCard({ product, onView }) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img src={product.image} alt={product.name} loading="lazy" width="800" height="1000" />
      </div>
      <div className="product-body">
        <div className="product-category">{product.category}</div>
        <h3 className="product-name">{product.name}</h3>
        {product.size && <div className="product-meta">{product.size}</div>}
        <div className="product-price">{formatPrice(product.price)}</div>
      </div>
      <div className="card-actions">
        <button type="button" className="btn btn-secondary btn-sm" onClick={() => onView(product)}>View details</button>
        {hasWhatsAppNumber() ? (
          <a className="btn btn-primary btn-sm" href={productEnquiry(product.name)} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        ) : <span />}
      </div>
    </article>
  );
}

