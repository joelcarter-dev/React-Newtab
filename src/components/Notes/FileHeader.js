import React from 'react';
import { Link } from 'react-router-dom';
// componentDidUpdate(prevProps) {
//  if ( prevProps.fileData !== this.props.currentFileIdx ) {
 
//  } 
// }

export const FileHeader = (props) => {
  return (
    <section id="FileHeader">
      <section id="backArrow">
        <Link to="/" id="arrow"> </Link>
      </section>
      <div className="holder">
      
        <span className="close">
        {/* the close could deselcet all files, leaving an editor state not connected to any folder.
            by not having any folder selected, this could be how a user makes a *file* without it
            being in a folder. But how will I render that in the sidebar? Just like an inputDummy?
        */} 
          &#10005;
        </span>
        
        {props.currentFolder !== null && 
          props.currentFolder.fileList !== undefined &&
          props.currentFileIdx !== null &&
          <div className="namdeData">
            <span>{props.currentFolder.fileList[props.currentFileIdx].name}</span>
          </div>
        }
        
        {props.currentFileIdx !== null && props.currentFolder !== null &&
          <div className="folderData">
            <span id="formFolder">From: {props.currentFolder.name}</span>
            
            <div className="tagList">
              {props.currentFolder.tags.map( (tag, idx)=> {
                return <span key={idx} className="tag">{tag}</span>
              })}
            </div>
          
          </div>
        }
        
      </div>
    </section>
  );
}

export default FileHeader;