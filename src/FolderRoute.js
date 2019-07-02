//refactored for noteful-server

import React, {Component} from 'react';
import Folder from './Folder';
import Note from './Note';
import StateContext from './StateContext';
import AddFolderButton from './addFolderButton';
import AddNoteButton from './addNoteButton';
import NoteError from './NoteError';
import FolderError from './FolderError';

export default class FolderRoute extends Component {

  static contextType = StateContext;

  render(props) {

    const {folders, notes} = this.context;

    const folderList = folders.map((folder) => {
      if (`/folder/${folder.id}` === this.props.match.url) {
        return <FolderError><Folder selected={true} key={folder.id} id={folder.id} name={folder.folder_name} /></FolderError>
      } else { 
        return <FolderError><Folder key={folder.id} id={folder.id} name={folder.folder_name} /></FolderError>
      }
    })


    const noteList = notes.filter(note => `/folder/${note.folder_id}` === this.props.match.url)
        .map(note => <NoteError><Note key={note.id} id={note.id} name={note.note_name} modified={note.modified}/></NoteError>)
    
    
    return (
      <>
        <div className="sidebar">
          <button className='go-back-button' onClick={() => this.props.history.goBack()}>Go back</button>
          {folderList}
          <AddFolderButton />
        </div>
        <main role="main" className="main">
          {noteList}
          <AddNoteButton folderUrl={this.props.match.url} />
        </main>
      </>
    );
  }
}