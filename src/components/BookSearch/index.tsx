import { AsyncPaginate } from "react-select-async-paginate";
import { useLazyGetBooksQuery } from "../../services/api";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { SingleValue } from "react-select";
import BookItem from "../BookItem";
import useSearchHistory from "../../hooks/useSearhHistory";

export default function BookSearch() {
  const [searchBooks] = useLazyGetBooksQuery();
  const navigate = useNavigate();
  const { set } = useSearchHistory();

  const getBooks = async (inputValue: string) => {
    // if (inputValue.length < 3) {
    //   return  {options: [], hasMore: false};
    // }
    const { data = [] } = await searchBooks(null);
    const result = data.filter((book) =>
      book.title.toLowerCase().includes(inputValue.toLowerCase())
    );
    return { options: result, hasMore: false };
  };

  const loadOptions = async (inputValue = "") => {
    return new Promise<{ options: Book[]; hasMore: boolean }>(
      (resolve, reject) => {
        getBooks(inputValue).then(resolve).catch(reject);
      }
    );
  };

  const handleOnChange = (book: SingleValue<Book>) => {
    if (book) {
      set(book);
      navigate(`/books/${book.id}`);
    }
  };

  return (
    <AsyncPaginate
      className={styles.reactSelect}
      defaultOptions
      placeholder="Search books..."
      noOptionsMessage={() => "No books"}
      getOptionLabel={(option) => option.title}
      getOptionValue={(option) => `${option.id}`}
      onChange={handleOnChange}
      formatOptionLabel={formatOptionLabel}
      debounceTimeout={400}
      styles={{
        input: (styles) => ({
          ...styles,
          height: "50px",
        }),
        control: (styles) => ({
          ...styles,
          borderRadius: "10px",
        }),
      }}
      loadOptions={loadOptions}
    />
  );
}

const formatOptionLabel = (book: Book) => {
  return <BookItem book={book} />;
};
