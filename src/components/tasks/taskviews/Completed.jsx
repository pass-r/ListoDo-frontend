import { useContext } from "react";
import TaskItem from "../TaskItem.jsx";
import { TasksContext } from "../TasksContext.js";
import { filterIsDone } from "../../../utils/filterTasks.js";
import styles from "../../../style/TasksShared.module.css";

export default function Completed({ openEditModal, openConfirm }) {
  const { tasks } = useContext(TasksContext);

  // get the tasks that are done
  const done = filterIsDone(tasks, true);

  return (
    <>
      <h1 className={styles.title}>Completed</h1>
      {done.map((oneTask) => {
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
