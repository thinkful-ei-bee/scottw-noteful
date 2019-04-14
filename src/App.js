//refactored for noteful-server

import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import MainRoute from './Main';
import FolderRoute from './FolderRoute';
import NoteRoute from './NoteRoute';
import Header from './Header';
import StateContext from './StateContext';
import AddNote from './addNote';
import AddFolder from './addFolder';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      folders: [],
      notes: [],
      error: '',
    }
  }


  // body = {whatever}
  // fetch('url', {
  //   method: 'POST',
  //   body: JSON.stringify(body),
  //   headers: {
  //     'Content-type': 'application/json'
  //   }
  // })

  componentDidMount() {
    Promise.all([
      fetch('http://localhost:8000/api/folders'),
      fetch('http://localhost:8000/api/notes'),
    ])
      .then(([folderRes, noteRes]) => {
        if (!folderRes.ok) {
          return folderRes.json()
            .then(error => {
              throw error
            })
        }
        if (!noteRes.ok) {
          return noteRes.json()
            .then(error => {
              throw error
            })
        }
        return Promise.all([
          folderRes.json(),
          noteRes.json(),
        ])
      })
        .then(([folderData, noteData]) => {
          this.setState({
            folders: folderData,
            notes: noteData,
          })
        })
          .catch(err => {
            this.addError(err);
            console.error(err);
          })
  }

  addError(err) {
    this.setState({error: err.message})
  }

  addNote(newNote) {
    this.setState({notes: [...this.state.notes, newNote]})
  }

  addFolder(newFolder) {
    this.setState({folders: [...this.state.folders, newFolder]})
  }

  deleteNote(id) {
    const newNotes = this.state.notes.filter(note => note.id !== id)
    this.setState({notes: newNotes})
  }



  render() {

    return (

      <StateContext.Provider value={{
        folders: this.state.folders,
        notes: this.state.notes,
        error: this.state.error,
        addNote: this.addNote.bind(this),
        addFolder: this.addFolder.bind(this),
        deleteNote: this.deleteNote.bind(this),
        addError: this.addError.bind(this),
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

          <Route path='/addNote'
            component={AddNote}
          />

          <Route path='/addFolder'
            component={AddFolder}
          />

        </div>
      </StateContext.Provider>
    );
  }
}

export default App;
