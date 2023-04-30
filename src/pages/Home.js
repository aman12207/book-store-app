import React from "react";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";
import { useGlobalContext } from "../context";
import Navbar from "../components/Navbar";
const Home = () => {
  const { loading, cards, searchTerm, setSearchTerm } = useGlobalContext();

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row">
          <div className="col">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className="row">
            {cards && cards.length === 0 ? <h1>No Books Founds</h1> : cards.map((card, index) => (
              <div key={index} className="col-sm-12 col-md-6 col-lg-4">
                <Card
                  id={card._id}
                  bookTitle={card.bookTitle}
                  author={card.author}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
