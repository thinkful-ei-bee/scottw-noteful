//refactored for noteful-server

import React, {Component} from 'react';
import StateContext from './StateContext';
import ValidationError from './ValidationError';

export default class AddFolder extends Component {

  static contextType = StateContext;

  state = {
    folder_name: '',
    nameValid: false,
    formValid: false,
    validationMessages: {
      name: '',
    }
  }

  validateName(fieldValue) {
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;

    const repeat = this.context.folders.find(folder => folder.folder_name === fieldValue)

    fieldValue = fieldValue.trim();
    if(fieldValue.length === 0) {
      fieldErrors.name = 'Name is required';
      hasError = true;
    } else if (fieldValue.length < 3) {
      fieldErrors.name = 'Name must be at least 3 characters long';
      hasError = true;
    } else if (repeat) {
      fieldErrors.name = `Folder '${repeat.folder_name}' already exists`;
      hasError = true;
    } else {
      fieldErrors.name = '';
      hasError = false;
    }
    this.setState({
      validationMessages: fieldErrors,
      nameValid: !hasError
    }, this.formValid );
  }
  //after checking on nameValid above, setting formValid 
  formValid() {
    this.setState({
      formValid: this.state.nameValid
    })
  }

  updateName(folder_name) {
    this.setState({folder_name}, () => {this.validateName(folder_name)});
  }




  // nameInput = React.createRef();

 

  handleAddFolder(event) {
    event.preventDefault();
    const newFolder = {
      //name: event.target['folder-name-input'].value,
      //name: this.nameInput.current.value,
      folder_name: this.state.folder_name
    }
    fetch('https://powerful-bastion-56224.herokuapp.com/api/folders', {
      method: 'POST',
      headers: new Headers({
        'Content-Type':'application/json'
      }),
      body: JSON.stringify(newFolder)
    })
      .then(res => {
        if (!res.ok) {
          return res.json()
            .then(error => {
              throw error
            })
        }
        return res.json()
      })
        .then(data => {

          this.context.addFolder(data)
        })
          .catch(err => {
            this.context.addError(err);
            console.error(err);
          })
  } 

  render(props) {

    // const {folders} = this.context;

    return (
      <>
        <div className="sidebar">
          <button className='go-back-button' onClick={() => this.props.history.goBack()}>Go back</button>
        </div>
        <main role="main" className="main">
          <section className='addFolder'>
            <h2>Create a folder</h2>
            <form onSubmit={(event) => {this.handleAddFolder(event); this.props.history.push('/')}}>
              <div className='field'>
                <label htmlFor='folder-name-input'>
                  Name
                </label>
                <input type='text' id='folder-name-input' 
                  onChange={event => this.updateName(event.target.value)}
                />
              </div>
              <ValidationError hasError={!this.state.nameValid} message={this.state.validationMessages.name} />
              <div className='buttons'>
                <button type='submit' disabled={!this.state.formValid}>
                  Add folder
                </button>
              </div>
            </form>
          </section>
        </main>
      </>
    );
  }
}



