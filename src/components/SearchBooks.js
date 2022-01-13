import React from "react";
import { v4 as uuidv4 } from 'uuid';
import BookListElement from "./BookListElement";
import * as BooksAPI from '../BooksAPI'


class SearchBooks extends React.Component {
    state = {
        query: '',
        searchResults: []
    }

    checkBookInList = book => {
        BooksAPI.get(book.id)
            .then(data => {
                console.log(data.shelf)
                return data.shelf
            })
            .catch(error => console.log(`Error checking library: ${error}`))
    }

    handleSearchChange = (event) => {
        this.setState({ query: event.target.value })

        BooksAPI.search(this.state.query)
            .then(books => {
                if (typeof books !== 'undefined') {
                    const modifiedBooks = books.map(book => {
                        BooksAPI.get(book.id)
                            .then(data => {
                                console.log(data.shelf)
                                return {...book, shelf: data.shelf}
                            })
                            .catch(error => console.log(`Error checking library: ${error}`))
                    })
                    console.log(books)
                    console.log(modifiedBooks)
                    return modifiedBooks
                }
            })
            .then(modifiedBooks => {
                console.log(modifiedBooks)
                if (typeof modifiedBooks !== 'undefined') {
                    const data = modifiedBooks.map(book => {
                        return {
                            id: book.id,
                            bookCoverURL: `url(${book.imageLinks.thumbnail})`,
                            bookTitle: book.title,
                            bookAuthor: Array.isArray(book.authors) ? book.authors.join(', ') : '',
                            shelf: book.shelf
                        }
                    })

                    console.log("data ==>")
                    console.log(data)
    
                    this.setState( () => ({
                        searchResults: data
                    }))
                }
            })
            .catch(error => console.log(`Book Search Error: ${error}`))
    }

    // handleShelfChange = (event) => {
    //     const targetId = event.target.name
    //     const newShelf = event.target.value
    //     const [bookToBeUpdated] = this.state.searchResults.filter(book => book.id === targetId)

    //     console.log(`${targetId} -- ${newShelf} -- ${bookToBeUpdated}`)
    // }

    render() {

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <button className="close-search" onClick={ () => this.props.toggleShowSearchPage() }>Close</button>
                    <div className="search-books-input-wrapper">
                        {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input 
                            type="text" 
                            placeholder="Search by title or author"
                            value={ this.state.query }
                            onChange={ this.handleSearchChange }
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.searchResults.map(book =>
                            <li key={uuidv4()}>
                                <BookListElement 
                                    book={ book }
                                    handleShelfChange={ this.props.handleShelfChange }
                                />
                            </li>
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks
