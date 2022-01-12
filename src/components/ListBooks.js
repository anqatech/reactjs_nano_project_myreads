import React from "react";
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
                    id: book.id,
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
        const targetId = event.target.name
        const newShelf = event.target.value
        const [bookToBeUpdated] = this.state.booksList.filter(book => book.id === targetId)
        BooksAPI.update(bookToBeUpdated, newShelf)

        this.setState((currentState) => ({
            booksList: currentState.booksList.map(book => {
                return book.id === targetId? {...book, shelf: newShelf}: book
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
