export default function SectionHead({ eyebrow, title, text }) {
  return (
    <div className="section-head">
      <span className="pill">{eyebrow}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}
