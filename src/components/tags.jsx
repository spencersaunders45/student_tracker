import React from 'react'

export default (props) => {

  // Imports the array of tags
  const tags = props.tags;

  return (
    <div className="d-flex">
      {/* Displays all the tags within the array */}
      {tags && tags.map((tagName, idx) => 
          <p key={idx} className="p-2 rounded-3 ms-2 tagStyle" >{tagName}</p>
        )}
    </div>
  )
}