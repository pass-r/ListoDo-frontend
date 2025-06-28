import { useContext } from "react";
import TaskItem from "../TaskItem.jsx";
import { TasksContext } from "../TasksContext.js";
import {
  filterIsDone,
  filterHasProject,
  filterHasDueDate,
} from "../../../utils/filterTasks.js";
import styles from "../../../style/TasksShared.module.css";

export default function Someday({ openEditModal, openConfirm }) {
  const { tasks } = useContext(TasksContext);

  // get the tasks that are not done
  const notDone = filterIsDone(tasks, false);

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
          {hasNoProject.map((oneTask) => {
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
      {hasProject.length > 0 && (
        <>
          <h2 className={styles.subtitle}>Unscheduled Project Tasks</h2>
          {hasProject.map((oneTask) => {
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
    </>
  );
}
