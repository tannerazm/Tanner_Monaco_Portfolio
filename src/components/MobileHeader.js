import React, { useState } from "react";
import { MdOutlineMenu, MdOutlineClose } from "react-icons/md";
import MobileHeaderNavLinks from "./MobileHeaderNavLinks";

const MobileHeader = ({ page }) => {
  const [open, setOpen] = useState(false);

  const hamburgerIcon = (
      <MdOutlineMenu
        className="headerHamburgerIcon"
        onClick={() => {
          setOpen(true);
        }}
      />
  );

  const closeIconWithLinks = (
      <MdOutlineClose
        className="headerCloseIcon"
        onClick={() => {
          setOpen(false);
        }}
      />
  );

  return (
    <nav className="mobileNavHeaderHamburgerIcon">
      {!open ? hamburgerIcon : closeIconWithLinks}
      {open && <MobileHeaderNavLinks open={open} page={page} />}
    </nav>
  );
};

export default MobileHeader;
