import { useContext } from "react";
import Task from "../Task.jsx";
import { filterIsDone } from "../../utils/filterTasks.js";
import styles from "../../style/TasksShared.module.css";
import { DataContext } from "../../App.jsx";

export default function TasksCompleted() {
  const data = useContext(DataContext);

  // get the tasks that are done
  const done = filterIsDone(data, true);

  return (
    <>
      <h1 className={styles.title}>Completed</h1>
      {done.map((task) => {
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
