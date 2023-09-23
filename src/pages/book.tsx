import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetBookByIdQuery } from "../services/api";
import { toast } from "react-toastify";
import BookDetails from "../components/BookDetails";
import Loader from "../components/Loader";
import FlexBox from "../components/FlexBox";

export default function Book() {
  const { id = "" } = useParams();

  const {
    data: book,
    isLoading,
    error,
  } = useGetBookByIdQuery(id, {
    skip: !id,
  });

  useEffect(() => {
    if (error) {
      toast.error(
        // @ts-ignore
        error?.message || "Something went wrong!"
      );
    }
  }, [error]);

  if (isLoading) {
    return (
      <FlexBox
        width="100vw"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Loader />
      </FlexBox>
    );
  }

  return (
    <FlexBox>
      <BookDetails book={book} />
    </FlexBox>
  );
}
