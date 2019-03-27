import React, {Component} from 'react';
import Folder from './Folder';
import Note from './Note';
import StateContext from './StateContext';

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
          <button className='add-folder-button'>Add folder</button>
        </div>
        <main role="main" className="main">
          {noteList}
          <button className='add-note-button'>Add note</button>
        </main>
      </>
    );
  }
}