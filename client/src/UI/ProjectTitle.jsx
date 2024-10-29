// for edit Particles :  https://vincentgarreau.com/particles.js/#default
// main site for particles : https://github.com/tsparticles/react?tab=readme-ov-file
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.

import "../styles/project_title.css";

export default function ProjectTitle({ project }) {
  const [init, setInit] = useState(false);
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);
  const particlesLoaded = (container) => {


  };
  const options = useMemo(
    () => ({
      fullScreen: {
        enable: false,
        zIndex: -1,
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "grab",
          },
        },
        modes: {
          grab: {
            linked: 72,
          },
          push: {
            quantity: 4,
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
          distance: 150,
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
          },
          value: 400,
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


  
  if (init) {
    const classify = project.classification.split("/");
    return (
      <>
        <div className="container">
          <Particles
            id="tsparticles"
            particlesLoaded={particlesLoaded}
            options={options}
            width="100%"
            height="100%"
          />
          <div className="content">
            <div>{project.title}</div>
            <ul>
              {classify.map((cls, index) => (
                <li key={index}>
                  <h2>{cls}</h2>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    );
  }
  return <></>;
}
