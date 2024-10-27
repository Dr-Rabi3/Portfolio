import classes from "../styles/cardproject.module.css";


export default function Card({ title, image, description, technics, order }) {

  return (
    <div className={classes.container}>
      <div className={classes.data}>
        <h1 className={classes.title}>{title}</h1>
        <p className={classes.desc}>{description}</p>
        <ul className={classes.skills}>
          {technics &&
            technics.map((technic, idx) => <li key={idx}>{technic}</li>)}
        </ul>
      </div>
      <div className={classes.photo} style={{ order: order - 1 }}>
        <img src={process.env.REACT_APP_BACKEND_URL + image} alt={title + " image."} />
      </div>
    </div>
  );
}
