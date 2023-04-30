import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import AddBook from "./pages/AddBook";
import Login from "./pages/Login.js";
import Error from "./pages/Error";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/addBook" Component={AddBook} />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="*" Component={Error} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
