import React, {Component} from 'react';
import StateContext from './StateContext';
import ValidationError from './ValidationError'

export default class AddNote extends Component {

  static contextType = StateContext;

  state = {
    currentFolder: {name: 'Select a folder', id: ''},
    currentFolderNotes: [],
    selectedFolder: {name: 'Select a folder', id: ''},
    folderOptions: [],
    name: '',
    nameValid: false,
    content: '',
    contentValid: false,
    folderId: '',
    folderIdValid: false,
    validationMessages: {
      name: '',
      content: '',
      folderId: '',
    },
    formValid: false,
  }

  componentWillMount() {
    const currentFolder = this.context.folders.find(folder=> 
      `/addNote/folder/${folder.id}` === this.props.location.pathname);


    if (currentFolder) {
      const otherFolders = this.context.folders.filter(folder => folder.id !== currentFolder.id)
      this.setState({
        currentFolder,
        folderId: currentFolder.id,
        folderOptions: otherFolders,
        selectedFolder: currentFolder,
      });
    } else {
      this.setState({folderOptions: this.context.folders});
    }
   
  }

  validateName(fieldValue) {
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;

     const folderNotes = this.context.notes.filter(note => note.folderId === this.state.folderId);

     const repeat = folderNotes.find(note => note.name === fieldValue)

    fieldValue = fieldValue.trim();
    if(fieldValue.length === 0) {
      fieldErrors.name = 'Name is required';
      hasError = true;
    } else if (fieldValue.length < 3) {
      fieldErrors.name = 'Name must be at least 3 characters long';
      hasError = true;
    } else if (repeat) {
      fieldErrors.name = `Note '${fieldValue}' already exists in Folder '${this.state.selectedFolder.name}'`;
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

  
  validateFolderId(fieldValue) {
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;

    if(fieldValue.length === 0) {
      fieldErrors.folderId = 'Must select a folder';
      hasError = true;
    } else {
      fieldErrors.folderId = '';
      hasError = false;
    }
    this.setState({
      validationMessages: fieldErrors,
      folderIdValid: !hasError
    }, this.formValid );

  }

  validateContent(fieldValue) {
    const fieldErrors = {...this.state.validationMessages};
    let hasError = false;

    if(fieldValue.length === 0) {
      fieldErrors.content = 'Content is required';
      hasError = true;
    } else {
      fieldErrors.content = '';
      hasError = false;
    }
    this.setState({
      validationMessages: fieldErrors,
      contentValid: !hasError
    }, this.formValid );
  }


  formValid() {
    this.setState({
      formValid: this.state.nameValid && this.state.folderIdValid && this.state.contentValid
    })
  }

  updateName(name) {
    this.setState({name}, () => {this.validateName(name)});
  }

  updateFolderId(folderId) {
    const selectedFolder = this.context.folders.find(folder => folder.id === folderId);
    this.setState({folderId, selectedFolder}, () => {this.validateFolderId(folderId)});
  }

  updateContent(content) {
    this.setState({content}, () => {this.validateContent(content)});
  }


  //trying to get it to validate again before submission but doesnt seem to work

  handleSubmit(event) {
    event.preventDefault();
    this.validateFolderId(this.state.folderId);
    this.validateContent(this.state.content);
    this.validateName(this.state.name);
    if(this.state.formValid) {
      this.handleAddNote();
      this.props.history.push('/');
    }
  }


  handleAddNote() {
    // event.preventDefault()
    const newNote = {
      name: this.state.name,
      folderId: this.state.folderId,
      content: this.state.content,
    }
    fetch('http://localhost:9090/notes', {
      method: 'POST',
      headers: new Headers({
        'Content-Type':'application/json'
      }),
      body: JSON.stringify(newNote)
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

          this.context.addNote(data)
        })
          .catch(err => {
            this.context.addError(err);
            console.error(err);
          })
  }


  //(event) => {this.handleAddNote(event); this.props.history.push('/')}

  render(props) {


    return (
      <>
        <div className="sidebar">
          <button className='go-back-button' onClick={() => this.props.history.goBack()}>Go back</button>
          <h2>{this.state.currentFolder.name}</h2>
        </div>
        <main role="main" className="main">
          <section className='addNote'>
            <h2>Create a note</h2>
            <form onSubmit={(event) => {this.handleSubmit(event)}}>
                <div className='field'>
                  <label htmlFor='note-name-input'>
                    Name
                  </label>
                  <input type='text' id='note-name-input' 
                    onChange={event => this.updateName(event.target.value)}
                  />
                  <ValidationError hasError={!this.state.nameValid} message={this.state.validationMessages.name} />
                </div>
                <div className='field'>
                  <label htmlFor='note-content-input'>
                    Content
                  </label>
                  <textarea id='note-content-input' 
                    onChange={event => this.updateContent(event.target.value)}
                  />
                  <ValidationError hasError={!this.state.contentValid} message={this.state.validationMessages.content} />
                </div>
                <div className='field'>
                  <label htmlFor='note-folder-select'>
                    Folder
                  </label>
                  <select id='note-folder-select' onChange={event => this.updateFolderId(event.target.value)}>
                    <option value={this.state.currentFolder.id}>{this.state.currentFolder.name}</option>
                    {this.state.folderOptions.map(folder =>
                      <option key={folder.id} value={folder.id}>
                        {folder.name}
                      </option>
                    )}
                  </select>
                  <ValidationError hasError={!this.state.folderIdValid} message={this.state.validationMessages.folderId} />
                </div>
                <div className='buttons'>
                  <button type='submit' disabled={!this.state.formValid}>
                    Add note
                  </button>
                </div>
              </form>
            </section>
        </main>
      </>
    );
  }
}



