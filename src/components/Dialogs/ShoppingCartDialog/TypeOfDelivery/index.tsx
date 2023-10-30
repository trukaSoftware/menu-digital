import styles from './styles.module.css';

export default function TypeOfDelivery() {
  return (
    <div className={styles.typeOfDeliveryWrapper}>
      <h2>Escolha o tipo de entrega</h2>
      <div className={styles.typeOfDeliveryCheckboxesWrapper}>
        <label htmlFor="pickup">
          <input id="pickup" type="radio" name="typeOfDelivery" />
          Retirada
        </label>
        <label htmlFor="delivery">
          <input id="delivery" type="radio" name="typeOfDelivery" />
          Delivery
        </label>
      </div>
    </div>
  );
}
