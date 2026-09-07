import { useEffect, useState } from 'react';
import { useLanguage } from '../LanguageContext.jsx';

export default function TypeLine() {
  const { copy } = useLanguage();
  const phrases = copy.typePhrases;
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setIndex(0);
    setText('');
    setDeleting(false);
  }, [phrases]);

  useEffect(() => {
    const current = phrases[index] || '';
    const done = text === current;
    const empty = text.length === 0;
    let wait = deleting ? 42 : 68;

    if (!deleting && done) wait = 1600;
    if (deleting && empty) wait = 220;

    const timer = setTimeout(() => {
      if (!deleting && !done) {
        setText(current.slice(0, text.length + 1));
        return;
      }
      if (!deleting && done) {
        setDeleting(true);
        return;
      }
      if (deleting && !empty) {
        setText(current.slice(0, text.length - 1));
        return;
      }
      setDeleting(false);
      setIndex((value) => (value + 1) % phrases.length);
    }, wait);

    return () => clearTimeout(timer);
  }, [text, deleting, index, phrases]);

  return (
    <span className="type-line">
      {text}
      <span className="type-caret" />
    </span>
  );
}
