import React from "react";
import { v4 as uuidv4 } from 'uuid';
import BookListElement from "./BookListElement";


class BookShelf extends React.Component {
    render() {
        const { bookList } = this.props

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{ this.props.shelfTitle }</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {bookList.map(book =>
                            <li key={uuidv4()}>
                                <BookListElement 
                                    bookCoverURL={ book.bookCoverURL }
                                    bookTitle={ book.bookTitle }
                                    bookAuthor={ book.bookAuthor }
                                />
                            </li>
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookShelf
