import BookSearch from "../components/BookSearch";
import FlexBox from "../components/FlexBox";
import SearchHistory from "../components/SearchHistory";

export default function Home() {
  return (
    <FlexBox
      flexDirection="column"
      maxWidth="600px"
      margin="auto"
      padding="20px"
    >
      <BookSearch />
      <SearchHistory />
    </FlexBox>
  );
}
