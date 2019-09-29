import React from 'react';
import './App.css';
import Main from './components/Main.js';

function App() {
  return (
    <div>
    <div id="header">
      <h1>The Pirate Shop</h1>
    </div>
    <div id="main">
      <Main key="main"></Main>
    </div>
    </div>
  );
}

export default App;
