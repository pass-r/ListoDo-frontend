import { useContext } from "react";
import Task from "../Task.jsx";
import {
  filterIsDone,
  filterHasProject,
  filterHasDueDate,
} from "../../utils/filterTasks.js";
import styles from "../../style/TasksShared.module.css";
import { DataContext } from "../../App.jsx";

export default function TasksSomeday() {
  const data = useContext(DataContext);

  // get the tasks that are not done
  const notDone = filterIsDone(data, false);

  // get the tasks without due date
  const noDueDate = filterHasDueDate(notDone, false);

  // get the tasks that have or not a project
  const hasProject = filterHasProject(noDueDate, true);
  const hasNoProject = filterHasProject(noDueDate, false);

  // sort according to date added
  hasProject.sort((a, b) => b.addedDate - a.addedDate);
  hasNoProject.sort((a, b) => b.addedDate - a.addedDate);
  return (
    <>
      <h1 className={styles.title}>Someday</h1>
      {hasNoProject.length > 0 && (
        <>
          {/* <h2 className={styles.subtitle}>Unscheduled Tasks</h2> */}
          {hasNoProject.map((task) => {
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
      {hasProject.length > 0 && (
        <>
          <h2 className={styles.subtitle}>Unscheduled Project Tasks</h2>
          {hasProject.map((task) => {
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
