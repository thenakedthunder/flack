import React from 'react';
import logo from './logo.svg';
import './App.css';

import Grid from '@material-ui/core/Grid';
import ChanelListPanel from './ChanelListPanel/ChanelListPanel.js';
import DisplayNameDialog from './DisplayNameDialog/DisplayNameDialog.js';


function App() {
  return (
    <div className="App">
          <ChanelListPanel />
          <DisplayNameDialog />
    </div>
  );
}

export default App;
