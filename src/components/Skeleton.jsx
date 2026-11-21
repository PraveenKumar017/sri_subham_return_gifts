export function ProductSkeleton() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-img" />
      <div className="skeleton-line" />
      <div className="skeleton-line short" />
      <div className="skeleton-line short" />
    </div>
  );
}
