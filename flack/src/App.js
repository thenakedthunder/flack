import React from 'react';
import logo from './logo.svg';
import './App.css';

import Grid from '@material-ui/core/Grid';
import ChannelListPanel from './ChannelListPanel/ChannelListPanel';
import DisplayNameDialog from './DisplayNameDialog/DisplayNameDialog';


function App() {
  return (
    <div className="App">
          <ChannelListPanel />
          <DisplayNameDialog />
    </div>
  );
}

export default App;
