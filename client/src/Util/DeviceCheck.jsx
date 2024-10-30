import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DeviceCheck = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile = /mobile|android|iphone|ipad|tablet/i.test(userAgent);
      const isSmallScreen = window.innerWidth <= 768;

      if (isMobile || isSmallScreen) {
        // Navigate to the "not supported" page only once if the device is unsupported
        navigate("/not-supported", { replace: true });
      } else navigate("/");
    };

    checkDevice(); // Initial device check on component mount
    window.addEventListener("resize", checkDevice); // Check again on window resize

    return () => {
      window.removeEventListener("resize", checkDevice); // Clean up on unmount
    };
  }, [navigate]);

  return <>{children}</>; // Render children if device is supported
};

export default DeviceCheck;
