import React from "react";
import BookShelf from "./BookShelf";


class ListBooks extends React.Component {
    render() {
        const { booksList } = this.props

        return (
            <div className="list-books">
                <header className="list-books-title">
                    <h1>MyReads</h1>
                </header>
                <div className="list-books-content">
                    <div>
                        <BookShelf 
                            shelfTitle='Currently Reading'
                            booksList={ booksList.filter(book => book.shelf === 'currentlyReading') }
                            handleShelfChange={ this.props.handleShelfChange }
                        />

                        <BookShelf 
                            shelfTitle='Want to Read'
                            booksList={ booksList.filter(book => book.shelf === 'wantToRead') }
                            handleShelfChange={ this.props.handleShelfChange }
                        />

                        <BookShelf 
                            shelfTitle='Read'
                            booksList={ booksList.filter(book => book.shelf === 'read') }
                            handleShelfChange={ this.props.handleShelfChange }
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
