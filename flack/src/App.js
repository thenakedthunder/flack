import React from 'react';
import './App.css';

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
