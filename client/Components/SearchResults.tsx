import React, { FC, Fragment } from 'react';
import './SearchResults.css';
import Card from './Card';
import Book from '../API/Book';
import AddButton from './AddButton';
import Image from './Image';

interface searchResultsProps {
  searchResults: Book[] | undefined;
}

const SearchResults: FC<searchResultsProps> = (props) => {
  const { searchResults } = props;

  if (searchResults === undefined) {
    return <p className="intro-text"> welcome to MyLibrary app </p>;
  } else if (searchResults.length === 0) {
      return <p className="intro-text"> no searchresults </p>;
    } else {
      return (
        <div className="searchresults">
          {searchResults.map((book) => (
            <Card key={Math.random()}>
              <div className="img-container">
                <Image book={book} />
                <AddButton book={book} />
              </div>
              <div className="text-container">
                <p className="title">{book.title}</p>
                <p className="authors">{book.authors}</p>
              </div>
            </Card>
          ))}
        </div>
      );
    }
};

export default SearchResults;
