import React from "react";
import { Command } from "@tauri-apps/api/shell";

export default function DeviceList() {
    const [devices, setDevices] = React.useState([]);
    const [devicesEle, setDevicesEle] = React.useState();
    const [isViewNowIndex, setIsViewNowIndex] = React.useState(1);

    // React.useEffect(() => {
    //     alert(isViewNowIndex)
    // },[isViewNowIndex])

    React.useEffect(() => {
        const getCMD = async () => {
            let output = await new Command("devicesList", ["devices"]).execute();
            const devices = await String(output.stdout).split("\n");
            setDevices(devices);
            return devices;
        };

        getCMD().then((devices) =>
            //make list to jsx
            setDevicesEle(devices.map((device, index) => {
                if(device !== "List of devices attached" && device !== '')
                    return (
                        <div style={{
                            backgroundColor: (isViewNowIndex === index) ? "#87bcde" : "#243b4a", 
                            height: "60px",
                            width: "auto",
                            overflow: "hidden",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            setIsViewNowIndex(index)
                            alert(isViewNowIndex === index, index)
                        }}
                        >
                            {device}{isViewNowIndex === index}
                        </div>
                    )
            }))
        );
    }, []);

    return <div style={{
        display: "flex",
        flexDirection: "row",
        position: "relative",
        height: "555px",
        width: "750px",
        left: 0,
        top: 45,
    }}>
        <div style={{
            width: "280px",
            display: "flex",
            flexDirection: "column",
            marginLeft: "50px",
            
        }}>
            {/* divice list */}
            <h2>Devices List</h2>
            {devicesEle}
        </div>
        <div style={{
            backgroundColor: "#87bcde",
            width: "60%",
            marginRight: "10%",
            marginBottom: "10%",
        }}>
            {/* detials */}
            <h2>Devices List</h2>
            {isViewNowIndex}
        </div>
    </div>;
}
