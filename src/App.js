import React, { Component } from 'react';
import dummyStore from './dummy-store';
import { Route } from 'react-router-dom';
import MainRoute from './Main';
import FolderRoute from './FolderRoute';
import NoteRoute from './NoteRoute';
import Header from './Header';
import StateContext from './StateContext';

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

      <StateContext.Provider value={{
        folders: this.state.dummyStore.folders,
        notes: this.state.dummyStore.notes,
      }}>

        <div className="App">

          <Header />

          <Route exact path='/'
            component={MainRoute}
          />

          <Route exact path='/folder/:folderId'
            component={FolderRoute}
          />

          <Route exact path='/note/:noteId'
            component={NoteRoute}
          />

        </div>
      </StateContext.Provider>
    );
  }
}

export default App;
