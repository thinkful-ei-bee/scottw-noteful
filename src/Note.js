//refactored for noteful-app

import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Note.css';
import StateContext from './StateContext';
import PropTypes from 'prop-types';

export default class Note extends Component {

  static contextType = StateContext;

  handleDeleteNote(id) {
    fetch(`https://powerful-bastion-56224.herokuapp.com/api/notes/${id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': `application/json`
      }),
    })
      .then(res => {
        if (!res.ok) {
          return res.json()
            .then(error => {
              throw error
            })
        }
        //removing this line fixed the "unexpected end of json" problem
       // return res.json()
      })
        .then(data => {
          this.context.deleteNote(id);
        })
          .catch(err => {
            this.context.addError(err);
            console.error(err)
          })
  }

  render(props) {

    // const {folders, notes} = this.context;

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
      <button className='delete-note-button' type='button'
        onClick={() => this.handleDeleteNote(this.props.id)}>
        Delete Note
        </button>
      </div>
    );
  }
}

Note.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number.isRequired 
};