import React from "react";
import DesktopHeaderNavLinks from "./DesktopHeaderNavLinks";

const DesktopHeader = ({ page }) => {
    let open = true
    return (
        <DesktopHeaderNavLinks page={page} open={open} />
    )
}

export default DesktopHeader;