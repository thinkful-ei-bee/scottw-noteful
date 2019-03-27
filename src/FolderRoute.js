import React, {Component} from 'react';
import Folder from './Folder';
import Note from './Note';

export default class FolderRoute extends Component {

  render(props) {

    const folderList = this.props.folders.map((folder) => {
      if (`/folder/${folder.id}` === this.props.match.url) {
        return <Folder selected={true} key={folder.id} id={folder.id} name={folder.name} />
      } else { 
        return <Folder key={folder.id} id={folder.id} name={folder.name} />
      }
    })


    const noteList = this.props.notes.filter(note => `/folder/${note.folderId}` === this.props.match.url)
        .map(note => <Note key={note.id} id={note.id} name={note.name} modified={note.modified}/>)
    
    
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