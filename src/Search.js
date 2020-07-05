import React from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'

class Search extends React.Component {
  state = {
    query: '',
    booksRetrived: [] 
  }

  updateQuery = async (event) => {
    if (event === '') {
      this.setState({booksRetrived: []})
      console.log("worked reset 1")
      this.forceUpdate()
    } else {
      const query = event.target.value;
      this.setState(prevState =>({...prevState, query}))
      if(query !== '') {
        await BooksAPI.search(query).then(res => {
            if(res.error === "empty query") {
              this.setState({booksRetrived: []})
              console.log("worked reset 2")
              this.forceUpdate()
            } else {
              this.setState({booksRetrived: res})
            }
          })
      } else {
        console.log("worked reset 3")
        this.setState({booksRetrived: []})
      }
    }
  }

  render() {

    const {booksRetrived} = this.state
    const {books} = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className='close-search'></Link>
          <div className="search-books-input-wrapper">
            {
            /*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input 
              type="text" 
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={this.updateQuery}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
              <ListBooks books={booksRetrived} bookInShelf={books}/>                              
          </ol>
        </div>
      </div>
    )
  }
}

export default Search