import React from 'react'
import { Command } from "@tauri-apps/api/shell";

export default function PackageInfo(props) {

    React.useEffect(() => {
        getPackageInfo = async () => {
            let output = await new Command("devicesInfo", ["-s", isViewNowIndex, "shell", "getprop"]).execute();
            const output_sp = await String(output.stdout);
        }})


    return (
        <div>Package Info</div>
    )
}
