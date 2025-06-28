import { useContext } from "react";
import TaskItem from "../TaskItem.jsx";
import { TasksContext } from "../TasksContext.js";
import { filterByDueDate, filterIsDone } from "../../../utils/filterTasks.js";
import styles from "../../../style/TasksShared.module.css";

export default function Future({ openEditModal, openConfirm }) {
  const { tasks } = useContext(TasksContext);

  // get the tasks that are not done
  const notDone = filterIsDone(tasks, false);

  // get the tasks that have due date in the future
  const future = filterByDueDate(notDone, "future");

  return (
    <>
      <h1 className={styles.title}>Future</h1>
      {future.map((oneTask) => {
        return (
          <TaskItem
            key={oneTask.id}
            id={oneTask.id}
            name={oneTask.name}
            done={oneTask.done}
            dueDate={oneTask.dueDate}
            description={oneTask.description}
            project={oneTask.project}
            openEditModal={openEditModal}
            openConfirm={openConfirm}
          />
        );
      })}
    </>
  );
}
