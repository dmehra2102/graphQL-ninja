import { useState } from 'react'
import AddBook from './components/AddBook'
import BookList from './components/BookList'


function App() {

  return (
    <div id="main">
      <BookList />
      <AddBook />
    </div>
  )
}

export default App
