import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Layout from "./layout";
import Home from "./pages/home";
import Book from "./pages/book";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/books/:id" element={<Book />} />
      </Route>
    </Routes>
  );
}

export default App;
