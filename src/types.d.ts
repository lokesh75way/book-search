type Book = {
  id: number;
  author_id: number;
  title: string;
  cover_image?: string;
  pages: number;
  releaseDate: string;
  isbn: string;
};

type Author = {
  id: number;
  name: string;
  surname: string;
};
