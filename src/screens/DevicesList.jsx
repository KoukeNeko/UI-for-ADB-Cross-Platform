import React from "react";
import { Routes, Route, Link } from "react-router-dom";


import DeviceList from '../components/DeviceList'


function App() {

  return (
    <>
      <div className="App">
        <header className="App-header">
          <DeviceList />
        </header>
      </div>
    </>
  );
}

export default App;
