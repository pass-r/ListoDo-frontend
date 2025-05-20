import styles from "../style/Sidebar.module.css";

const setClassName = (currentView, viewName) =>
  `${styles.link} ${currentView === viewName ? styles.active : ""}`;

export default function Sidebar({ currentView, changeView, showModal }) {
  return (
    <>
      <button className={`${styles.link} ${styles.newTask}`} onClick={showModal}>
        + ADD TASK
      </button>
      <button
        className={setClassName(currentView, "today")}
        onClick={() => changeView("today")}
      >
        Today
      </button>
      <button
        className={setClassName(currentView, "future")}
        onClick={() => changeView("future")}
      >
        Future
      </button>
      <button
        className={setClassName(currentView, "someday")}
        onClick={() => changeView("someday")}
      >
        Someday
      </button>
      <button
        className={setClassName(currentView, "completed")}
        onClick={() => changeView("completed")}
      >
        Completed
      </button>
      <div className={styles.project}>Projects</div>
      <button className={styles.link}>Project 1</button>
    </>
  );
}
