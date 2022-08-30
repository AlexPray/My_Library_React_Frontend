import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Book from '../API/Book';
import searchBooks from '../API/BooksAPI';
import './SearchBar.css';

interface NewSearchResults {
  onGettingSearchResults: (data: Book[] | undefined) => void;
}

const SearchBar: React.FC<NewSearchResults> = (props) => {
  const inputData = useRef<HTMLInputElement>(null);
  const nav = useNavigate();

  function handleClick() {
    searchBooks(inputData.current!.value).then((data) => {
      props.onGettingSearchResults(data);
    });
    nav('./search');
  }

  function handleKeyDown (event: any) {
    if (event.key === 'Enter') {
      searchBooks(inputData.current!.value).then((data) => {
        props.onGettingSearchResults(data);
      });
      nav('./search');
    }
  }

  return (
    <div className="search-bar">
      <input
        onKeyDown={handleKeyDown}
        ref={inputData}
        className="search-input"
        type="text"
        placeholder="Search for booktitle or author..."
      />
      <button onClick={handleClick} className="search-button">
        <svg
        className="search-icon"
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.6217 18.7949L17.5201 14.6934C17.3151 14.5293 17.069 14.4062 16.8229 14.4062H16.1666C17.274 12.9707 17.9713 11.166 17.9713 9.15625C17.9713 4.48047 14.1158 0.625 9.44006 0.625C4.72327 0.625 0.908813 4.48047 0.908813 9.15625C0.908813 13.873 4.72327 17.6875 9.44006 17.6875C11.4088 17.6875 13.2135 17.0312 14.6901 15.8828V16.5801C14.6901 16.8262 14.7721 17.0723 14.9772 17.2773L19.0377 21.3379C19.4479 21.748 20.0631 21.748 20.4323 21.3379L21.5807 20.1895C21.9908 19.8203 21.9908 19.2051 21.6217 18.7949ZM9.44006 14.4062C6.52795 14.4062 4.19006 12.0684 4.19006 9.15625C4.19006 6.28516 6.52795 3.90625 9.44006 3.90625C12.3112 3.90625 14.6901 6.28516 14.6901 9.15625C14.6901 12.0684 12.3112 14.4062 9.44006 14.4062Z"
            fill="#292929"
          />
        </svg>
      </button>
    </div>
  );
};

export default SearchBar;
