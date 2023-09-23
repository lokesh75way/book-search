import FlexBox from "../FlexBox";
import noImagePlaceholder from "../../assets/no-image.png";
import styles from "./index.module.scss";
import Card from "../Card";

type Props = {
  book?: Book;
  author?: Author;
};

type ValueWithLabelProps = {
  label: string;
  value?: string | number;
};

export default function BookDetails(props: Props) {
  const { cover_image, title, author_id, releaseDate, pages } =
    props.book || {};

  const { name = "", surname = "" } = props.author || {};

  if (!props.book) {
    return (
      <Card className={styles.container}>
        <h2>No book found</h2>
      </Card>
    );
  }

  return (
    <Card className={styles.container}>
      <img
        className={styles.image}
        src={cover_image || noImagePlaceholder}
        alt={title}
      />
      <div className={styles.details}>
        <ValueWithLabel value={title} label="Title" />
        <ValueWithLabel value={releaseDate} label="Release Date" />
        <ValueWithLabel value={pages} label="Pages" />
        <ValueWithLabel
          value={`${name}${surname ? " " : ""}${surname}` || author_id}
          label="Author"
        />
      </div>
    </Card>
  );
}

const ValueWithLabel = (props: ValueWithLabelProps) => {
  const { value, label } = props;
  return (
    <FlexBox alignItems="center" marginBottom="10px">
      <p className={styles.label}>{label}</p> :
      <p className={styles.value}>{value}</p>
    </FlexBox>
  );
};
