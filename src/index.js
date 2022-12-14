import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProSidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";


import Sidebar from "./components/Sidebar";
import App from "./App";
import Uninstall from "./screens/Uninstall";
import DeviceList from "./screens/DevicesList";

import { appWindow } from "@tauri-apps/api/window";

document
  .getElementById("titlebar-minimize")
  .addEventListener("click", () => appWindow.minimize());
// document
//   .getElementById('titlebar-maximize')
//   .addEventListener('click', () => appWindow.toggleMaximize())
document
  .getElementById("titlebar-close")
  .addEventListener("click", () => appWindow.close());

document.addEventListener('contextmenu', event => event.preventDefault());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
