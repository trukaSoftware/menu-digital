import Link from 'next/link';

import styles from './styles.module.css';

export interface BadgeProps {
  linkTo: string;
  badgeName: string;
  onClick?: () => void;
  isSelected: boolean;
}

export default function Badge({
  linkTo,
  badgeName,
  onClick,
  isSelected,
}: BadgeProps) {
  return (
    <Link
      href={linkTo}
      className={`${styles.badge} ${isSelected ? `${styles.selected}` : ``}`}
      onClick={onClick}
    >
      {badgeName}
    </Link>
  );
}
