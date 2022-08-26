import React, {Fragment, useState} from 'react';
import Notification from './Notification';
import './RemoveButton.css';
import axios from 'axios';
import Book from '../API/Book';

const RemoveButton = ({
  book,
  onChange,
}: {
  book: Book;
  onChange: (res: any) => void;
}) => {

  const RemoveButtonHandler = async () => {
    let url = 'https://mylibrary-backend-alex.herokuapp.com/removeBook';
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      url = 'http://localhost:3030/removeBook';
    }

    const res = await axios.delete(url, { data: book });
    onChange(res);
  };
  

  return (
    <Fragment>
      <button className="remove-button" onClick={RemoveButtonHandler}>
        {<span className="minus">x</span>}{' '}
        {<span className="remove-button-text">Remove book</span>}
      </button>
    </Fragment>
  );
};

export default RemoveButton;
