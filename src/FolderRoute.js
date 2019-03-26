import React from 'react';
import Folder from './Folder';
import Note from './Note';

export default function FolderRoute(props) {

  const folderList = props.folders.map((folder) => {
    if (`/folder/${folder.id}` === props.match.url) {
      return <Folder selected={true} key={folder.id} id={folder.id} name={folder.name} />
    } else { 
      return <Folder key={folder.id} id={folder.id} name={folder.name} />
    }
})


  const noteList = props.notes.filter(note => `/folder/${note.folderId}` === props.match.url)
      .map(note => <Note key={note.id} name={note.name} modified={note.modified}/>)
  
  
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