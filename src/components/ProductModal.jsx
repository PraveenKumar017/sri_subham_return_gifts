import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { formatPrice, availabilityLabel } from '../utils/format';
import { hasWhatsAppNumber, productEnquiry } from '../utils/whatsapp';

export default function ProductModal({ product, onClose }) {
  const [index, setIndex] = useState(0);
  const closeRef = useRef(null);
  const lastFocus = useRef(null);
  const images = product?.gallery?.length ? product.gallery : [product?.image].filter(Boolean);

  useEffect(() => {
    if (!product) return;
    lastFocus.current = document.activeElement;
    closeRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab') {
        const focusable = document.querySelectorAll('.modal button, .modal a[href]');
        if (!focusable.length) return;
        const first = focusable[0]; const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; lastFocus.current?.focus?.(); };
  }, [product, onClose]);

  useEffect(() => { setIndex(0); }, [product?.id]);
  if (!product) return null;

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={product.name} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button ref={closeRef} type="button" className="modal-close" aria-label="Close details" onClick={onClose}><X size={20} /></button>
        <div className="modal-grid">
          <div className="modal-gallery">
            <div className="modal-main-img">
              <img src={images[index]} alt={product.name} width="800" height="1000" />
              {images.length > 1 && <>
                <button type="button" className="gallery-nav prev" aria-label="Previous image" onClick={prev}><ChevronLeft size={18} /></button>
                <button type="button" className="gallery-nav next" aria-label="Next image" onClick={next}><ChevronRight size={18} /></button>
              </>}
            </div>
            {images.length > 1 && (
              <div className="gallery-thumbs">
                {images.map((img, i) => (
                  <button key={img + i} type="button" className={i === index ? 'active' : ''} aria-label={`View image ${i + 1}`} onClick={() => setIndex(i)}>
                    <img src={img} alt="" width="64" height="80" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="modal-content">
            <div className="product-category">{product.category}</div>
            <h2>{product.name}</h2>
            <div className="modal-price">{formatPrice(product.price)}</div>
            <p className="modal-desc">{product.description}</p>
            <dl className="detail-list">
              {product.size && <div><dt>Size</dt><dd>{product.size}</dd></div>}
              {product.material && <div><dt>Material</dt><dd>{product.material}</dd></div>}
              {product.designs && <div><dt>Available designs</dt><dd>{product.designs}</dd></div>}
              <div><dt>Availability</dt><dd>{availabilityLabel(product.availability)}</dd></div>
            </dl>
            {hasWhatsAppNumber() && <a className="btn btn-primary" href={productEnquiry(product.name)} target="_blank" rel="noopener noreferrer">Enquire on WhatsApp</a>}
          </div>
        </div>
      </div>
    </div>
  );
}

