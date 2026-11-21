export default function SectionHeading({ eyebrow, title, text, center = false, dark = false }) {
  return (
    <div className={`section-head ${center ? 'center' : ''}`.trim()}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
      <div className="gold-rule" aria-hidden="true" />
    </div>
  );
}
