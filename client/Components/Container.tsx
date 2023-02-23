import React, { FC, useState } from "react";
import Navigation from "./Navigation";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import "./Container.css";
import Book from "../API/Book";
import { Route, Routes } from "react-router-dom";
import MyLibrary from "./MyLibrary";
import Home from "./Home";
import Documentation from "./Documentation";

const Container = () => {
  const [obtainedData, setobtainedData] = useState<Book[] | undefined>(
    undefined
  );

  const saveSearchResultsHandler = (
    obtainedSearchResults: Book[] | undefined
  ) => {
    setobtainedData(obtainedSearchResults);
  };

  return (
    <div className="container">
      <Navigation />
      <SearchBar onGettingSearchResults={saveSearchResultsHandler} />
      <hr />
      <Routes>
        <Route path="search" element={<SearchResults searchResults={obtainedData} />}/>
        <Route path="/" element={<Home/>}/>
        <Route path="mylibrary" element={<MyLibrary/>}/>
        <Route path="documentation" element={<Documentation/>}/>
      </Routes>
    </div>
  );
};

export default Container;