import React from 'react'

import ListButton from '../ListButton'

export default function PackageList(props) {
  return (
    <div style={{
        overflowX: "hidden",
        overflowY: "scroll",
        height: props.height,

        // borderRadius: "15px",
        // backgroundColor: "rgba(255, 255, 255, 0.5)",

    }}>
        <ListButton />
        <ListButton />
        <ListButton />
        <ListButton />
        <ListButton />
        <ListButton />
        <ListButton />
        <ListButton />
        <ListButton />
        <ListButton />
        <ListButton />
        <ListButton />
    </div>
  )
}
