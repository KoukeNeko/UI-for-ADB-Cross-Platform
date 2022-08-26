import React from 'react'
import { Command } from '@tauri-apps/api/shell';


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
          {temp}
          
        </header>
      </div>
    </>
  )
}
