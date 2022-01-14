import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ListBooks from './components/ListBooks'
import SearchBooks from './components/SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
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

  addBookFromSearch = (newBook) => {
    this.setState(currentState => ({
      booksList: [...currentState.booksList, newBook]
    }))
  }

  removeBookFromSearch = (oldBook) => {
    this.setState(currentState => ({
      booksList: currentState.booksList.filter(book => book.id !== oldBook.id)
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
                handleShelfChange={ this.handleShelfChange }
                addBookFromSearch={ this.addBookFromSearch }
                removeBookFromSearch={ this.removeBookFromSearch }
              />
            }
            />
          </Routes>
      </div>
    )
  }
}

export default BooksApp
