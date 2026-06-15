/* components/layout/LayoutShell.tsx */
"use client";

import { useState, useEffect } from "react";
import AnnouncementBar from "./AnnouncementBar";
import Navbar from "./Navbar";
import CartDrawer from "./CartDrawer";

export default function LayoutShell() {
  const [barVisible, setBarVisible] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("wanderpaw_announcement_closed")) {
      setBarVisible(false);
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--header-h",
      barVisible ? "100px" : "64px"
    );
  }, [barVisible]);

  const handleClose = () => {
    localStorage.setItem("wanderpaw_announcement_closed", "true");
    setBarVisible(false);
  };

  return (
    <>
      <AnnouncementBar visible={barVisible} onClose={handleClose} />
      <Navbar barVisible={barVisible} />
      <CartDrawer />
    </>
  );
}
