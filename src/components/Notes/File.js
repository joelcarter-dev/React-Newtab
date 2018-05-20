import React from 'react';
 
const File = (props) => {
  return (
    <div className="file-holder">
      <span className="file-name">{props.fileData.name}</span>
      <div className="file-buttons">
        <div>
          <span className="delete-file" onClick={props.delete}> &#10005; </span>
          <span className="editName"> E </span>
          <span className="tags"> ∆ </span>
        </div>
      </div>
    </div>
  );
}

export default File;