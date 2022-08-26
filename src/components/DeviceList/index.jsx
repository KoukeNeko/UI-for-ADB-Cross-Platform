import React from "react";
import { Command } from "@tauri-apps/api/shell";
import { RotateSpinner as Spinner} from "react-spinners-kit";
import { faTruckMedical } from "@fortawesome/free-solid-svg-icons";

export default function DeviceList() {
    const [devices, setDevices] = React.useState([]);
    const [isViewNowIndex, setIsViewNowIndex] = React.useState("");
    const [currentInfo, setCurrentInfo] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    // React.useEffect(() => {
    //     alert(isViewNowIndex)
    // },[isViewNowIndex])

    const TempList = ["R5CR30CVTZX device", "emulator-5554 device", "emulator-5556 device"]

    React.useEffect(() => {
        const getCMD = async () => {
            let output = await new Command("devicesList", ["devices"]).execute();
            const devicesList = await String(output.stdout).split("\n");
            let devices = []
            for(let i = 1 ; i < devicesList.length; i++) {
                devices.push(devicesList[i].split("device")[0].trim());
            }
            setDevices(devices);
            if (isViewNowIndex === "")
                setIsViewNowIndex(devices[0])
            setIsLoading(false);
            return devices

        };

        // getCMD()
        //     .then((devices => {
        //         setDevices(devices)
        //         
        //     }))


        setTimeout(() => {
            getCMD()
                // .then((devices => setDevices(devices)))
        }, 5000);
    });

    React.useEffect(() => {

        const getCMD_Info = async () => {
            let output = await new Command("devicesInfo", ["-s", isViewNowIndex, "shell", "getprop"]).execute();
            const output_sp = await String(output.stdout);
            setCurrentInfo(output_sp);
            // alert(output_sp);
        };
        getCMD_Info();

    }, [isViewNowIndex])

    

    return (
        isLoading ?
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
                gap: '15px',
                
            }}>
                <div style={{margin: "auto 0"}}><Spinner size={30} color="#fff" loading={true} /></div>
                <h3>Fetching Device List</h3>
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
        
                    <h2>Devices List</h2>
                    
                    {   
                        
                        devices.map((device) => {
                            const index = device
                            // if (isViewNowIndex === "")
                            //     setIsViewNowIndex(index)
        
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
                                            setCurrentInfo("Loading...");
                                            setIsViewNowIndex(device)
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
                    overflow: "scroll",
                    // marginLeft: "-1px",
                }}>
                    {/* detials */}
                    <h2>Devices Info</h2>
                    {isViewNowIndex}
                    {currentInfo}
                    
                </div>
            </div>
        
    )
}
