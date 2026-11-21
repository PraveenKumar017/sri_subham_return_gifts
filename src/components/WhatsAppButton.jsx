import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { generalEnquiry, hasWhatsAppNumber } from '../utils/whatsapp';

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!hasWhatsAppNumber()) return null;
  return (
    <a href={generalEnquiry()} className={`whatsapp-float ${visible ? '' : 'hidden'}`} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
      <MessageCircle size={24} />
    </a>
  );
}
