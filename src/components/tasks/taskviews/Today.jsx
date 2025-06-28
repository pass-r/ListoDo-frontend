import { useContext } from "react";
import TaskItem from "../TaskItem.jsx";
import { TasksContext } from "../TasksContext.js";
import { filterByDueDate, filterIsDone } from "../../../utils/filterTasks.js";
import { getDateTodayAsString } from "../../../utils/getDate.js";
import styles from "../../../style/TasksShared.module.css";

export default function Today({ openEditModal, openConfirm }) {
  const { tasks } = useContext(TasksContext);

  const notDone = filterIsDone(tasks, false);

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
          {overdue.map((oneTask) => {
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
      )}

      {today.length > 0 && (
        <>
          <h2 className={styles.subtitle}>{getDateTodayAsString()} - Today</h2>
          {today.map((oneTask) => {
            return (
              // 'dueDate' is not passed to TaskItem
              <TaskItem
                key={oneTask.id}
                id={oneTask.id}
                name={oneTask.name}
                done={oneTask.done}
                description={oneTask.description}
                project={oneTask.project}
                openEditModal={openEditModal}
                openConfirm={openConfirm}
              />
            );
          })}
        </>
      )}
    </>
  );
}
