import { useNavigate } from "react-router-dom";
import useSearchHistory from "../../hooks/useSearchHistory";
import BookItem from "../BookItem";
import styles from "./index.module.scss";
export default function SearchHistory() {
  const { history } = useSearchHistory();
  const navigate = useNavigate();

  return (
    <div className={styles.history}>
      {history.length === 0 && (
        <p className={styles.placeholder}>No history found</p>
      )}
      {history.map((book) => {
        return (
          <div
            key={book.id}
            className={styles.bookItem}
            onClick={() => navigate(`/books/${book.id}`)}
          >
            <BookItem book={book} />
          </div>
        );
      })}
    </div>
  );
}
