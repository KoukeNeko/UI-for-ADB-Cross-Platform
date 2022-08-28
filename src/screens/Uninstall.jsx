import React from 'react'
import { Command } from '@tauri-apps/api/shell';

import PackageList from '../components/PackageList/';
import PackageInfo from '../components/PackageInfo';

export default function Uninstall() {

  

  const [temp, setTemp] = React.useState("")

  React.useEffect(() => {
    const getCMD = async () => {
      let output = await new Command('run-git-commit').execute();
      setTemp(output.stdout)
    }
     getCMD()
  },[])

  

  return (
    <>
      <div className="App">
        <header className="App-header">
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
            // height: '100vh',
            // width: '100%',
            gap: "15px",
            paddingTop: "70px",
            // backgroundColor: 'rgba(255,255,255,0.5)',
          }}>
            <div style={{
                    backgroundColor: "#87bcde",
                    width: "60%",
                    marginRight: "6%",
                    marginBottom: "10%",
                    zIndex: 100,
                    boxShadow: "0px 0px 5px 1px rgba(0, 0, 0, .4) ",
                    borderRadius: "15px",
                    overflow: "hidden",
                    // overflowX: "hidden",
                    // marginLeft: "-1px",
                }}>
                <h3>Package List</h3>
                <PackageList height="330px"/>
                <div style={{
                    width: "95%",
                    height: "30px",
                    margin: "10px auto",
                    borderRadius: "15px",
                    borderWidth: "0",
                    backgroundColor: "white",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    // overflow: "hidden",
                  }} >
                  <input 
                  placeholder='Search...'
                  style={{
                    backgroundColor: "transparent",
                    borderWidth: "0",
                    width: "100%",
                    marginLeft: "10px",
                    outline: "none",
                  }}>
                  </input>
                  <button style={{
                    width: "50px",
                    height: "40px",
                    borderRadius: "15px",
                    borderWidth: "0",
                    backgroundColor: "#243b4a"
                  }}>
                    <i class="fa-solid fa-magnifying-glass" style={{color: "white"}}></i>
                  </button>
                </div>
              </div>
            <PackageInfo />
          </div>
        </header>
      </div>
    </>
  )
}
