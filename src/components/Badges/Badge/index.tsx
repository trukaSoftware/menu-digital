import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();
  return (
    <Link
      href={`${pathname}/${linkTo}`}
      className={`${styles.badge} ${isSelected ? `${styles.selected}` : ``}`}
      onClick={onClick}
    >
      {badgeName}
    </Link>
  );
}
