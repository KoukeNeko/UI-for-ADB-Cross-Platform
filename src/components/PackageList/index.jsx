import React from 'react'
import { Command } from '@tauri-apps/api/shell';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import ListButton from '../ListButton'

export default function PackageList(props) {

  const [packages, setPackages] = React.useState([])
  const [packageelement, setPackageElement] = React.useState()
  const [search, setSearch] = React.useState("")

  const getPackageInfo = async () => {
    let output = await new Command("applist", ["-s", props.device, "shell", "pm", "list", "packages"]).execute();
    const output_sp = await String(output.stdout).split("\n");
    output_sp.map((item, index) => {
      output_sp[index] = item.replace("package:", "")
    })
    // console.log(output_sp)
    setPackages(output_sp)
  }

  function handlePackageList() {
    getPackageInfo()
    
  }

  React.useEffect(() => {
    handlePackageList()
  }, [])
  
  React.useEffect(() => {
    setPackageElement(
      packages.map((package_, index) => {
        if (search === "") {
          return <ListButton
                key={index}
                title={package_}
                onClickFunction={() => handleClick(package_)}
                isselected={props.isselected}
              />
        }else{
          if (package_.toLowerCase().includes(search.toLowerCase())) {
            return <ListButton
                key={index}
                title={package_}
                onClickFunction={() => handleClick(package_)}
                isselected={props.isselected}
              />
          }
        }
      })
    )
  }, [packages, search])


  function handleLog(message) {
    const logArray = JSON.parse(localStorage.getItem("log")) || []
    logArray.unshift(message)
    localStorage.setItem("log", JSON.stringify(logArray))
  }

  function handleClick(item) {
    const MySwal = withReactContent(Swal)
    MySwal.fire({
      title: <p>{item}</p>,
      // html: <h3>{value}</h3>,
      showCancelButton: true,
      showDenyButton: true,
      focusConfirm: false,
      confirmButtonText: `<i class="fa-solid fa-trash-can"></i> Uninstall`,
      confirmButtonAriaLabel: 'Copy Value!',
      denyButtonText: `<i class="fa-solid fa-trash-can"></i> Uninstall (keep data)`,
      cancelButtonText: 'Close',
      cancelButtonAriaLabel: 'Close',
      background: "#2d4654",
      color: "#fff",
      customClass: {
        popup: "popup-window-alert"
      },
      preConfirm: () => {

        const Uninstall = async () => {
          let output = await new Command("appuninstall", ["-s", props.device, "shell", "pm", "uninstall","-k", "--user", "0", item]).execute();
          const output_sp = await String(output.stdout);
          return output_sp
        }

        Uninstall()
        .then((output) => {
          console.error(output)
          if (output.includes("Success")) {
            handleLog("Uninstall " + item + " Success")
            return MySwal.fire({
              title: <p>Success</p>,
              icon: "success",
              background: "#2d4654",
              color: "#fff",
              customClass: {
                popup: "popup-window-alert"
              },
            })
          }else{
            handleLog("Uninstall " + item + " Failed")
            return MySwal.fire({
              title: <p>Error</p>,
              icon: "error",
              background: "#2d4654",
              color: "#fff",
              customClass: {
                popup: "popup-window-alert"
              },
            })
          }
        })
        .finally(() => {
          handlePackageList()
        })
        // return false; // Prevent confirmed
      },
      preDeny: () => {
       
        const Uninstall = async () => {
          let output = await new Command("appuninstall", ["-s", props.device, "shell", "pm", "uninstall","", "--user", "0", item]).execute();
          const output_sp = await String(output.stdout);
          return output_sp
        }

        Uninstall()
        .then((output) => {
          console.error(output)
          if (output.includes("Success")) {
            handleLog("Uninstall " + item + " Success")
            return MySwal.fire({
              title: <p>Success</p>,
              icon: "success",
              background: "#2d4654",
              color: "#fff",
              customClass: {
                popup: "popup-window-alert"
              },
            })
          }else{
            handleLog("Uninstall " + item + " Failed")
            return MySwal.fire({
              title: <p>Error</p>,
              icon: "error",
              background: "#2d4654",
              color: "#fff",
              customClass: {
                popup: "popup-window-alert"
              },
            })
          }
        })
        .finally(() => {
          handlePackageList()
        })
        // return false; // Prevent confirmed
      }
    })
  }

  return (
    <>
      <div style={{
        overflowX: "hidden",
        overflowY: "scroll",
        height: props.height,
        width: props.width,
        // borderRadius: "15px",
        // backgroundColor: "rgba(255, 255, 255, 0.5)",

      }}>
        {
          // packages.map((package_, index) => {
          //   return (
          //     <ListButton
          //       key={index}
          //       title={package_}
          //       onClickFunction={() => handleClick(package_)}
          //       isselected={props.isselected}
          //     />
          //   )
          // })
          
          packageelement
          
        }
      </div>
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
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder='Search...'
          style={{
            backgroundColor: "transparent",
            borderWidth: "0",
            width: "100%",
            marginLeft: "10px",
            outline: "none",
          }} />
        <button style={{
          width: "50px",
          height: "40px",
          borderRadius: "15px",
          borderWidth: "0",
          backgroundColor: "#243b4a"
        }}>
          <i class="fa-solid fa-magnifying-glass" style={{ color: "white" }}></i>
        </button>
      </div>
    </>

  )
}
