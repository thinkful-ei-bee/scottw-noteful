//refactored for noteful-server

import React, {Component} from 'react';
import Folder from './Folder';
import Note from './Note';
import StateContext from './StateContext';
import AddFolderButton from './addFolderButton';
import AddNoteButton from './addNoteButton';

import NoteError from  './NoteError';
import FolderError from './FolderError';

export default class MainRoute extends Component {

  static contextType = StateContext;
  
  render(props) {
    
    const {folders, notes} = this.context;

    const folderList = folders.map(folder => 
        <FolderError key={folder.id}><Folder key={folder.id} id={folder.id} name={folder.folder_name} /></FolderError>)

    const noteList = notes.map(note =>
        <NoteError key={note.id}><Note key={note.id} id={note.id} name={note.note_name} modified={note.modified}/></NoteError>)
    
    
    return (
      <>
        <div className="sidebar">
          {folderList}
          <AddFolderButton />
        </div>
        <main role="main" className="main">
          {noteList}
          <AddNoteButton folderUrl=''/>
        </main>
      </>
    );
  }
}