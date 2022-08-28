import React from "react";
import { Command } from "@tauri-apps/api/shell";
import { RotateSpinner as Spinner, StageSpinner } from "react-spinners-kit";

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import ListButton from "../ListButton";

export default function DeviceList() {
    const [devices, setDevices] = React.useState([]);
    const [isViewNowIndex, setIsViewNowIndex] = React.useState("");
    const [currentInfo, setCurrentInfo] = React.useState([]);
    const [buttons, setButtons] = React.useState({
        key: "Copy Key!",
        value: "Copy Value!",
    });
    const [state, setState] = React.useState({
        isLoading: true,
        isLoading_Message: "Fetching Device List",
        isLoading_Detial: true,

    });

    React.useEffect(() => {
        if (isViewNowIndex === "" || isViewNowIndex === undefined) {
            setIsViewNowIndex(devices[0])
            console.log("Auto Setting isViewNowIndex to " + devices[0])
        }
    }, [devices])

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
            let temp = output_sp.split("\n");
            for (let i = 0; i < temp.length; i++) {
                temp[i] = temp[i].split(":").map(item => item.replace('[', '').replace(']', ''))
                const title = temp[i][0]
                const value = temp[i][1]
                temp[i] = <ListButton title={title} value={value} onClickFunction={() => {
                    const MySwal = withReactContent(Swal)
                    MySwal.fire({
                        title: <p>{title}</p>,
                        html: <h3>{value}</h3>,
                        showCancelButton: true,
                        showDenyButton: true,
                        focusConfirm: false,
                        confirmButtonText: `<i class="fa-solid fa-copy"></i> ${buttons['value']}`,
                        confirmButtonAriaLabel: 'Copy Value!',
                        denyButtonText: `<i class="fa-solid fa-copy"></i> ${buttons['key']}`,
                        cancelButtonText: 'Close',
                        cancelButtonAriaLabel: 'Close',
                        background: "#2d4654",
                        color: "#fff",
                        customClass: {
                            popup: "popup-window-alert"
                        },
                        preConfirm: () => {

                            const copy = async () => {
                                await navigator.clipboard.writeText(value)
                            }
                            copy()
                            return false; // Prevent confirmed
                        },
                        preDeny: () => {
                            const copy = async () => {
                                await navigator.clipboard.writeText(title)
                            }
                            copy()
                            return false;
                        }
                    })
                }}
                />
            }
            setCurrentInfo(temp);

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
                    overflow: "hidden",
                    // overflowX: "hidden",
                    // marginLeft: "-1px",
                }}>
                    {/* detials */}
                    <h3>Debug Device Info</h3>
                    {state.isLoading_Detial
                        ?
                        <div style={{ display: "flex", alignContent: "center", padding: "35%0 0 47%" }}><StageSpinner size={30} color="#fff" loading={true} /></div>
                        :
                        <div style={{
                            overflowX: "hidden",
                            overflowY: "scroll",
                            height: "380px",

                            // borderRadius: "15px",
                            // backgroundColor: "rgba(255, 255, 255, 0.5)",

                        }}>
                            {currentInfo}
                        </div>}

                </div>
            </div>

    )
}
