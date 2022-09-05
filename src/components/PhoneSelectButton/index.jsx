import React from 'react'

export default function PhoneSelectButton(props) {
  return (
    <div 
    onClick={props.onClickFunction}
    style={{
        backgroundColor: props.isselected === props.name ? "#87bcde" : "#2d4654",
        boxShadow: "0px 0px 5px 1px #87bcde ",
        height: "100px",
        width: "100px",
        borderRadius: "15px",
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        marginBottom: "10px",
    }}>
        <i class="fa-solid fa-mobile-android" style={{
            marginTop: "15%",
            marginBottom: "-15%",
            color: "white", 
            fontSize: "50px", 
            textAlign: "center"}}>
        </i>
        <h6 style={{
            fontSize: "10px",
        }}>
            {props.name}
        </h6>
    </div>
  )
}
