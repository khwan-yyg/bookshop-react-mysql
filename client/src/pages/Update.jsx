import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const bookId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/books/${bookId}`, book);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const [showBook, setShowBook] = useState([]);
  useEffect(() => {
    const fecthOneBooks = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/books/${bookId}`);
        setShowBook(res.data);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fecthOneBooks();
  });

  return (
    <>
      {showBook.map(function (onebook) {
        return (
          <div className="form" key={onebook.id}>
            <h1>Update The Books</h1>
            <h3>KEY : {onebook.id}</h3>
            <input
              type="text"
              placeholder={onebook.title}
              onChange={handleChange}
              name="title"
            />
            <input
              type="text"
              placeholder={onebook.desc}
              onChange={handleChange}
              name="desc"
            />
            <input
              type="number"
              placeholder={onebook.price}
              onChange={handleChange}
              name="price"
            />
            <input
              type="text"
              placeholder={onebook.cover}
              onChange={handleChange}
              name="cover"
            />
            <button onClick={handleClick}>Update</button>
          </div>
        );
      })}
    </>
  );
};

export default Update;
