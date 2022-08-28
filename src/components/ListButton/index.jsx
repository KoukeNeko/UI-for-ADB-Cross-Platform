import React from 'react'

export default function ListButton(props) {
  return (
    <div style={{
      backgroundColor: '#243b4a',
      display: 'flex',
      flexDirection: 'column',
      height: '55px',
      // width: "370px",
      justifyContent: 'space-evenly',
      fontSize: '15px',
      textAlign: 'left',
      borderRadius: '15px',
      paddingLeft: '10px',
      paddingRight: '10px',
      margin: "5px 10px",
      overflow: 'hidden',
      cursor: 'pointer',

  }}
  onClick={props.onClickFunction}
      >
      <div style={{ fontWeight: 'bold', width: '360px' }}>{props.title}</div>
      <div style={{ color: 'darkgrey' }}>{props.value}</div>
  </div>
  )
}
