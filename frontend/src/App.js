import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import StockChart from './components/StockChart';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Stock Chart</h1>
        </header>
        <StockChart />
      </div>
    );
  }
}

export default App;
