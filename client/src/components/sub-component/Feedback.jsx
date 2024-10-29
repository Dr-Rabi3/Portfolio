import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import classes from "../../styles/feedback.module.css";

import { HeartIcon, SpinnerIcon } from "../../UI/Icon.jsx";
import { CommentProject, LikedProject } from "../../Util/http.js";
export default function Feedback({ projectId, ...props }) {
  const { mutate: mutateLike } = useMutation({
    mutationFn: LikedProject,
    onMutate: () => {
      setIsFetching(true);
    },
    onSuccess: () => {
      localStorage.setItem(`liked_${projectId}`, true);
      setIsFetching(false);
      setLiked(true);
    },
  });

  const { mutate: mutateComment } = useMutation({
    mutationFn: CommentProject,
    onSuccess: () => {
      localStorage.setItem(`commented_${projectId}`, comment);
      setComment("");
    },
  });

  const [liked, setLiked] = useState(localStorage[`liked_${projectId}`]);
  const [isFetching, setIsFetching] = useState(false);
  const [comment, setComment] = useState(
    localStorage[`commented_${projectId}`]
  );
  const buttonRef = useRef(null);

  const handleLikeUnlike = async () => {
    if (liked) return;
    // console.log(liked);
    mutateLike({ id: projectId });
  };

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    if (data.comment !== ""){
      mutateComment({ id: projectId, comment: data.comment });
    }
  };

  useEffect(() => {
    const button = buttonRef.current;

    const getVar = (variable) =>
      getComputedStyle(button).getPropertyValue(variable);

    const handleClick = (e) => {
      const content = comment.trim();
      if (content === "") {
        alert("Write something to me"); 
        return;
      }
      
      if (!button.classList.contains("active")) {
        button.classList.add("active");

        gsap.to(button, {
          keyframes: [
            {
              "--left-wing-first-x": 50,
              "--left-wing-first-y": 100,
              "--right-wing-second-x": 50,
              "--right-wing-second-y": 100,
              duration: 0.2,
              onComplete() {
                gsap.set(button, {
                  "--left-wing-first-y": 0,
                  "--left-wing-second-x": 40,
                  "--left-wing-second-y": 100,
                  "--left-wing-third-x": 0,
                  "--left-wing-third-y": 100,
                  "--left-body-third-x": 40,
                  "--right-wing-first-x": 50,
                  "--right-wing-first-y": 0,
                  "--right-wing-second-x": 60,
                  "--right-wing-second-y": 100,
                  "--right-wing-third-x": 100,
                  "--right-wing-third-y": 100,
                  "--right-body-third-x": 60,
                });
              },
            },
            {
              "--left-wing-third-x": 20,
              "--left-wing-third-y": 90,
              "--left-wing-second-y": 90,
              "--left-body-third-y": 90,
              "--right-wing-third-x": 80,
              "--right-wing-third-y": 90,
              "--right-body-third-y": 90,
              "--right-wing-second-y": 90,
              duration: 0.2,
            },
            {
              "--rotate": 50,
              "--left-wing-third-y": 95,
              "--left-wing-third-x": 27,
              "--right-body-third-x": 45,
              "--right-wing-second-x": 45,
              "--right-wing-third-x": 60,
              "--right-wing-third-y": 83,
              duration: 0.25,
            },
            {
              "--rotate": 55,
              "--plane-x": -8,
              "--plane-y": 24,
              duration: 0.2,
            },
            {
              "--rotate": 40,
              "--plane-x": 45,
              "--plane-y": -180,
              "--plane-opacity": 0,
              duration: 0.3,
              onComplete() {
                setTimeout(() => {
                  button.removeAttribute("style");
                  gsap.fromTo(
                    button,
                    {
                      opacity: 0,
                      y: -8,
                    },
                    {
                      opacity: 1,
                      y: 0,
                      clearProps: true,
                      duration: 0.3,
                      onComplete() {
                        button.classList.remove("active");
                      },
                    }
                  );
                }, 2000);
              },
            },
          ],
        });

        gsap.to(button, {
          keyframes: [
            {
              "--text-opacity": 0,
              "--border-radius": 0,
              "--left-wing-background": getVar("--primary-darkest"),
              "--right-wing-background": getVar("--primary-darkest"),
              duration: 0.1,
            },
            {
              "--left-wing-background": getVar("--primary"),
              "--right-wing-background": getVar("--primary"),
              duration: 0.1,
            },
            {
              "--left-body-background": getVar("--primary-dark"),
              "--right-body-background": getVar("--primary-darkest"),
              duration: 0.4,
            },
            {
              "--success-opacity": 1,
              "--success-scale": 1,
              duration: 0.25,
              delay: 0.25,
            },
          ],
        });
      }
    };

    button.addEventListener("click", handleClick);

    return () => {
      button.removeEventListener("click", handleClick);
    };
  }, [comment]);

  return (
    <div {...props}>
      <h1>Send me your feedback</h1>
      <div className={classes.likebox}>
        <h3>Tell me if project like you</h3>
        <button
          onClick={handleLikeUnlike}
          className={`${classes.likeBtn} ${liked ? classes.liked : ""}`}
        >
          {isFetching ? <SpinnerIcon /> : <HeartIcon />}
          {liked ? "Liked" : "Like"}
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          className={classes.comment}
          value={comment}
          onChange={handleChange}
          name="comment"
          placeholder="Write your comment here..."
        />
        <button className={classes.button} ref={buttonRef}>
          <span className={classes.default}>Send</span>
          <span className={classes.success}>Thanks</span>
          <div className={classes.left}></div>
          <div className={classes.right}></div>
        </button>
      </form>
    </div>
  );
}
