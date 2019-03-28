import React from 'react';

export default React.createContext({
  folders: [],
  notes: [],
  error: '',
  handleAddNote: (val) => {console.warn(`default handleAddNote received ${val}`)},
  handleAddFolder: (val) => {console.warn(`default handleAddFolder received ${val}`)},

  deleteNote: (val) => {console.warn(`default deleteNote received ${val}`)},
})