import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import StateContext from './StateContext';

export default class Header extends Component {

  static contextType = StateContext;

  render() {

    const {error} = this.context;

    const errorMessage = error ? <p className='errorMessage'>{error}</p> : <></> 
  
    return (
      <header className="App-header">
        <Link to="/" >
          <h1>Noteful</h1>
          {errorMessage}
        </Link>
      </header>
    );
  }
}