//refactored for noteful-server

import React, {Component} from 'react';
import Note from './Note';
import StateContext from './StateContext';

export default class NoteRoute extends Component {

  static contextType = StateContext;
  
  render(props) {

    const {folders, notes} = this.context;
 
    let currentNote = notes.find(note => `/note/${note.id}` === this.props.match.url);

    const currentFolder = folders.find(folder=> folder.id === currentNote.folder_id);

    return (
      <>
        <div className="sidebar">
          <button className='go-back-button' onClick={() => this.props.history.goBack()}>Go back</button>
          <h2>{currentFolder.folder_name}</h2>
        </div>
        <main role="main" className="main">
          <Note key={currentNote.id} name={currentNote.note_name} modified={currentNote.modified}/>
          <p>{currentNote.content}</p>
        </main>
      </>
    );
  }
}