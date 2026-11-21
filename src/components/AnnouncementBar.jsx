import { useState } from 'react';

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div className="announcement" role="status">
      <div className="container">
        <span>Make Every Celebration Memorable | Discover Our Exclusive Gift Collections</span>
        <button type="button" aria-label="Dismiss announcement" onClick={() => setVisible(false)}>×</button>
      </div>
    </div>
  );
}
