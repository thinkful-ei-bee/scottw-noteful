import React, {Component} from 'react';
import StateContext from './StateContext';

export default class AddNote extends Component {

  static contextType = StateContext;

  render(props) {

    const {folders} = this.context;

    const currentFolder = folders.find(folder=> 
        `/addNote/folder/${folder.id}` === this.props.location.pathname);

    const folderValue = currentFolder ? currentFolder.id : null

    const folderOption = currentFolder ? currentFolder.name : '...'
    

    return (
      <>
        <div className="sidebar">
          <button className='go-back-button' onClick={() => this.props.history.goBack()}>Go back</button>
          <h2>{folderOption}</h2>
        </div>
        <main role="main" className="main">
          <section className='addNote'>
            <h2>Create a note</h2>
            <form onSubmit={(event) => {this.context.handleAddNote(event); this.props.history.push('/')}}>
                <div className='field'>
                  <label htmlFor='note-name-input'>
                    Name
                  </label>
                  <input type='text' id='note-name-input' />
                </div>
                <div className='field'>
                  <label htmlFor='note-content-input'>
                    Content
                  </label>
                  <textarea id='note-content-input' />
                </div>
                <div className='field'>
                  <label htmlFor='note-folder-select'>
                    Folder
                  </label>
                  <select id='note-folder-select'>
                    <option value={folderValue}>{folderOption}</option>
                    {folders.map(folder =>
                      <option key={folder.id} value={folder.id}>
                        {folder.name}
                      </option>
                    )}
                  </select>
                </div>
                <div className='buttons'>
                  <button type='submit'>
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



