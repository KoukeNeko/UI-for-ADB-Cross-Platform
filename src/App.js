import React from "react";
import { Command } from "@tauri-apps/api/shell";
import "./App.css";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Uninstall from "./screens/Uninstall";
import DeviceList from "./screens/DevicesList";
import Log from "./screens/Log";

function App() {
  const [devices, setDevices] = React.useState([]);

  React.useEffect(() => {
    const getCMD = async () => {
      let output = await new Command("devicesList", ["devices"]).execute();
      const devicesList = await String(output.stdout).split("\n");
      let devices = [];
      // console.warn(devicesList.length);
      if (devicesList.length > 2) {
        for (let i = 1; i < devicesList.length; i++) {
          if (!devicesList[i].endsWith("offline\n")){
            const item = devicesList[i].split("device")[0].trim();
            if(item !== "")
              devices.push(item)
          }
            
        }
        setDevices(devices);
      }else{
        setDevices([])
        localStorage.setItem("device", JSON.stringify([]))
      }
    };

    getCMD();
    setInterval(() => {
      getCMD();
      // console.log("Fetching devices...");
    }, 5000);
  },[]);

  React.useEffect(() => {
    localStorage.setItem("device", JSON.stringify(devices));
  }, [devices]);

  return (
    <BrowserRouter>
      <div className="MainContainer">
        <Sidebar />
        <Routes>
          <Route path="/" element={<DeviceList />} />
          <Route path="/uninstall" element={<Uninstall />} />
          <Route path="/Log" element={<Log />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
