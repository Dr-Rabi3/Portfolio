import { useContext, useEffect, useRef, useState } from "react";
import "../../styles/custom_mouse.css";
import CustomCursorContext from "../../context/CustomCursorContext.js";
import CopyText from "../../context/CopyText.js";
export default function CustomMouse() {
  const { type } = useContext(CustomCursorContext);
  const { copy } = useContext(CopyText);
  const secondaryCursor = useRef(null);
  const mainCursor = useRef(null);
  const positionRef = useRef({
    mouseX: 0,
    mouseY: 0,
    destinationX: 0,
    destinationY: 0,
    distanceX: 0,
    distanceY: 0,
    key: -1,
    text: "",
  });
  const [cursorStyle, setCursorStyle] = useState("default");
  const [isVisible, setIsVisible] = useState(true); // State to control cursor visibility

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;

      if (isVisible) {
        // Center the main cursor
        if (mainCursor.current) {
          mainCursor.current.style.transform = `translate3d(${
            clientX - mainCursor.current.clientWidth / 2
          }px, ${clientY - 7 * mainCursor.current.clientHeight}px, 0)`;
        }

        // Update mouseX and mouseY in positionRef to center the secondary cursor
        if (secondaryCursor.current) {
          if (cursorStyle === "default") {
            positionRef.current.mouseX =
              clientX - secondaryCursor.current.clientWidth / 2;
            positionRef.current.mouseY =
              clientY - 2.1 * secondaryCursor.current.clientHeight;
          } else {
            positionRef.current.mouseX =
              clientX - secondaryCursor.current.clientWidth / 2;
            positionRef.current.mouseY =
              clientY - secondaryCursor.current.clientHeight * 0.999;
          }
        }
      }
    };
    const handleMouseEnter = () => {
      setIsVisible(true); // Make cursor visible
    };
    const handleMouseLeave = () => {
      setIsVisible(false); // Hide the cursor when the mouse leaves the document
    };

    document.addEventListener("mouseleave", handleMouseLeave); // Listen for mouse leave
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave); // Clean up on unmount
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, cursorStyle, copy]);

  useEffect(() => {
    const followMouse = () => {
      positionRef.current.key = requestAnimationFrame(followMouse);
      const {
        mouseX,
        mouseY,
        destinationX,
        destinationY,
        distanceX,
        distanceY,
      } = positionRef.current;

      if (!destinationX || !destinationY) {
        positionRef.current.destinationX = mouseX;
        positionRef.current.destinationY = mouseY;
      } else {
        positionRef.current.distanceX = (mouseX - destinationX) * 0.1;
        positionRef.current.distanceY = (mouseY - destinationY) * 0.1;

        if (
          Math.abs(positionRef.current.distanceX) +
            Math.abs(positionRef.current.distanceY) <
          0.1
        ) {
          positionRef.current.destinationX = mouseX;
          positionRef.current.destinationY = mouseY;
        } else {
          positionRef.current.destinationX += distanceX;
          positionRef.current.destinationY += distanceY;
        }
      }
      if (secondaryCursor.current) {
        secondaryCursor.current.style.transform = `translate3d(${positionRef.current.destinationX}px, ${positionRef.current.destinationY}px, 0)`;
      }
    };

    followMouse();
  }, []);
  // console.log(cursorStyle);

  // Add event listeners to change cursor style on hover
  useEffect(() => {
    const elementsToHover = document.querySelectorAll(
      "nav > div:last-child > ul > li"
    );
    const logo = document.querySelector("nav > div:first-child");
    const email = document.querySelector(
      "footer > div:first-child > div:nth-child(2)"
    );

    const handleMouseEnter = () => {
      setCursorStyle("nav-style"); // Change to your desired style
    };
    const handleMouseEnterFooter = () => {
      setCursorStyle("footer-haver"); // Change to your desired style
      positionRef.current.text = copy ? "Copied" : "Copy";
    };

    const handleMouseLeave = () => {
      setCursorStyle("default");
      positionRef.current.text = "";
    };

    elementsToHover.forEach((element) => {
      if (element) {
        element.addEventListener("mouseenter", handleMouseEnter);
        element.addEventListener("mouseleave", handleMouseLeave);
      }
    });

    if (logo) {
      logo.addEventListener("mouseenter", handleMouseEnter);
      logo.addEventListener("mouseleave", handleMouseLeave);
    }
    if (email) {
      email.addEventListener("mouseenter", handleMouseEnterFooter);
      email.addEventListener("mouseleave", handleMouseLeave);
    }
    // Cleanup event listeners on unmount
    return () => {
      if (email) {
        email.removeEventListener("mouseenter", handleMouseEnterFooter);
        email.removeEventListener("mouseleave", handleMouseLeave);
      }

      if (logo) {
        logo.removeEventListener("mouseenter", handleMouseEnter);
        logo.removeEventListener("mouseleave", handleMouseLeave);
      }

      elementsToHover.forEach((element) => {
        if (element) {
          element.removeEventListener("mouseenter", handleMouseEnter);
          element.removeEventListener("mouseleave", handleMouseLeave);
        }
      });
    };
  }, [copy, cursorStyle]);

  useEffect(() => {
    // console.log(copy);
    if (cursorStyle === "footer-haver")
      positionRef.current.text = !copy ? "Copied" : "Copy";
  }, [copy, cursorStyle]);

  return (
    <div
      className={`cursor-wrapper ${type}`}
      style={{ display: isVisible ? "block" : "none" }}
    >
      <div className={`main-cursor ${cursorStyle}`} ref={mainCursor}>
        <div className="main-cursor-background"></div>
      </div>
      <div className={`secondary-cursor ${cursorStyle}`} ref={secondaryCursor}>
        <div className="cursor-background">{positionRef.current.text}</div>
      </div>
    </div>
  );
}
