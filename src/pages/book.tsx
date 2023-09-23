import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetAuthorsQuery, useGetBookByIdQuery } from "../services/api";
import { toast } from "react-toastify";
import BookDetails from "../components/BookDetails";
import Button from "../components/Button";
import Loader from "../components/Loader";
import FlexBox from "../components/FlexBox";

export default function Book() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: authors = [],
    isLoading: authorLoading,
    error: authorError,
  } = useGetAuthorsQuery(null);

  const {
    data = [],
    isLoading,
    error,
  } = useGetBookByIdQuery(Number(id), {
    skip: typeof Number(id) !== "number",
  });

  const book = data.find((book) => book.id === Number(id));
  const author = authors.find((author) => author.id === book?.author_id);

  useEffect(() => {
    if (error || authorError) {
      toast.error(
        // @ts-ignore
        error?.message || authorError?.message || "Something went wrong!"
      );
    }
  }, [error, authorError]);

  if (isLoading || authorLoading) {
    return (
      <FlexBox
        width="100%"
        height="100%"
        alignItems="center"
        justifyContent="center"
      >
        <Loader />
      </FlexBox>
    );
  }

  return (
    <div>
      <Button onClick={() => navigate("/")}>Back</Button>
      <BookDetails book={book} author={author} />
    </div>
  );
}
