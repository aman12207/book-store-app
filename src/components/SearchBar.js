import React, { useEffect, useRef } from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const inputRef = useRef(null);
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <div className="my-4">
      <input
        ref={inputRef}
        type="text"
        className="form-control"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
