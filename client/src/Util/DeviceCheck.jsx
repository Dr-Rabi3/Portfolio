// src/Util/DeviceCheck.jsx

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DeviceCheck = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /mobile|android|iphone|ipad|tablet/i.test(userAgent);
    if (isMobile) {
      // Redirect to a "not supported" page if on a mobile device
      navigate("/not-supported"); // Use navigate instead of history.push
    }
  }, [navigate]);

  return <>{children}</>; // Render children if not a mobile device
};

export default DeviceCheck;
