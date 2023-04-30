import React, { useState } from "react";
import axios from "../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGlobalContext } from "../context";

const AddBook = () => {
  const { isAuthenticated, setCards, setSearchTerm } = useGlobalContext();
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");

  // validation hooks
  const [isBookTitleValid, setIsBookTitleValid] = useState(true);
  const [isAuthorValid, setIsAuthorValid] = useState(true);

  const navigate = useNavigate();

  const isFormValid = () => {
    const bookTitleValidity = bookTitle.trim() === "" ? false : true;
    const AuthorValidity = author.trim() === "" ? false : true;
    setIsBookTitleValid(bookTitleValidity);
    setIsAuthorValid(AuthorValidity);
    if (bookTitleValidity && AuthorValidity) return true;
    return false;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isAuthenticated) {
      navigate("/login");
      toast.error("Unauthorized: Log in to continue!!!", {
        position: "bottom-left",
      });
      return;
    }
    if (!isFormValid()) return;
    try {
      const response = await axios.post("/api/v1/book/new", {
        bookTitle: bookTitle,
        author: author,
      });
      if (response.data.success) {
        const res = await axios.get("/api/v1/books/all");
        setCards(res.data.books);
      }
      toast.success(response?.data?.message, {
        position: "bottom-left",
      });
      setBookTitle("");
      setAuthor("");
      setSearchTerm("");
    } catch (err) {
      toast.error(err.response.data.message, {
        position: "bottom-left",
      });
    }
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card shadow-2-strong"
              style={{ borderRadius: "1rem" }}
            >
              <form className="card-body p-5 " onSubmit={handleSubmit}>
                <h3 className="mb-5 text-center">Add Book</h3>
                <div className="form-outline mb-4">
                  <label className="form-label " htmlFor="typeEmailX-2">
                    Book Title
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    value={bookTitle}
                    onChange={(e) => setBookTitle(e.target.value)}
                  />
                  {!isBookTitleValid && (
                    <div className="invalid">
                      <span>* Please enter a valid Book Title</span>
                    </div>
                  )}
                </div>

                <div className="form-outline mb-4">
                  <label className="form-label" htmlFor="typePasswordX-2">
                    Author Name
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                  {!isAuthorValid && (
                    <div className="invalid">
                      <span>* Please enter a valid Author Name</span>
                    </div>
                  )}
                </div>
                <div className="d-grid gap-2">
                  <button className="btn btn-primary" type="submit">
                    Add Book
                  </button>
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={() => navigate("/")}
                  >
                    Go Back
                  </button>
                </div>

                <hr className="my-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddBook;
