import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Folder.css';

export default class Folder extends Component {

  render(props){

    const element = this.props.selected ? 
      <div className='selected-folder-div'>
        <Link to={`/folder/${this.props.id}`}>
        <h3>{this.props.name}</h3>
        </Link>
      </div>
      :
      <div className='folder-div'>
        <Link to={`/folder/${this.props.id}`}>
        <h3>{this.props.name}</h3>
        </Link>
      </div>
      ;
    
    return (
      element
    );
  }
}