import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { appWindow } from "@tauri-apps/api/window";

import DeviceList from '../src/components/DeviceList'

document
  .getElementById("titlebar-minimize")
  .addEventListener("click", () => appWindow.minimize());
// document
//   .getElementById('titlebar-maximize')
//   .addEventListener('click', () => appWindow.toggleMaximize())
document
  .getElementById("titlebar-close")
  .addEventListener("click", () => appWindow.close());

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
