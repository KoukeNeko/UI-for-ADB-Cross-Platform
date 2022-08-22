import React from "react";
import { Twirl as Hamburger } from 'hamburger-react'
import { Link } from "react-router-dom";
import MenuListButton from "../MenuListButton";

export default function Sidebar(props) {
  const [isOpen, setOpen] = React.useState(false);
  const [mouseHoverItem, setMouseHoverItem] = React.useState("")
  const [currentPage, setCurrentPage] = React.useState("Home")

  const menuItemsStyle = {
    color: "#fff",
    textDecoration: "none",
  };

  return (
    <div
      className="Sidebar-Container"
      style={{
        width: isOpen ? "200px" : "50px",
        height: "600px",
        transition: "all 0.3s ease",
        overflow: "hidden",
      }}
      onMouseLeave={() => setOpen(false)}
      onMouseEnter={() => setOpen(true)}
    >
      <div className="Sidebar" style={{

      }}>
        <Hamburger toggled={isOpen} toggle={setOpen} size={20} color="#fff"/>
        <div
          style={{
            // paddingLeft: "15px",
            // marginTop: "15px",
            flexDirection: "column",
            display: "flex",
            // gap: "15px",
          }}
        >
          <Link to="/" style={menuItemsStyle} onMouseEnter={()=>setMouseHoverItem("Home")} onMouseLeave={()=>setMouseHoverItem("")} onClick={()=>setCurrentPage("Home")}>
            <MenuListButton name="Home" isMenuOpen={isOpen} icon="fa-solid fa-house" onMuse={mouseHoverItem} isSelected={currentPage === "Home"}/>
          </Link>
          <Link to="/uninstall" style={menuItemsStyle} onMouseEnter={()=>setMouseHoverItem("Uninstall")} onMouseLeave={()=>setMouseHoverItem("")} onClick={()=>setCurrentPage("Uninstall")}>
            <MenuListButton name="Uninstall" isMenuOpen={isOpen} icon="fa-solid fa-trash-can" onMuse={mouseHoverItem} isSelected={currentPage === "Uninstall"}/>
          </Link>

          <Link
            to="/settings"
            style={{
              color: "#fff",
              textDecoration: "none",
              position: "absolute",
              bottom: "15px",  
            }}
            onMouseEnter={()=>setMouseHoverItem("Setting")} onMouseLeave={()=>setMouseHoverItem("")} onClick={()=>setCurrentPage("Setting")}
          >
            <MenuListButton name="Setting" isMenuOpen={isOpen} icon="fa-solid fa-gear" onMuse={mouseHoverItem} isSelected={currentPage === "Setting"}/>
          </Link>
        </div>
      </div>
    </div>
  );
}
