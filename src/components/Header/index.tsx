import Image from 'next/image';

import Badges from '../Badges';
import styles from './styles.module.css';

interface HeaderProps {
  companyName: string;
  companyImage: string;
  companyCategories: string[];
}

export default function Header({
  companyName,
  companyImage,
  companyCategories,
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.themeContainer}>
        <Image
          src="/images/theme-image-mock.webp"
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
      <Badges badges={companyCategories} />
    </header>
  );
}
