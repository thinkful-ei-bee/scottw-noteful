import React, {Component} from 'react';
import Folder from './Folder';
import Note from './Note';
import StateContext from './StateContext';
import AddFolderButton from './addFolderButton';
import AddNoteButton from './addNoteButton';

export default class MainRoute extends Component {

  static contextType = StateContext;
  
  render(props) {
    
    const {folders, notes} = this.context;

    const folderList = folders.map(folder => 
        <Folder key={folder.id} id={folder.id} name={folder.name} />)

    const noteList = notes.map(note =>
        <Note key={note.id} id={note.id} name={note.name} modified={note.modified}/>)
    
    
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