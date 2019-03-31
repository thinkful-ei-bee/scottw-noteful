import React from 'react';

export default React.createContext({
  folders: [],
  notes: [],
  error: '',
  addNote: (val) => {console.warn(`default handleAddNote received ${val}`)},
  addFolder: (val) => {console.warn(`default handleAddFolder received ${val}`)},
  deleteNote: (val) => {console.warn(`default deleteNote received ${val}`)},
  addError: (val) => {console.warn(`default addError received ${val}`)},
})