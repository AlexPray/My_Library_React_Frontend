import React from 'react';
import './Documentation.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

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
      <div className="doc-text-container">
        <p>
          Since I like to read books (mainly nonfiction), I wanted to build my
          own online library. <br />
          to do this job, I wanted to use an online database to search the books
          I own and to add it with one click to my collection. <br /> <br />
          I chose the Google Books API since it's free to use. <br />
          for my devstack I chose to use React/Typescript for the front-end,
          ExpressJS for my back-end and MySQL for my database. <br />
          <br />
          My goal was to learn how front-end, back-end and database work
          together and to deepen my knowledge about React. <br />
          <br />
        </p>
      </div>

      <img
        className="doc-img"
        src="/images/my_library_design_draft.png"
        alt="Draft of the My Library app design"
      />
      <p className="img-text"> &lt; I made the design draft with Figma &gt; </p>

      <br />

      <h1>Google Books API</h1>

      <div className="doc-text-container">
        <p>Get to know Google Books API and get it working:</p>
        <p>
          After I created a draft project I read the Google Books API
          documentation to learn how it works, what the API can do and how to
          implement it to my app. <br />
          It is possible to get the link for the thumbnail and other information
          like title, author and googleId from the books with a get request.{' '}
          <br />I decided to create a Book class with the mentioned properties
          and to fetch the data with axios in the frontend, send it to my
          backend app and from there to my database.
        </p>
      </div>
      <SyntaxHighlighter
        className="doc-text-container"
        language="javascript"
        style={a11yDark}
        showLineNumbers
      >
        {`import axios from "axios"
import Book from "./Book";      

const searchBooks = async (inputData: string): Promise<Book[]> => {
  const GOOGLE_API_KEY = "AIzaSyAXBMjrLDIIOJXA0jabC116F9UlpXWej3A"
  const result = await axios.get(
      \`https://www.googleapis.com/books/v1/volumes?q=$\{encodeURI(inputData)}&maxResults=40&key=$\{GOOGLE_API_KEY}\`
  );
  const books = parseResult(result.data);
  return books;
};

const parseResult = (data: any) => {
  const books: Book[] = [];
  if (data.items !== undefined) {
      data.items.forEach((element: any) => {
          const book = new Book();
          book.googleId = element.id
          book.title = element.volumeInfo.title
          book.authors = element.volumeInfo.authors
          if (element.volumeInfo.imageLinks && element.volumeInfo.imageLinks.thumbnail) {
              book.thumbnail = element.volumeInfo.imageLinks.thumbnail
          }
          books.push(book);
      });
  }
  return books;
}

port default searchBooks
`}
      </SyntaxHighlighter>
      <div className="doc-text-container">
        <p className="img-text">
          &lt; I learned how to read documentations, how axios works and how to
          get the properties I needed for my Book class. &gt;
        </p>
      </div>
      <br />
      <h1>Backend with Express</h1>

      <div className="doc-text-container">
        <p>Figuring out how to get to add a book to my library:</p>
        <p>
          Since I was able to search books with the API and get the information
          I needed. I had to figure out how to save a book to my database. I
          started an Express course on Udemy and learned a lot about requests
          and responses, queries, try-catch, reject-resolve, .then-catch async
          await etc. I figured out how to make a post-request using axios in the
          frontend and express in the backend with the help of postman. This
          whole topic took me a while to fully understand, but I've learned a
          lot through the course, and it was a good investment of my time.
        </p>
      </div>

      <SyntaxHighlighter
        className="doc-text-container"
        language="javascript"
        style={a11yDark}
        showLineNumbers
      >
        {`app.post("/addBook", function (req, res) {
    var db = database_1.default.getDbServiceInstance();
    db.addNewBook(req.body)
        .then(function (response) {
        res.json({ status: "success" }).status(200);
    })
        .catch(function (err) {
        var customErrorMsg = '';
        switch (err.code) {
            case 'ER_DUP_ENTRY':
                customErrorMsg = 'Book already in library';
                break;
            case 'ER_WRONG_VALUE_COUNT_ON_ROW':
                customErrorMsg = 'Something went wrong';
                break;
        }
        res.json({ status: "error", error: customErrorMsg, errrormsg: err.message }).status(200);
    });
});
`}
      </SyntaxHighlighter>
      <p className="img-text">
        &lt; I learned to work with postman, make requests and catch errors.
        &gt;
      </p>
      <h1>Work with MySQL and Express</h1>

      <div className="doc-text-container">
        <p>Building a connection between my backend and my database:</p>
        <p>
          My Express course has a big database section, but the instructor used
          MongoDB and not MySQL. I thought i will still go through this section
          The company where I work uses SQL, that's why I decided to still use
          MySQL, but learning another tool meanwhile is never a bad thing,
          right?
        </p>
        <p>
          After learning MongoDB I still needed to figure out how to use MySQL
          with Express, so I needed to learn how to create a connection with the
          mysql tool for node. It took me a while to set up MySQL Workbench and
          get a working connection. I had a lot of issues, but at the end I
          ended up using mysql2 and found a solution for every problem, one
          after another and the connection was established.
        </p>
      </div>

      <SyntaxHighlighter
        className="doc-text-container"
        language="javascript"
        style={a11yDark}
        showLineNumbers
      >
        {`import mysql from "mysql2";
import Book from "./API/Book";

let instance: null | DbService = null;

let connection: mysql.Connection;

if (process.env.NODE_ENV === "production") {
  connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "***********",
    database: "my_library",
    port: 3306,
  });
}

connection.connect((err) => {
  if (err) {
    console.log(err.message);
  }
  console.log("to database connected");
});

class DbService {
  static getDbServiceInstance() {
    return instance ? instance : new DbService();
  }

  async getAllData() {
    try {
      let response = await new Promise((resolve, reject) => {
        const query =
          "SELECT googleId, title, authors, thumbnail FROM it_firma.my_library";
        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      });

      return response;
    } catch (err) {
      console.log(err);
    }
  }

  async addNewBook(book: Book) {
    return await new Promise((resolve, reject) => {
      const query =
        "INSERT INTO \`it_firma\`.\`my_library\` (\`Title\`, \`Authors\`, \`Thumbnail\`, \`GoogleId\`) VALUES (?, ?, ?, ?)";
      connection.query(
        query,
        [book.title, book.authors, book.thumbnail, book.googleId],
        (err, results) => {
          if (err) reject(err);
          resolve(results);
        }
      );
    });
  }

  async deleteBook(book: Book) {
    try {
      return await new Promise((resolve, reject) => {
        const query =
          "DELETE FROM \`it_firma\`.\`my_library\` WHERE \`GoogleId\` = ?"
        connection.query(
          query,
          [book.googleId],
          (err, results) => {
            if (err) reject(err);
            resolve(results);
          }
        );
      });
    } catch (err) {
      console.log(err);
    }
  }
}

export default DbService;
`}
      </SyntaxHighlighter>
      <p className="img-text">
        &lt; This piece of code took me a long time to get it to work. And I
        still need to learn stuff about error handling.
        <br /> But once again I learned a lot and was overwhelmed when it
        finally worked. This is what I love about coding. &gt;
      </p>

      <h1>Display searchresults and my library with React</h1>

      <div className="doc-text-container">
        <p>Design the website and get my add- and delete button to work:</p>
        <p>
          Finally, my requests worked, and I could console.log my data in the
          browser. Now I needed to figure out how to pass data from one
          component to another. I already learned how to pass data to a child
          component with props, but didn't know how to pass it to the parent.
          Okay, back to Udemy!
        </p>
        <p>
          I learned how to use useState and how to pass data to a parent
          component. learned how to use useState and how to pass data to a
          parent component. This hasn't taken me too long to learn, and I had
          fun meanwhile. Since i like to see onscreen what i do, i guess i am
          more of a frontend guy.
        </p>
        <p>
          Now my app is working as I expected, and I am happy with it. I want to
          extend it and implement things like filtering and the possibility to
          mark books as read.
        </p>
      </div>
      <SyntaxHighlighter
        className="doc-text-container"
        language="javascript"
        style={a11yDark}
        showLineNumbers
      >
        {`import axios from 'axios';
import React, { useState, Fragment } from 'react';
import Book from '../API/Book';
import Notification from './Notification';
import './AddButton.css';

const AddButton = (props: { book: Book }) => {
  const { book } = props;

  const [notification, setNotification] = useState('invincible');
  const [message, setMessage] = useState('Added book to library');

  const AddButtonHandler = async () => {
    const res = await axios.post('http://localhost:3030/addBook', book);
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
`}
      </SyntaxHighlighter>
      <p className="img-text">
        &lt; The last thing I implemented was the notification after adding or
        deleting a book &gt;
      </p>

      <h1>Conclusion</h1>

      <div className="doc-text-container">
        <p>What I learned, and what would I have done differently?</p>
        <p>
          I made my first steps with React in an own project and worked the
          first time with a backend app and with a database. I learned a lot
          during these hours, and now I know for sure, that I love to code and
          to learn new things. I also used Figma for the first time and like to
          design with it. I know my goal to be a web-developer is achievable,
          but I still need to learn a lot and to be faster.
        </p>
        <p>
          I think I should have used MongoDB instead of MySQL, since express
          works better with it. And I need to plan my next project better and
          more in depth, to avoid some issues in front. For example, I coded the
          frontend and the backend in the same VSC Workspace, what leaded to
          issues to put the side. Why I had to split the project into two
          afterwards. What took time, I could have saved myself. But we all make
          mistakes to learn from them, right?
        </p>
        <p>
          At the end I am happy with my project and can't wait to continue
          working on it. But first I have to do some work at my workplace and to
          get more practical experience in real projects.
        </p>
      </div>
    </div>
  );
};

export default Documentation;
