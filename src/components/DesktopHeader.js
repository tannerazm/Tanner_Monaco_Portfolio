import React from "react";
import DesktopHeaderNavLinks from "./DesktopHeaderNavLinks";

const DesktopHeader = ({ page, individualProject }) => {
    let open = true
    return (
        <DesktopHeaderNavLinks page={page} open={open} individualProject={individualProject} />
    )
}

export default DesktopHeader;