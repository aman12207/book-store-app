import React from "react";
import axios from "../utils/AxiosInstance";
import { toast } from "react-toastify";
import { useGlobalContext } from "../context";
import { useNavigate } from "react-router-dom";

const Card = ({ id, bookTitle, author }) => {
  const { isAuthenticated, setCards } = useGlobalContext();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      toast.error("Unauthorized: Log in to continue!!!", {
        position: "bottom-left",
      });
      return;
    }
    try {
      let response = await axios.delete(`/api/v1/book/delete?id=${id}`);
      if (response.data.success) {
        const res = await axios.get("/api/v1/books/all");
        setCards(res.data.books);
      }
      toast.success(response?.data?.message, {
        position: "bottom-left",
      });
    } catch (err) {
      toast.error(err.response.data.message, {
        position: "bottom-left",
      });
    }
  };

  return (
    <div className="card my-3 capitalize">
      <h5 className="card-header d-flex justify-content-between align-items-center">
        {bookTitle}
        <button type="button" className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </h5>
      <div className="card-body">Author : {author}</div>
    </div>
  );
};

export default Card;
