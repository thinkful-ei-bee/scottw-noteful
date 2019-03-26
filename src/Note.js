import React from 'react';

export default function Note(props) {
  
  return (
    <div className='note-div'>
    <h2>{props.name}</h2>
    <p>{props.modified}</p>
    <button className='delete-note-button' type='button'>Delete Note</button>
    </div>
  );
}