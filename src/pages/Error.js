import React from "react";

const Error = () => {
  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="text-center">
        <h1 className="display-1">404</h1>
        <p className="lead">Oops! The page you're looking for doesn't exist.</p>
        <a href="/" className="btn btn-primary">
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default Error;
