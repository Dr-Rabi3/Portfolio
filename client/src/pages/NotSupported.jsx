import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo } from "react";
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
import { useNavigate } from "react-router-dom";

import classes from "../styles/not-supported.module.css";

const NotSupported = () => {
  const navigate = useNavigate();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {});

    const userAgent = navigator.userAgent.toLowerCase();
    const isMobile = /mobile|android|iphone|ipad|tablet/i.test(userAgent);
    const isSmallScreen = window.innerWidth <= 768;

    if (!isMobile && !isSmallScreen) {
      navigate("/");
    }
  }, [navigate]);

  const options = useMemo(
    () => ({
      fullScreen: {
        enable: false,
        zIndex: -1,
      },
      fpsLimit: 60, // Lower FPS for mobile
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true, // Disable hover on small screens
            mode: "grab",
          },
        },
        modes: {
          grab: {
            linked: 72,
          },
          push: {
            quantity: 2,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
        },
        detect_on: "window",
      },
      particles: {
        color: {
          value: "#f3fbff",
        },
        links: {
          color: "#f3fbff",
          distance: 160,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 1,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 100, // Smaller area for mobile
          },
          value: 200, // Fewer particles on mobile
        },
        opacity: {
          value: 0.71,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <>
      <div className={classes.container}>
        <Particles
          id="tsparticles"
          options={options}
          width="100%"
          height="100%"
        />
        <h1>Access Restricted</h1>
        <div>
          I'm sorry, This website is not supported on mobile devices, for best
          experience you can open it on your PC.
        </div>
      </div>
    </>
  );
};

export default NotSupported;
