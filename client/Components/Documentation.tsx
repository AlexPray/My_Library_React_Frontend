import React from 'react';
import './Documentation.css';

const Documentation = () => {
  return (
    <div className="documentation">
      <header>Development documentation</header>
      <p className="small-text">by Aleksandar Radosavljevic</p>

      <br />
      <br />
      <br />
      <br />
      <br />

      <h1>General idea</h1>
      <p>
        Since i like to read books (mainly non-ficiton), i wanted to build my
        own online library. <br />
        to do this job i wanted to use an online database to search the books i
        own and to add it with one click to my collection. <br /> <br />
        I choosed the Google Books API since its free to use. <br />
        for my devestack i choosed to use React/Typescript for the front-end,
        ExpressJS for my back-end and MySQL for my database. <br />
        <br />
        My goal was to learn how front-end, back-end and database work together
        and to deepen my knowledge about React. <br />
        <br />
      </p>

      <img
        src="/images/my_library_design_draft.png"
        alt="Draft of the My Library app design"
      />

      <br />
      <br />
      <br />

      <h1>Google Books API</h1>
    </div>
  );
};

export default Documentation;
