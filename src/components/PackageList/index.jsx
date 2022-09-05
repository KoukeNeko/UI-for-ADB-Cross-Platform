import React from 'react'
import { Command } from '@tauri-apps/api/shell';

import ListButton from '../ListButton'

export default function PackageList(props) {

  const [packages, setPackages] = React.useState([])

  React.useEffect(() => {
     const getPackageInfo = async () => {
            let output = await new Command("applist", ["-s", props.device, "shell","pm","list","packages"]).execute();
            const output_sp = await String(output.stdout).split("\n");
            output_sp.map((item, index) => {
              output_sp[index] = item.replace("package:", "")
            })
            console.log(output_sp)
            setPackages(output_sp)
     }
     getPackageInfo()
  },[])

  return (
    <div style={{
        overflowX: "hidden",
        overflowY: "scroll",
        height: props.height,
        width: props.width,
        // borderRadius: "15px",
        // backgroundColor: "rgba(255, 255, 255, 0.5)",

    }}>
        {
          packages.map((package_, index) => {
            return (
              <ListButton
                key={index}
                title={package_}
                onClickFunction={props.onClickFunction}
                isselected={props.isselected}
              />
            )
          })
        }
    </div>
  )
}
