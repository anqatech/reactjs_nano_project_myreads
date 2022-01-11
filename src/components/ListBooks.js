import React from "react";
import { v4 as uuidv4 } from 'uuid';
import BookShelf from "./BookShelf";
import * as BooksAPI from '../BooksAPI'


class ListBooks extends React.Component {
    state = {
        booksList: []
    }

    componentDidMount() {
        BooksAPI.getAll()
            .then(books => {
                const data = books.map(book => ({
                    id: uuidv4(),
                    bookCoverURL: `url(${book.imageLinks.thumbnail})`,
                    bookTitle: book.title,
                    bookAuthor: book.authors.join(', '),
                    shelf: book.shelf
                }))

                this.setState( () => ({
                    booksList: data
                }))
            })
    }

    handleShelfChange = (event) => {
        const bookId = event.target.name
        const newShelf = event.target.value

        this.setState((currentState) => ({
            booksList: currentState.booksList.map(book => {
                return book.id === bookId? {...book, shelf: newShelf}: book
            })
        }))
    }

    render() {
        return (
            <div className="list-books">
                <header className="list-books-title">
                    <h1>MyReads</h1>
                </header>
                <div className="list-books-content">
                    <div>
                        <BookShelf 
                            shelfTitle='Currently Reading'
                            booksList={ this.state.booksList.filter(book => book.shelf === 'currentlyReading') }
                            handleShelfChange={ this.handleShelfChange }
                        />

                        <BookShelf 
                            shelfTitle='Want to Read'
                            booksList={ this.state.booksList.filter(book => book.shelf === 'wantToRead') }
                            handleShelfChange={ this.handleShelfChange }
                        />

                        <BookShelf 
                            shelfTitle='Read'
                            booksList={ this.state.booksList.filter(book => book.shelf === 'read') }
                            handleShelfChange={ this.handleShelfChange }
                        />
                    </div>
                </div>
                <div className="open-search">
                <button onClick={ () => this.props.toggleShowSearchPage() }>Add a book</button>
                </div>
            </div>
        )
    }
}

export default ListBooks
