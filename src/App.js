import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import createCardAPI from './FreeCell';


const cardAPI = createCardAPI()();
console.log('cardAPI: ', cardAPI);


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">FreeCell</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
