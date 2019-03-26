import React, { Component } from 'react';
import dummyStore from './dummy-store';
import { Route } from 'react-router-dom';
import MainRoute from './Main';
import FolderRoute from './FolderRoute';
import NoteRoute from './Note';
import Header from './Header';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      dummyStore,
      selectedFolder: '',
      selectedNote: '',
    }
  }
  render() {
    return (
      <div className="App">

        <Header />

        <Route exact path='/'
          render={
            () => <MainRoute 
            folders={this.state.dummyStore.folders} 
            notes={this.state.dummyStore.notes} 
            />
          }
        />

        <Route exact path='/folder/:folderId'
          render={
            (props) => <FolderRoute 
            folders={this.state.dummyStore.folders}
            notes={this.state.dummyStore.notes}
            match={props.match}
            history={props.history}
            location={props.location}
            />
          }
        />

        <Route exact path='/note/:noteId'
          render={
            (props) => <NoteRoute
            folders={this.state.dummyStore.folders}
            notes={this.state.dummyStore.notes}
            match={props.match}
            history={props.history}
            location={props.location}
            />
          }
        />

      </div>
    );
  }
}

export default App;
