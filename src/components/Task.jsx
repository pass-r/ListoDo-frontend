import styles from "../style/Task.module.css";
import { getDateAsString } from "../utils/getDate";
import imgCircleOutline from "../assets/circle-outline.svg";
import imgCircleCheck from "../assets/check-circle.svg";

export default function Task({ id, name, done, dueDate, description, project, added }) {
  const date = getDateAsString(dueDate);

  return (
    <div className={styles.taskContainer}>
      <button className={styles.button}>
        <img
          className={styles.image}
          src={done ? imgCircleCheck : imgCircleOutline}
          alt=""
        />
      </button>
      <p className={styles.name}>{name}</p>
      {description && <p className={styles.description}>{description}</p>}
      {date && <p className={styles.dueDate}>{date}</p>}
      {project && <p className={styles.project}>{project}</p>}
      <hr className={styles.divider} />
    </div>
  );
}
