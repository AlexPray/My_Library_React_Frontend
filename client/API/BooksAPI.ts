import axios from "axios"
import Book from "./Book";

const searchBooks = async (inputData: string): Promise<Book[]> => {
    const GOOGLE_API_KEY = "AIzaSyAXBMjrLDIIOJXA0jabC116F9UlpXWej3A"
    const result = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURI(inputData)}&maxResults=40&key=${GOOGLE_API_KEY}`
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

export default searchBooks