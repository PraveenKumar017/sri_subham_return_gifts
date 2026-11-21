export const easeOut = [0.22, 1, 0.36, 1];

export const reveal = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOut } }
};

export const heroReveal = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: easeOut } }
};

export const viewportOnce = { once: true, margin: '-80px' };
