import { useContext } from "react";
import { TasksContext } from "../tasks/TasksContext.js";
import styles from "../../style/Sidebar.module.css";

// if style is active, a className 'active' is added
const createClassName = (currentView, viewName) =>
  `${styles.link} ${currentView === viewName ? styles.active : ""}`;

export default function Sidebar({ currentView, setCurrentView, openModal }) {
  const { getProjects } = useContext(TasksContext);
  return (
    <>
      <button className={`${styles.link} ${styles.newTask}`} onClick={openModal}>
        + ADD TASK
      </button>
      <button
        className={createClassName(currentView.active, "today")}
        onClick={() => setCurrentView({ active: "today", isProject: false })}
      >
        Today
      </button>
      <button
        className={createClassName(currentView.active, "future")}
        onClick={() => setCurrentView({ active: "future", isProject: false })}
      >
        Future
      </button>
      <button
        className={createClassName(currentView.active, "someday")}
        onClick={() => setCurrentView({ active: "someday", isProject: false })}
      >
        Someday
      </button>
      <button
        className={createClassName(currentView.active, "completed")}
        onClick={() => setCurrentView({ active: "completed", isProject: false })}
      >
        Completed
      </button>

      <div className={styles.project}>Projects</div>

      {getProjects().map((projectName) => (
        <button
          key={projectName}
          className={createClassName(currentView.active, projectName)}
          onClick={() => setCurrentView({ active: projectName, isProject: true })}
        >
          {projectName}
        </button>
      ))}
    </>
  );
}
