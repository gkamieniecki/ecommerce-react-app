import React from 'react'

const SearchBox = ({ searchChange }) => {
  return (
    <div>
      <input
        className="searchbox"
        type="search"
        placeholder="search cats"
        onChange={searchChange}
      />
    </div>
  )
}

export default SearchBox;
