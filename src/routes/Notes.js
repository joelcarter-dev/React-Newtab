  import React, { Component } from 'react';
  import Arrow from '../components/Common/Arrow'
  import CustomEditor from '../components/Notes/Editor';
  import Sidebar from '../components/Notes/Sidebar';
  import FileHeader from '../components/Notes/FileHeader';
  
  //UP TO DATE 2

  export const NoteContext = React.createContext("placeholderEditorState");

  export class Notes extends Component {
    constructor(props) {
      super(props);
      this.getEditorState = this.getEditorState.bind(this)
      this.getSelectedData = this.getSelectedData.bind(this)
      this.getEmptyEidtorState = this.getEmptyEidtorState.bind(this)
      this.hideSidebar = this.hideSidebar.bind(this)
      this.state = {
        currentEditor: null,
        
        currentFileEditor: null,
        currentFileIdx: null,
        currentFolder: null,
        
        emptyEditor: null,
        sidebarHidden: false
      };
    }

    getEditorState(state) {
      this.setState({currentEditor: state});
    }

    getSelectedData(data, idx) {
      //is aysinc
      if (data === null && idx === null) {
        this.setState({
          currentFileEditor: null,
          currentFileIdx: null,
          currentFolder: null
        })
      } else {
        this.setState({
          currentFileEditor: data.fileEditorState, 
          currentFileIdx: idx,
          currentFolder: data
        })
      }
    }
    
    getEmptyEidtorState(data) {
      this.setState({emptyEditor: data})
    }
    
    hideSidebar() {
      let hidden = !this.state.sidebarHidden
      this.setState({sidebarHidden: hidden});
      console.log(this.state.sidebarHidden)
    }

    render() {
      return (
        <section id="Notes">
          <FileHeader 
            currentFileIdx={this.state.currentFileIdx}
            currentFolder={this.state.currentFolder}
          />
          <div id="editor-holder">

            <NoteContext.Provider value={{
              //send data from notes
              newEditorState: this.state.currentEditor, 

              currentFileEditor: this.state.currentFileEditor,
              currentFileIdx: this.state.currentFileIdx,
              currentFolder: this.state.currentFolder,
              emptyEditor: this.state.emptyEditor,
              //get data via callback
              sendSelectedData: this.getSelectedData,
              sendEditorState: this.getEditorState
            }}
            >
              <Sidebar
                currentFileIdx={this.state.currentFileIdx}
                currentEditorState={this.state.currentEditor} 
                sendSelectedData={this.getSelectedData}
                isHidden={this.state.sidebarHidden}
              />
              <div id="Editor" className={this.state.sidebarHidden ? "editorQuarterWidth" : "editorFullWidth"}>
                <div className="left">
                  <div id="hideSidebar" onClick={this.hideSidebar}>
                    <Arrow />
                  </div>
                </div>
                <div className="editorHolder">
                  <CustomEditor
                    sendEmptyEidtorState={this.getEmptyEidtorState}
                    sendState={this.getEditorState}

                    currentFolder={this.state.currentFolder}
                    currentFileIdx={this.state.currentFileIdx}
                  />
                </div>
                <div className="right">
                
                </div>
              </div> 
            </NoteContext.Provider>

          </div>
        </section>
      ); 
  }
}

export default Notes;