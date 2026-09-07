'use client';

import { useEffect, useState } from 'react';

import { HERO_WORDS } from '../../data/content';
import styles from './hero.module.css';

/** Static h1 lead-in with a rotating trade underneath it. */
export function HeroHeadline() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % HERO_WORDS.length), 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <h1 className="text-[2.6rem] leading-[1.24] font-black tracking-tight text-balance sm:text-6xl">
      ابزار بادی حرفه‌ای برای
      <span className="mt-1 block h-[1.3em] overflow-hidden">
        <span key={index} className={`${styles.word} text-brand-600`}>
          {HERO_WORDS[index]}
        </span>
      </span>
    </h1>
  );
}
