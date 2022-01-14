import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ListBooks from './components/ListBooks'
import SearchBooks from './components/SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    booksList: []
  }

  componentDidMount() {
    BooksAPI.getAll()
        .then(books => {
          const data = books.map(book => ({
              id: book.id,
              bookCoverURL: `url(${book.imageLinks.thumbnail})`,
              bookTitle: book.title,
              bookAuthor: Array.isArray(book.authors) ? book.authors.join(', ') : '',
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
      <div className="app">
          <Routes>
            <Route exact path='/' element={
              <ListBooks 
                booksList={ this.state.booksList }
                handleShelfChange={ this.handleShelfChange }
              />
            }
            />
    
            <Route exact path='/search' element={
              <SearchBooks
                booksList={ this.state.booksList }
                handleShelfChange={ this.handleShelfChange }
              />
            }
            />
          </Routes>
      </div>
    )
  }
}

export default BooksApp
