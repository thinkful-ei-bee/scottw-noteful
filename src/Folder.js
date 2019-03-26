import React from 'react';
import { Link } from 'react-router-dom';

export default function Folder(props) {

  const element = props.selected ? 
    <div className='selected-folder-div'>
      <Link to={`/folder/${props.id}`}>
      <h3>{props.name}</h3>
      </Link>
    </div>
    :
    <div className='folder-div'>
      <Link to={`/folder/${props.id}`}>
      <h3>{props.name}</h3>
      </Link>
    </div>
    ;
  
  return (
    element
  );
}