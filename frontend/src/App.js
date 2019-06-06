import React from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './tictactoe/Game'

function App() {
  return (
    <div >
      <img src={logo} className="App-logo" alt="logo" />
      <Game/>
    </div>
  );
}

export default App;
