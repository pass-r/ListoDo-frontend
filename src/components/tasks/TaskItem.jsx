import { useContext } from "react";
import { TasksContext } from "./TasksContext.js";
import imgCircleOutline from "../../assets/circle-outline.svg";
import imgCircleCheck from "../../assets/check-circle.svg";
import imgEdit from "../../assets/pencil.svg";
import imgDelete from "../../assets/trash-can-outline.svg";
import { getDateAsString } from "../../utils/getDate.js";
import styles from "../../style/TaskItem.module.css";

export default function TaskItem({
  id,
  name,
  done = false,
  dueDate = null,
  description = null,
  project = null,
  openEditModal,
  openConfirm,
}) {
  const { changeTask, deleteTask } = useContext(TasksContext);
  const date = getDateAsString(dueDate);

  const toggleDone = () => {
    changeTask(id, { done: !done });
  };

  const handleDelete = async (id) => {
    const confirmed = await openConfirm();
    if (confirmed) deleteTask(id);
  };

  return (
    <div className={styles.taskContainer}>
      <button className={styles.buttonCheckbox} onClick={toggleDone}>
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
      <div className={styles.buttonBox}>
        <button className={styles.buttonEdit} onClick={() => openEditModal(id)}>
          <img className={styles.image} src={imgEdit} alt="" />
        </button>
        <button className={styles.buttonDelete} onClick={() => handleDelete(id)}>
          <img className={styles.image} src={imgDelete} alt="" />
        </button>
      </div>

      <hr className={styles.divider} />
    </div>
  );
}
