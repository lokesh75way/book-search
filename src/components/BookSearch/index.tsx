import { AsyncPaginate } from "react-select-async-paginate";
import { useLazyGetBooksQuery } from "../../services/api";
import styles from "./index.module.scss";
import { useNavigate } from "react-router-dom";
import { SingleValue } from "react-select";
import BookItem from "../BookItem";
import useSearchHistory from "../../hooks/useSearchHistory";
import { useAppDispatch, useAppSelector } from "../../store";
import { setRecentSearch } from "../../store/bookSlice";

export default function BookSearch() {
  const [searchBooks] = useLazyGetBooksQuery();
  const navigate = useNavigate();
  const { set } = useSearchHistory();
  const dispatch = useAppDispatch();
  const recentSearch = useAppSelector((state) => state.books.recentSearch);
  const pageSize = 10;

  const getBooks = async (
    inputValue: string,
    page: number,
    options: Book[]
  ) => {
    if (inputValue.length < 1) {
      return { options: [], hasMore: false, additional: { page } };
    }

    dispatch(setRecentSearch({ query: inputValue, books: options }));

    const startIndex = page === 1 ? 0 : page * pageSize + 1;

    const searchedBooks = recentSearch.books.length;

    if (
      recentSearch.query === inputValue &&
      startIndex < recentSearch.books.length
    ) {
      const page = Math.ceil(searchedBooks / pageSize);
      return {
        options: recentSearch.books,
        hasMore: true,
        additional: { page },
      };
    }

    const { data } = await searchBooks({ q: inputValue, startIndex });
    const result = data?.items || [];
    const hasMore = data?.totalItems
      ? Math.ceil(data.totalItems / pageSize) > page
      : false;
    return { options: result, hasMore, additional: { page: page + 1 } };
  };

  const loadOptions = async (
    inputValue = "",
    options: any,
    additional: any
  ) => {
    const page = additional.page || 1;
    return getBooks(inputValue, page, options);
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
      getOptionLabel={(option) => option.volumeInfo.title}
      getOptionValue={(option) => `${option.id}`}
      onChange={handleOnChange}
      formatOptionLabel={formatOptionLabel}
      debounceTimeout={600}
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
      pageSize={pageSize}
      additional={{ page: 1 }}
      loadOptions={loadOptions}
    />
  );
}

const formatOptionLabel = (book: Book) => {
  if (!book) return null;
  return <BookItem book={book} />;
};
