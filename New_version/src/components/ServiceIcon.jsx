const icons = {
  design: 'fa-pen-nib',
  code: 'fa-laptop-code',
  cloud: 'fa-cloud',
  growth: 'fa-chart-line'
};

export default function ServiceIcon({ name }) {
  const icon = name?.startsWith('fa-') ? name : (icons[name] || icons.code);
  return (
    <span className="icon-tile">
      <i className={`fa-solid ${icon}`} aria-hidden="true" />
    </span>
  );
}
