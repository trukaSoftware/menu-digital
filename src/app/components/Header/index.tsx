import Image from 'next/image';

import styles from './styles.module.css';

export default function Header() {
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
          <Image
            src="/images/logo-mock.webp"
            alt="Imagem do estabelecimento"
            fill
          />
        </div>
        <h1 className={styles.title}>Nome do Restaurante</h1>
      </div>
    </header>
  );
}
