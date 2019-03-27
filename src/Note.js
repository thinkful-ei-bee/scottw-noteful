import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Note.css';

export default class Note extends Component {

  render(props) {
    const noteName = this.props.id ? (
      <Link to={`/note/${this.props.id}`}>
        <h2>{this.props.name}</h2>
      </Link>
      ):
      (<h2>{this.props.name}</h2>)
    
    return (
      <div className='note-div'>
        {noteName}
        <p>{this.props.modified}</p>
      <button className='delete-note-button' type='button'>Delete Note</button>
      </div>
    );
  }
}