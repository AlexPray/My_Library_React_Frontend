import React, { Fragment } from 'react';
import './Card.css';

const Card = (props: any) => {
  return <div className="book-card">{props.children}</div>;
};

export default Card;
