import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fecthAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        // console.log(res);
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fecthAllBooks();
  }, []);

  const handleClick = async (id) => {
    try {
      await axios.delete("http://localhost:8800/books/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Book Shop</h1>
      <div className="books">
        {books.map((book) => (
          <div className="book" key={book.id}>
            {book.cover && <img src={book.cover} alt="" />}
            <h2 className="title">{book.title}</h2>
            <p className="desc">{book.desc}</p>
            <span className="price">{book.price} bath</span>
            <div className="btn-flex">
              <button className="delete" onClick={() => handleClick(book.id)}>
                Delete
              </button>
              <button className="update">
                <Link to={`/update/${book.id}`}>Update</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="add">
        <Link to="/add">Add new Book</Link>
      </button>
    </div>
  );
};

export default Books;
