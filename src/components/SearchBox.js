import React from 'react'

const SearchBox = (props) => {
  return (
    <div>
      <form onSubmit={props.onSubmit}>
        <input
          className="searchbox"
          type="text"
          placeholder="search cats"
          value={props.input}
          onChange={(e) => props.setInput(e.target.value)} />
        <button className="submitButton" type="submit">search</button>
      </form>
    </div>
  )
}

export default SearchBox;
