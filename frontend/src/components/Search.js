import React from 'react'

const Search = ({ value, handleChange, placeholder }) => {
  return (
    <div className="field has-addons">
      <div className="control">
        <input
          className="input"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      </div>
      <div className="control">
        <a className="button is-link">Hae</a>
      </div>
    </div>
  )
}

export default Search
