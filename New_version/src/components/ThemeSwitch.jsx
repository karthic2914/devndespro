import { useLanguage } from '../LanguageContext.jsx';
import { useTheme } from '../ThemeContext.jsx';

export default function ThemeSwitch({ className = '' }) {
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const dark = theme === 'dark';

  return (
    <button
      type="button"
      className={`theme-btn ${className}`.trim()}
      aria-label={t(dark ? 'theme.toLight' : 'theme.toDark')}
      aria-pressed={dark}
      onClick={toggleTheme}
    >
      <i className={dark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'} aria-hidden="true" />
    </button>
  );
}
