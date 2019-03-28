import React, {Component} from 'react';
import StateContext from './StateContext';

export default class AddFolder extends Component {

  static contextType = StateContext;

  handleAddFolder(event) {
    event.preventDefault();
    const newFolder = {
      name: event.target['folder-name-input'].value,
    }
    fetch('http://localhost:9090/folders', {
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
            //this.setState({error: err.message})
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
                <input type='text' id='folder-name-input' />
              </div>
              <div className='buttons'>
                <button type='submit'>
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



