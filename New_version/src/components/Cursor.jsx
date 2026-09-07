import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (!fine) return;

    document.body.classList.add('has-cursor');
    const d = dot.current;
    const r = ring.current;
    let x = 0;
    let y = 0;
    let rx = 0;
    let ry = 0;
    let raf = 0;

    const move = (event) => {
      x = event.clientX;
      y = event.clientY;
      d.style.transform = `translate(${x}px, ${y}px)`;

      const overLink = event.target.closest('a, button, [role="button"]');
      const overText = event.target.closest('h1, h2, h3, p, a, button, .type-line');
      r.classList.toggle('is-text', Boolean(overText) && !overLink);
      r.classList.toggle('is-hidden', Boolean(overLink));
      d.classList.toggle('is-hidden', Boolean(overLink));
    };

    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      r.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', move, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      document.body.classList.remove('has-cursor');
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dot} aria-hidden="true" />
      <div className="cursor-ring" ref={ring} aria-hidden="true" />
    </>
  );
}
