import React from 'react'

const Search = ({ value, handleChange, placeholder }) => {
  return (
    <div className="field has-addons" style={{ margin: '10px 0' }}>
      <label className="label" style={{ margin: '5px 10px 0 0' }}>
        Hae:
      </label>
      <div className="control">
        <input
          className="input"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

export default Search
