import { useContext } from "react";
import Task from "../Task.jsx";
import { filterByDueDate, filterIsDone } from "../../utils/filterTasks.js";
import styles from "../../style/TasksShared.module.css";
import { DataContext } from "../../App.jsx";

export default function TasksFuture() {
  const data = useContext(DataContext);

  // get the tasks that are not done
  const notDone = filterIsDone(data, false);

  // get the tasks that have due date in the future
  const future = filterByDueDate(notDone, "future");

  return (
    <>
      <h1 className={styles.title}>Future</h1>
      {future.map((task) => {
        return (
          <Task
            key={task.id}
            id={task.id}
            name={task.name}
            done={task.done}
            dueDate={task.dueDate}
            description={task.description}
            project={task.project}
          />
        );
      })}
    </>
  );
}
