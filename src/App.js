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

  componentDidMount() {
    Promise.all([
      fetch('http://localhost:9090/folders'),
      fetch('http://localhost:9090/notes'),
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
            this.setState({error: err.message});
            console.error(err);
          })
  }


  handleAddNote(event) {
    event.preventDefault()
    const newNote = {
      name: event.target['note-name-input'].value,
      folderId: event.target['note-folder-select'].value,
      content: event.target['note-content-input'].value,
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
          console.log(data)

          this.setState({notes: [...this.state.notes, data]})
        })
          .catch(err => {
            //this.setState({error: err.message})
            console.error(err);
          })
  }


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
          console.log(data)

          this.setState({folders: [...this.state.folders, data]})
        })
          .catch(err => {
            //this.setState({error: err.message})
            console.error(err);
          })
  } 



  render() {

    return (

      <StateContext.Provider value={{
        folders: this.state.folders,
        notes: this.state.notes,
        error: this.state.error,
        handleAddNote: this.handleAddNote.bind(this),
        handleAddFolder: this.handleAddFolder.bind(this),
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
