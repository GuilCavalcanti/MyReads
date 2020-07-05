import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

class ListBooks extends Component {

  checkState = (booksInShelf, bookS) => {
    typeof booksInShelf === 'undefined' 
    ? console.log("empty")
    : booksInShelf.map(bookIn => (
      bookS.map(booksOut => (
        bookIn.id === booksOut.id
        ? booksOut.shelf = bookIn.shelf
        : ''
      ))
    ))
  }

  checkImage = (url, img) => {
    typeof url.imageLinks === 'undefined'
    ? img = `https://cdn.pixabay.com/photo/2010/12/01/dead-end-777_960_720.jpg`
    : img = url.imageLinks.thumbnail
    return img
  }

  render() {

    let {bookInShelf, books}  = this.props
    const booksList = books
    let image = ''

    const optionsList = ["Currently Reading" , "Want to Read" , "Read" , "None"]
    const optionsValues = ["currentlyReading", "wantToRead", "read", "none"]

    this.checkState(bookInShelf, booksList)
    //this.checkImage(book.imageLinks.thumbnail, image)

    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {booksList.map((book) => (          
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.checkImage(book, image)})`}}></div>
                <div className="book-shelf-changer">
                  <select 
                    value={book.shelf || 'none'}
                    onChange={async (event) => {
                        book.shelf = event.target.value
                        this.forceUpdate()
                        await BooksAPI.update(book, event.target.value);
                      }
                    }>
                    <option value="move" disabled>Move to...</option>
                    {optionsList.map((elem, i) => (
                      <option value={optionsValues[i]} key={elem}>{elem}</option>
                    ))}
                  </select>
                </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.author}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default ListBooks