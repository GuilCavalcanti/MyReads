import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    books: [],
    query: ''
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setState(() => ({
          books
        }))
      });
  }

  clearQuery = () => {
    this.updateQuery('')
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
            <div className="list-books">
              {this.componentDidMount()}
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <ListBooks
                      books={this.state.books.filter(book => book.shelf === "currentlyReading")}
                    />
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <ListBooks
                      books={this.state.books.filter(book => book.shelf === "wantToRead")}
                    />
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <ListBooks
                      books={this.state.books.filter(book => book.shelf === "read")}
                    />
                  </div>
                </div>
              </div>
                <Link
                to='/search'
                className="open-search"
              ></Link>
            </div>
          )}/>
          <Route exact path='/search' render={() => (
            <Search books={this.state.books}/>
          )} />
      </div>
    )
  }
}

export default BooksApp
