import React from "react"
import Book from "../API/Book"
import "./Image.css"

const Image = (props: {book: Book}) => {
    const {book} = props
    if (book.thumbnail !== undefined) {
        let thumbnail = `${book.thumbnail}`
        return (
            <img className="img" src={thumbnail} alt="Book-thumbnail" ></img>
        )
    } else {
        return (
            <img className="img" src="http://books.google.com/books/content?id=WQkdAQAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api" alt="Book-thumbnail" ></img>
        )
    }
}

export default Image