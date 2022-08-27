import React from "react";
import { Command } from "@tauri-apps/api/shell";
import { RotateSpinner as Spinner, StageSpinner } from "react-spinners-kit";
import { faTruckMedical } from "@fortawesome/free-solid-svg-icons";

export default function DeviceList() {
    const [devices, setDevices] = React.useState([]);
    const [isViewNowIndex, setIsViewNowIndex] = React.useState("");
    const [currentInfo, setCurrentInfo] = React.useState([]);
    const [state, setState] = React.useState({
        isLoading: true,
        isLoading_Message: "Fetching Device List",
        isLoading_Detial: true,

    });

    React.useEffect(() => {
        if(isViewNowIndex === "" || isViewNowIndex === undefined){
            setIsViewNowIndex(devices[0])
            console.log("Auto Setting isViewNowIndex to " + devices[0])
        }
    },[devices])

    const TempList = ["R5CR30CVTZX device", "emulator-5554 device", "emulator-5556 device"]

    React.useEffect(() => {
        const getCMD = async () => {
            try {
                const output = localStorage.getItem("device");
                const devicesList = JSON.parse(output);

                if (devicesList.length > 0) {
                    console.log(devicesList)

                    setDevices(devicesList)
                        
                    
                    setState(pre => (
                        {
                            ...pre,
                            isLoading: false
                        }
                    ));

                } else {
                    console.log("devicesList.length !> 0")
                    setIsViewNowIndex("")
                    setState(pre => (
                        {
                            isLoading: true,
                            isLoading_Detial: true,
                            isLoading_Message: "No Devices. Try to Fetching again..",
                        }
                    ))
                }
            } catch (e) {
               console.error(e)
            }


        };

        setInterval(() => {
            console.log("isViewNowIndex=" + isViewNowIndex)
            getCMD()
            
            console.log("Fetching devices from localStorage...")
        }, 5000);
    }, []);

    React.useEffect(() => {

        setState(pre => (
            {
                ...pre,
                isLoading_Detial: true
            }
        ))

        const getCMD_Info = async () => {
            let output = await new Command("devicesInfo", ["-s", isViewNowIndex, "shell", "getprop"]).execute();
            const output_sp = await String(output.stdout);
            setCurrentInfo(output_sp);

        };
        getCMD_Info();
        setState(pre => (
            {
                ...pre,
                isLoading_Detial: false
            }
        ))

    }, [isViewNowIndex])

    function handleSelectDevices(device) {
        localStorage.setItem("selectedDevice", device);
        setIsViewNowIndex(device)
        // console.warn(device)
    }



    return (
        state.isLoading ?
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
                gap: '15px',

            }}>
                <div style={{ margin: "auto 0" }}><Spinner size={30} color="#fff" loading={true} /></div>
                <h3>{state.isLoading_Message}</h3>
            </div>
            :
            <div style={{
                display: "flex",
                flexDirection: "row",
                position: "relative",
                height: "555px",
                width: "750px",
                left: 0,
                top: 45,
                zIndex: 0
            }}>

                <div style={{
                    width: "280px",
                    display: "flex",
                    flexDirection: "column",
                    marginLeft: "30px",
                    gap: "10px",

                }}>

                    <h2>Device List</h2>

                    {

                        devices.map((device) => {
                            const index = device

                            if (device !== "List of devices attached" && device !== '')
                                return (
                                    <div
                                        key={index}
                                        style={{
                                            backgroundColor: (isViewNowIndex === index) ? "#87bcde" : "#243b4a",
                                            height: "45px",
                                            marginRight: "15px", // to fix wired shader issue
                                            width: "auto",
                                            overflow: "hidden",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            cursor: "pointer",
                                            transition: "all 200ms linear",
                                            zIndex: (isViewNowIndex === index) ? 1000 : 1,
                                            borderRadius: "15px",
                                            boxShadow: "0px 0px 5px 1px rgba(0, 0, 0, .4) ",


                                        }}
                                        onClick={() => {
                                            handleSelectDevices(device)
                                        }}
                                    >
                                        {device}
                                    </div>
                                )
                        })
                    }
                </div>
                <div style={{
                    backgroundColor: "#87bcde",
                    width: "60%",
                    marginRight: "6%",
                    marginBottom: "10%",
                    zIndex: 100,
                    boxShadow: "0px 0px 5px 1px rgba(0, 0, 0, .4) ",
                    borderRadius: "15px",
                    overflow: "hidde",
                    // marginLeft: "-1px",
                }}>
                    {/* detials */}
                    <h2>Device Info</h2>
                    {state.isLoading_Detial ? <div style={{ display: "flex", alignContent: "center", padding: "35%0 0 47%" }}><StageSpinner size={30} color="#fff" loading={true} /></div> : currentInfo}

                </div>
            </div>

    )
}
