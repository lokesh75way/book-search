import { useEffect, useState } from "react";

export default function useSearchHistory(storageKeyName = "search-history") {
  const [history, setHistory] = useState<Book[]>([]);

  useEffect(() => {
    const data = localStorage.getItem(storageKeyName);
    setHistory((history) => (data ? JSON.parse(data) : history));
  }, [storageKeyName]);

  const set = (book: Book) => {
    const result = history.filter((item) => item.id !== book.id);
    localStorage.setItem(storageKeyName, JSON.stringify([book, ...result]));
    setHistory((values) => [...values, book]);
  };
  return { history, set };
}
