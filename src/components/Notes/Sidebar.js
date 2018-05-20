import React, { Component } from 'react';
import FlipMove from 'react-flip-move';
import Folder from './Folder'
import ListDummy from './ListDummy'
import {NoteContext} from '../../routes/Notes'

export class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.addFolder = this.addFolder.bind(this);
    this.addDummy = this.addDummy.bind(this);
    this.cancelDummy = this.cancelDummy.bind(this);
    this.getFolder = this.getFolder.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.selectItem = this.selectItem.bind(this);
    this.state = {
      folders: this.getFolder(),
      formInput: "",
      isHidden: null
    };
  }
  
  handleChange(e) {
    this.setState({formInput: e.target.value});
  }
  
  setLocalStorage() { 
    let folderData = this.state.folders;
    localStorage.removeItem('noteFiles');
    localStorage.setItem('noteFiles', JSON.stringify(folderData));
  }

  getFolder() {
    let localStorageItem = JSON.parse(localStorage.getItem('noteFiles'));
    if ( localStorageItem == null ) {
      return [];
    }
    return localStorageItem;
  }
  
  addDummy() {
    let folderList = this.state.folders;
    this.cancelDummy();
    folderList.unshift({
      name: this.state.formInput,
      key: "dummyItem",
      isDummy: true
    });
    this.setState({folders: folderList, formInput: ""});
  }
  
  cancelDummy() {
    let folderList = this.state.folders;
    folderList.map((folderData, idx)=> {
      if (folderList[idx].key === "dummyItem") {
        this.deleteFolder(idx);
      }
    });
  }

  addFolder(e) {
    let folderList = this.state.folders;
    folderList.unshift({
      name: this.state.formInput,
      key: new Date().getTime(),
      open: false,
      tags: ["white", "black"],
      fileList: []
    });
    this.cancelDummy();
    this.setState({folders: folderList, formInput: ""});
    this.props.sendSelectedData(folderList[0], null);
    this.setLocalStorage();
    e.preventDefault(); 
  }
  
  deleteFolder(idx) {
    let folderList = this.state.folders;
    folderList.splice(idx, 1); 
    this.setState({
      folders: folderList
    });
    this.props.sendSelectedData(null, null);
    this.setLocalStorage();
  }
  
  returnSelected(open) {
    return open
  }

  selectItem(idx) {
    let folders = this.state.folders
    if (folders[idx] !== undefined) {
      this.returnSelected( folders[idx].open =! folders[idx].open );
      this.setState({folders: folders});
      if (folders[idx].open) this.props.sendSelectedData(folders[idx], null);
      //console.log(folders[idx])
      this.setLocalStorage();
    }
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.isHidden !== this.props.isHidden) {
      this.setState({isHidden: this.props.isHidden});
    }
  }
  
  render() {
    return (
      <section className={this.state.isHidden ? "SidebarHidden" : "SidebarOpen"} id="Sidebar">
        <div className="sidebar-top">
          <div className="input-holder">
            <div className="add-item" onClick={this.addDummy}>+</div>
          </div>
        </div>
          
        <div className="folder-list-holder">
          <ul id="folder-list">
            <FlipMove duration={250} easing="ease-out">
            {this.state.folders.map((folder, idx) => (
              folder.isDummy ? (
                <ListDummy
                  key={folder.key}
                  addItem={this.addFolder}
                  inputValue={this.state.formInput} 
                  handleChange={this.handleChange}
                  cancelDummy={this.cancelDummy}
                />
              ) : (
                <li
                  className={folder.open ? "folder-open" : "folder-closed"}
                  onClick={this.selectItem.bind(this, idx)}
                  key={folder.key}
                >
                <NoteContext.Consumer>
                  {(context)=>{ return (
                    <Folder
                      key={folder.key}
                      delete={this.deleteFolder.bind(this, idx)}
                      folderData={folder}
                      setLocalStorage={this.setLocalStorage}
                      currentFolder={context.currentFolder}
                      sendSelectedData={context.getSelectedData}
                      
                      newEditorState={context.newEditorState}
                      emptyEditor={context.emptyEditor}
                    />
                  )}}
                </NoteContext.Consumer>
                </li>
              )
            ))}
            </FlipMove>
          </ul>
        
        </div>
      </section>
    );
  }
}

export default Sidebar;