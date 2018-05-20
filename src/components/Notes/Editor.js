import React, { Component } from 'react';

import {
  //EditorState,
  convertToRaw, 
  convertFromRaw,
  EditorState
} from 'draft-js';

import Editor, {createEditorStateWithText} from 'draft-js-plugins-editor';

import createInlineToolbarPlugin, { Separator } from 'draft-js-inline-toolbar-plugin';
import createToolbarPlugin from 'draft-js-static-toolbar-plugin';

import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  // HeadlineOneButton,
  // HeadlineTwoButton,
  // HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from 'draft-js-buttons';

import 'draft-js/dist/Draft.css';
import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import 'draft-js-static-toolbar-plugin/lib/plugin.css';
import editorStyles from '../../styles/css/Notes/editorStyles.css';

const inlineToolbarPlugin = createInlineToolbarPlugin({
  structure: [
    BoldButton,
    ItalicButton,
    UnderlineButton,
    CodeButton,
    Separator,
    //HeadlinesButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton
  ]
});

const toolbarPlugin = createToolbarPlugin({
  structure: [
    BoldButton,
    ItalicButton,
    UnderlineButton,
    CodeButton,
    Separator,
    //HeadlinesButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton
  ]
});

const { InlineToolbar } = inlineToolbarPlugin;
const { Toolbar } = toolbarPlugin;
const plugins = [toolbarPlugin, inlineToolbarPlugin];
const text = '';

export default class CustomEditor extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      editorState: createEditorStateWithText("no file selected")
    };
  }
  
  onChange = (editorState) => {
    if (this.props.currentFolder === null) return
    this.setState({
      editorState: editorState
    });
    this.props.sendState(this.makeRaw(editorState));
  };
  
  componentDidUpdate(prevProps) {
    if (
        prevProps.currentFolder !== this.props.currentFolder ||
        prevProps.currentFileIdx !== this.props.currentFileIdx) {
      
      if (this.props.currentFolder === null || this.props.currentFileIdx === null) {
        this.setState({editorState: createEditorStateWithText("no file selected")});
      // } else if (
      //   this.props.currentFolder.fileList[this.props.currentFileIdx].fileEditorState === undefined) {
      //   console.log("file has no editor state")
      
      //if currentFolder has more than 0 files
      } else if (
        this.props.currentFolder.fileList.length > 0 && 
        this.props.currentFileIdx !== null &&
        this.props.currentFolder.fileList[this.props.currentFileIdx].fileEditorState !== undefined
      ) {
  
        const fromRaw = EditorState.createWithContent(
          convertFromRaw (
            this.props.currentFolder.fileList[this.props.currentFileIdx].fileEditorState
          )
        );
        this.setState({editorState: fromRaw});
        
      }
    }
  }
  
  makeRaw = (input) =>{
    const rawEditor = convertToRaw(input.getCurrentContent())
    return rawEditor
  }
  
  deselect = () => {
    this.setState({editorState: createEditorStateWithText("no file selected")});
    this.props.sendState(this.makeRaw(createEditorStateWithText("no file selected")));
  }
  
  componentDidMount() {
    this.props.sendEmptyEidtorState(this.makeRaw(createEditorStateWithText("empty file")));
  }
  
  focus = () => {
    this.editor.focus();
  };

  render() {
    return (
      <div className={editorStyles.editor} onClick={this.focus}>
        <Toolbar />
        <Editor
          editorState={this.state.editorState}
          onChange={this.onChange}
          plugins={plugins}
          ref={(element) => { this.editor = element; }}
        />
        <InlineToolbar />
      </div>
    );
  }
}

//selecting the right file: WORKING

//BUG: the current editor of a selected file is passed on to other files in other folders somehow
//it seemed to pass on the state to every file but the last file in the last folder

//error happends if you select a file but do not select its folder first