import noImagePlaceholder from "../../assets/no-image.png";
import styles from "./index.module.scss";

type Props = {
  book: Book;
};

export default function BookItem(props: Props) {
  const { cover_image, title } = props.book;
  return (
    <div className={styles.item}>
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src={cover_image || noImagePlaceholder}
          alt={title}
        />
      </div>
      <div className={styles.label}>{title}</div>
    </div>
  );
}
