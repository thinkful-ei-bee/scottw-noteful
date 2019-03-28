import React, {Component} from 'react';
import StateContext from './StateContext';

export default class AddFolder extends Component {

  static contextType = StateContext;

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
            <form onSubmit={(event) => {this.context.handleAddFolder(event); this.props.history.push('/')}}>
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



