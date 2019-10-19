import React from 'react';
import logo from './logo.svg';
import './App.css';

import Grid from '@material-ui/core/Grid';
import ChannelListPanel from './ChannelListPanel/ChannelListPanel.js';
import DisplayNameDialog from './DisplayNameDialog/DisplayNameDialog.js';


function App() {
  return (
    <div className="App">
          <ChannelListPanel />
          <DisplayNameDialog />
    </div>
  );
}

export default App;
