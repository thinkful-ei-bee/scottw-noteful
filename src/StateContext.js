import React from 'react';

export default React.createContext({
  folders: [],
  notes: [],
  error: '',
  handleAddNote: () => {},
  handleAddFolder: () => {},
})