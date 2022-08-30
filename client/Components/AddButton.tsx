import axios from 'axios';
import React, { useState, Fragment } from 'react';
import Book from '../API/Book';
import Notification from './Notification';
import './AddButton.css';

const AddButton = (props: { book: Book }) => {
  const { book } = props;

  const [notification, setNotification] = useState('invincible');
  const [message, setMessage] = useState('Added book to library');

  const AddButtonHandler = async () => {
    let url = 'https://mylibrary-backend-alex.herokuapp.com/addBook';
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      url = 'http://localhost:3030/addBook';
    }

    const res = await axios.post(url, book);
    const data = res.data;
    if (data) {
      if (data.error) {
        setMessage(data.error);
      }
      setNotification(data.status);
      setTimeout(() => {
        setNotification('invincible');
      }, 150);
    }
  };

  return (
    <Fragment>
      <button className="add-button" onClick={AddButtonHandler}>
        {<span className="plus">+</span>}{' '}
        {<span className="add-button-text">Add to library</span>}
      </button>
      <Notification message={message} className={notification} />
    </Fragment>
  );
};

export default AddButton;
