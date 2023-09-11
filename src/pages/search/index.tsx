import React from 'react'
import css from "./search.module.scss"
import SearchBar from './search-bar'
import SearchResult from './search-result'


function Search() {
  
  return (
    <div>
      <SearchBar/>
      <SearchResult/>
    </div>
  )
}

export default Search