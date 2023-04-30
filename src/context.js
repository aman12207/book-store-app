import React, { useState, useContext, useEffect, useCallback } from "react";
import axios from "./utils/AxiosInstance";
import { debounce } from "lodash";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [cards, setCards] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = useCallback(
    debounce(async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/v1/books/search?term=${searchTerm}`);
        setCards(res.data.books);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    }, 500),
    [searchTerm]
  );

  useEffect(() => {
    fetchData();
    return fetchData.cancel;
  }, [searchTerm, fetchData]);

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        cards,
        setCards,
        searchTerm,
        setSearchTerm,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
