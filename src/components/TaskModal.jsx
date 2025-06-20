import { useState, useEffect, useRef, useContext } from "react";
import styles from "../style/TaskModal.module.css";
import { DataContext } from "./Context/context.js";

export default function TaskModal({ status, toggleStatus, setNewTask }) {
  const refDialog = useRef(null);
  const data = useContext(DataContext);

  const [projects, setProjects] = useState([]);

  // show or hide the modal dialog
  useEffect(() => {
    const dialog = refDialog.current;
    if (!dialog) return;

    if (status) dialog.showModal();
    else dialog.close();
  }, [status]);

  // get the projects
  useEffect(() => {
    const projectArray = data.map((oneTask) => oneTask.project).filter(Boolean);
    setProjects([...new Set(projectArray)]);
  }, [data]);

  // change status when the Esc key is pressed
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape" && status) {
        refDialog.current.close();
        toggleStatus();
      }
    };
    if (status) {
      document.addEventListener("keydown", handleEscKey);
    }
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [status, toggleStatus]);

  function submitTask(formData) {
    // console.log(Object.fromEntries(formData));

    const name = formData.get("name");
    const description = formData.get("description");
    const project = formData.get("project");
    const dueDate = formData.get("dueDate");

    const newTask = {
      name,
      description: description !== "" ? description : null,
      project: project !== "" ? project : null,
      dueDate: dueDate !== "" ? dueDate : null,
    };

    setNewTask(newTask);
  }

  return (
    <dialog ref={refDialog} className={styles.dialog}>
      <h2 className={styles.title}>Add task</h2>
      <form action={submitTask}>
        <label htmlFor="name" className={styles.label}>
          Task<span>*</span>
        </label>
        <input type="text" id="name" name="name" className={styles.inputText} required />

        <label htmlFor="description" className={styles.label}>
          Description
        </label>
        <input
          type="text"
          id="description"
          name="description"
          className={styles.inputText}
        />

        <label htmlFor="project" className={styles.label}>
          Project
        </label>
        <select id="project" name="project" className={styles.inputSelect}>
          <option value=""></option>
          {projects.map((oneProject, index) => {
            return (
              <option key={index} value={oneProject}>
                {oneProject}
              </option>
            );
          })}
        </select>

        <label htmlFor="dueDate" className={styles.label}>
          Due date
        </label>
        <input type="date" id="dueDate" name="dueDate" className={styles.inputDate} />

        <div className={styles.buttonBox}>
          <button type="button" onClick={toggleStatus} className={styles.buttonCancel}>
            Cancel
          </button>
          <button type="submit" className={styles.buttonAdd}>
            Add
          </button>
        </div>
      </form>
    </dialog>
  );
}
