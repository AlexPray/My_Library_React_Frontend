import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './MyLibrary.css';
import Card from './Card';
import Book from '../API/Book';
import Image from './Image';
import RemoveButton from './RemoveButton';
import AddButton from './AddButton';
import Notification from './Notification';

const MyLibrary = () => {
  const [library, setlibrary] = useState<Book[]>([]);
  const [notification, setNotification] = useState('invincible');
  const [message, setMessage] = useState('Removed book from library');

  useEffect(() => {
    fetchBooksHandler();
  }, []);

  const fetchBooksHandler = () => {
    axios
      .get('http://localhost:3030/getBooks')
      .then((response) => {
        return response.data;
      })
      .then((data) => {
        setlibrary(data);
      });
  };

  const notificationHandler = (res: any) => {
    fetchBooksHandler();
    if (res.data) {
      const data = res.data;
      if (data.error) {
        setMessage(data.error);
      }
      setNotification(data.status);
      setTimeout(() => {
        setNotification('invincible');
      }, 150);
    }
  }
    if (library.length > 0) {
      return (
        <div className="library">
          {library.map((book: Book) => (
            <Card key={Math.random()}>
              <div className="img-container">
                <Image book={book} />
                <RemoveButton onChange={notificationHandler} book={book} />
              </div>
              <div className="text-container">
                <p className="title">{book.title}</p>
                <p className="authors">{book.authors}</p>
              </div>
            </Card>
          ))}
          <Notification message={message} className={notification} />
        </div>
      );
    } else {
      return <p>Keine Bücher gefunden</p>;
    }
};

export default MyLibrary;
