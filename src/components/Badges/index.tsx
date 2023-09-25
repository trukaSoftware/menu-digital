'use client';

import { useState } from 'react';

import Badge from './Badge';
import styles from './styles.module.css';

export interface BadgesProps {
  badges: string[];
}

export default function Badges({ badges }: BadgesProps) {
  const [selectedBadge, setSelectedBadge] = useState(``);

  return (
    <nav className={styles.badges}>
      {badges.map((badge, index) => (
        <Badge
          key={`${++index}-${badge}-${Math.random() * 10000}`}
          badgeName={badge}
          linkTo={`#${badge}`}
          onClick={() => setSelectedBadge(badge)}
          isSelected={selectedBadge === badge}
        />
      ))}
    </nav>
  );
}
