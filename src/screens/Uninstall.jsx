import React from 'react'
import { Command } from '@tauri-apps/api/shell';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import PackageList from '../components/PackageList/';
import PackageInfo from '../components/PackageInfo';

import PhoneSelectButton from '../components/PhoneSelectButton';

export default function Uninstall() {

  

  const [devices, setDevices] = React.useState([])
  const [selected, setSelected] = React.useState({
    devices: localStorage.getItem("selectedDevice"),
    packages: ""
  })

  React.useEffect(() => {

    setDevices(JSON.parse(localStorage.getItem("device")) , 5000)
    //get Device list
    setInterval(() => setDevices(JSON.parse(localStorage.getItem("device"))) , 5000)

  },[])

  // React.useEffect(() => {
  //   const getCMD = async () => {
  //     let output = await new Command('applist').execute();
  //     const outputList = await String(output.stdout).split("\n");
  //     setPackages(output.stdout)
  //   }
  //   getCMD()
  // },[selected])


  // const handleChangeSelectedDevice = (device) => {
  //   setSelected({
  //     ...selected,
  //     devices: device
  //   })
  //   localStorage.setItem("selectedDevice", device)
  // }

  return (
    <>
      <div className="App">
        <header className="App-header">
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
            height: '90vh',
            width: '90%',
            gap: "20px",
            paddingTop: "70px",
            // backgroundColor: 'rgba(255,255,255,0.5)',
          }}>
            <div>
              {devices.map((device, index) => {
                return (
                  <PhoneSelectButton isselected={selected.devices} name={device}/>
                )
              })}
            </div>
            <div style={{
                    backgroundColor: "#87bcde",
                    width: "560px",
                    // marginRight: "6%",
                    marginBottom: "10%",
                    zIndex: 100,
                    boxShadow: "0px 0px 5px 1px rgba(0, 0, 0, .4) ",
                    borderRadius: "15px",
                    overflow: "hidden",
                    // overflowX: "hidden",
                    // marginLeft: "-1px",
                }}>
  
                <h3>Package List</h3>
                <PackageList height="330px" device={selected.devices} onClickFunction={()=> {
                  
                }}/>
                
              </div>
            {/* <PackageInfo /> */}
          </div>
        </header>
      </div>
    </>
  )
}
