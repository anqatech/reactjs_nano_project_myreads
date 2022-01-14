import React from "react";
import { Link } from 'react-router-dom';
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

        BooksAPI.search(event.target.value)
            .then(books => {
                if (typeof books === 'undefined') {
                    return null
                } else {
                    const data = books.map(book => {
                        return {
                            id: book.id,
                            bookCoverURL: `url(${book.imageLinks.thumbnail})`,
                            bookTitle: book.title,
                            bookAuthor: Array.isArray(book.authors) ? book.authors.join(', ') : '',
                            shelf: 'none'
                        }
                    })
    
                    this.setState( () => ({
                        searchResults: data
                    }))
    
                    return data    
                }
            })
            .then(data => {
                if (typeof data !== 'undefined' && data !== null) {
                    data.map(item => (
                        BooksAPI.get(item.id)
                            .then(book => {
                                this.setState((currentState) => ({
                                    searchResults: currentState.searchResults.map(element => {
                                        return element.id === book.id? {...element, shelf: book.shelf}: element
                                    })
                                }))
                            })
                            .catch(error => console.log(`Error checking library: ${error}`))
                    ))
                }
            })
            .catch(error => console.log(`Book Search Error: ${error}`))
    }

    handleSearchShelfChange = (event) => {
        const targetId = event.target.name
        const newShelf = event.target.value
        const [bookToBeAdded] = this.state.searchResults.filter(book => book.id === targetId)
        BooksAPI.update(bookToBeAdded, newShelf)
    
        this.setState((currentState) => ({
            searchResults: currentState.searchResults.map(book => {
                return book.id === targetId? {...book, shelf: newShelf}: book
            })
        }))

        // this.props.handleShelfChange(event)
    }
    
    render() {

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/'>
                        <button className="close-search">Close</button>
                    </Link>
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
                                    handleShelfChange={ this.handleSearchShelfChange }
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

