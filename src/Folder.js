import React from 'react';
import { Link } from 'react-router-dom';

export default function Folder(props) {
  
  return (
    <div className='folder-div'>
    <Link to={`/folder/${props.id}`}>
    <h3>{props.name}</h3>
    </Link>
    </div>
  );
}