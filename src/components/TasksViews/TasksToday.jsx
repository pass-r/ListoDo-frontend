import { useContext } from "react";
import Task from "../Task.jsx";
import { filterByDueDate, filterIsDone } from "../../utils/filterTasks.js";
import { getDateTodayAsString } from "../../utils/getDate.js";
import styles from "../../style/TasksShared.module.css";
import { DataContext } from "../Context/context.js";

export default function TasksToday() {
  const data = useContext(DataContext);

  const notDone = filterIsDone(data, false);

  // get todays tasks and overdue tasks
  const today = filterByDueDate(notDone, "today");
  const overdue = filterByDueDate(notDone, "overdue");
  overdue.reverse();

  return (
    <>
      <h1 className={styles.title}>Today</h1>
      {overdue.length > 0 && (
        <>
          <h2 className={styles.subtitle}>Overdue</h2>
          {overdue.map((task) => {
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
      )}

      {today.length > 0 && (
        <>
          <h2 className={styles.subtitle}>{getDateTodayAsString()} - Today</h2>
          {today.map((task) => {
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
      )}
    </>
  );
}
