import React from 'react';
import Note from './Note';

export default function NoteRoute(props) {
 
  

  let currentNote = props.notes.find(note => `/note/${note.id}` === props.match.url);



  const currentFolder = props.folders.find(folder=> folder.id === currentNote.folderId);


  return (
    <>
      <div className="sidebar">
        <button className='go-back-button'>Go back</button>
        <h2>{currentFolder.name}</h2>
      </div>
      <main role="main" className="main">
        <Note key={currentNote.id} name={currentNote.name} modified={currentNote.modified}/>
        <p>{currentNote.content}</p>
      </main>
    </>
  );
}