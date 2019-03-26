import React from 'react';
import { Link } from 'react-router-dom';

export default function Note(props) {

  const noteName = props.id ? (
    <Link to={`/note/${props.id}`}>
      <h2>{props.name}</h2>
    </Link>
    ):
    (<h2>{props.name}</h2>)
  
  return (
    <div className='note-div'>
      {noteName}
      <p>{props.modified}</p>
     <button className='delete-note-button' type='button'>Delete Note</button>
    </div>
  );
}