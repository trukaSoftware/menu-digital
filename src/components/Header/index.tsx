import { FaInstagram } from 'react-icons/fa6';

import Image from 'next/image';
import Link from 'next/link';

import Badges from '../Badges';
import styles from './styles.module.css';

interface HeaderProps {
  companyName: string;
  companyImage: string;
  companyThemeUrl: string;
  companyCategories: string[];
  openingHours: string;
  instagramUrl: string | undefined;
}

export default function Header({
  companyName,
  companyImage,
  companyThemeUrl,
  companyCategories,
  openingHours,
  instagramUrl,
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.themeContainer}>
        <Image
          src={companyThemeUrl || `/images/theme-image-mock.webp`}
          alt="Image tema do estabelecimento"
          fill
        />
      </div>

      <div className={styles.imageAndTitleContainer}>
        <div className={styles.imageContainer}>
          <Image src={companyImage} alt="Imagem do estabelecimento" fill />
        </div>
        <h1 className={styles.title}>{companyName}</h1>
      </div>
      <div className={styles.functioningHoursAndSocias}>
        <h2>{openingHours}</h2>
        {instagramUrl ? (
          <div>
            <Link href={instagramUrl} target="_blank" rel="noopener noreferrer">
              <FaInstagram size={24} />
            </Link>
          </div>
        ) : null}
      </div>
      <Badges badges={companyCategories} />
    </header>
  );
}
