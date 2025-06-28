import { useContext } from "react";
import TaskItem from "../TaskItem.jsx";
import { TasksContext } from "../TasksContext.js";
import { filterByProject, filterIsDone } from "../../../utils/filterTasks.js";
import styles from "../../../style/TasksShared.module.css";

export default function Project({ openEditModal, openConfirm, projectName }) {
  const { tasks } = useContext(TasksContext);

  // get the tasks that are not done
  const notDone = filterIsDone(tasks, false);

  // get the tasks that have due date in the future
  const allProjectTasks = filterByProject(notDone, projectName);

  return (
    <>
      <h1 className={styles.title}>Project: {projectName}</h1>
      {allProjectTasks.map((oneTask) => {
        return (
          <TaskItem
            key={oneTask.id}
            id={oneTask.id}
            name={oneTask.name}
            done={oneTask.done}
            dueDate={oneTask.dueDate}
            description={oneTask.description}
            // project={oneTask.project}
            openEditModal={openEditModal}
            openConfirm={openConfirm}
          />
        );
      })}
    </>
  );
}
