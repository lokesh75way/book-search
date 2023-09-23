import FlexBox from "../FlexBox";
import noImagePlaceholder from "../../assets/no-image.png";
import styles from "./index.module.scss";
import Card from "../Card";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

type Props = {
  book?: Book;
};

type ValueWithLabelProps = {
  label: string;
  value?: string | number;
};

export default function BookDetails(props: Props) {
  const book = props.book;
  const {
    imageLinks,
    title,
    authors = [],
    publishedDate,
    publisher,
    pageCount,
    description,
  } = book?.volumeInfo || {};

  const image = imageLinks?.thumbnail || noImagePlaceholder;

  const navigate = useNavigate();

  if (!props.book) {
    return (
      <Card className={styles.card}>
        <div className={clsx(styles.container, styles.noBook)}>
          <h2>No book found</h2>
        </div>
      </Card>
    );
  }

  return (
    <Card className={styles.card}>
      <Button className={styles.backButton} onClick={() => navigate("/")}>
        Back
      </Button>
      <div className={styles.container}>
        <img className={styles.image} src={image} alt={title} />
        <div className={styles.details}>
          <ValueWithLabel value={title} label="Title" />
          <ValueWithLabel value={pageCount} label="Pages" />
          <ValueWithLabel value={authors.join(", ")} label="Author" />
          <ValueWithLabel value={publisher} label="Publisher" />
          <ValueWithLabel value={publishedDate} label="Published Date" />
        </div>
      </div>
      {description && (
        <div className={styles.description}>
          <h2>Description</h2>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      )}
    </Card>
  );
}

const ValueWithLabel = (props: ValueWithLabelProps) => {
  const { value, label } = props;
  return (
    <FlexBox marginBottom="10px">
      <p className={styles.label}>{label}</p> :
      <p className={styles.value}>{value}</p>
    </FlexBox>
  );
};
