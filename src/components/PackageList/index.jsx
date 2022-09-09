import React from 'react'
import { Command } from '@tauri-apps/api/shell';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import ListButton from '../ListButton'

export default function PackageList(props) {

  const [packages, setPackages] = React.useState([])
  const [packageelement, setPackageElement] = React.useState([])
  const [search, setSearch] = React.useState("")

  React.useEffect(() => {
    const getPackageInfo = async () => {
      let output = await new Command("applist", ["-s", props.device, "shell", "pm", "list", "packages"]).execute();
      const output_sp = await String(output.stdout).split("\n");
      output_sp.map((item, index) => {
        output_sp[index] = item.replace("package:", "")
      })
      console.log(output_sp)
      setPackages(output_sp)
    }
    getPackageInfo()

    setPackageElement(
      packages.map((package_, index) => {
          return <ListButton
                key={index}
                title={package_}
                onClickFunction={() => handleClick(package_)}
                isselected={props.isselected}
              />
      })
    )
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
          if (package_.includes(search)) {
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
  },[search])

  function handleClick(item) {
    const MySwal = withReactContent(Swal)
    MySwal.fire({
      title: <p>{item}</p>,
      // html: <h3>{value}</h3>,
      showCancelButton: true,
      showDenyButton: true,
      focusConfirm: false,
      confirmButtonText: `<i class="fa-solid fa-copy"></i> Uninstall`,
      confirmButtonAriaLabel: 'Copy Value!',
      denyButtonText: `<i class="fa-solid fa-copy"></i> Uninstall (keep data)`,
      cancelButtonText: 'Close',
      cancelButtonAriaLabel: 'Close',
      background: "#2d4654",
      color: "#fff",
      customClass: {
        popup: "popup-window-alert"
      },
      preConfirm: () => {

       
        return false; // Prevent confirmed
      },
      preDeny: () => {
       
        return false;
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
