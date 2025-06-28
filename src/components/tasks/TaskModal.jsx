import { useEffect, useRef, useContext } from "react";
import styles from "../../style/TaskModal.module.css";
import { TasksContext } from "./TasksContext.js";
import { formatDateForInput } from "../../utils/getDate.js";

// if a changeId is passed, then the modal will execute 'edit mode' / otherwise 'new task'
export default function TaskModal({ isOpen, changeId, closeModal }) {
  const refDialog = useRef(null);
  const { tasks, addTask, getProjects, changeTask } = useContext(TasksContext);

  let [name, description, project, dueDate] = ["", "", "", ""];

  if (changeId) {
    const taskToEdit = tasks.find((oneTask) => changeId === oneTask.id);

    name = taskToEdit.name;
    description = taskToEdit.description;
    project = taskToEdit.project;
    dueDate = taskToEdit.dueDate ? formatDateForInput(taskToEdit.dueDate) : "";
  }

  // show or hide the modal dialog
  useEffect(() => {
    const dialog = refDialog.current;
    // if ref has not been attached yet
    if (!dialog) return;

    if (isOpen) dialog.showModal();
    else dialog.close();
  }, [isOpen]);

  // change status when the Esc key is pressed
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape" && isOpen) {
        refDialog.current.close();
        closeModal();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, closeModal]);

  // handle form submit and then close modal
  function submitForm(formData) {
    const nameForm = formData.get("name");
    const descriptionForm = formData.get("description");
    const projectForm = formData.get("project");
    const dueDateForm = formData.get("dueDate");

    // only the fields with input (new task) or
    //  the changed fields (edited task) will be sent to DB
    let taskItems = {
      ...(name !== nameForm && { name: nameForm }),
      ...(description !== descriptionForm && { description: descriptionForm }),
      ...(project !== projectForm && { project: projectForm }),
      ...(dueDate !== dueDateForm && { dueDate: dueDateForm }),
    };

    if (changeId) {
      // edit task: only call changeTask() if there is changed data
      if (Object.keys(taskItems).length > 0) {
        console.log("changeTask -> taskItems: ", taskItems);
        changeTask(changeId, taskItems);
      }
    } else {
      // new task: a new task will be created.
      console.log("addTask -> taskItems: ", taskItems);
      addTask(taskItems);
    }

    refDialog.current.close();
    closeModal();
  }

  // handle the cancel button
  function handleCancel() {
    refDialog.current.close();
    closeModal();
  }

  return (
    <dialog ref={refDialog} className={styles.dialog}>
      <h2 className={styles.title}>{changeId ? "Edit task" : "Add task"}</h2>
      <form action={submitForm}>
        <label htmlFor="name" className={styles.label}>
          Task<span>*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={name}
          placeholder={"Enter a task"}
          className={styles.inputText}
          required
        />

        <label htmlFor="description" className={styles.label}>
          Description
        </label>
        <input
          type="text"
          id="description"
          name="description"
          placeholder={"Describe the task"}
          defaultValue={description}
          className={styles.inputText}
        />

        <label htmlFor="project" className={styles.label}>
          Project
        </label>

        <input
          list="project-options"
          id="project"
          name="project"
          defaultValue={project}
          placeholder={"Select or enter a project"}
          className={styles.inputDatalist}
        />
        <datalist id="project-options">
          <option value=""></option>
          {getProjects().map((oneProject, index) => (
            <option key={index} value={oneProject} />
          ))}
        </datalist>

        <label htmlFor="dueDate" className={styles.label}>
          Due date
        </label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          defaultValue={dueDate}
          className={styles.inputDate}
        />

        <div className={styles.buttonBox}>
          <button type="button" onClick={handleCancel} className={styles.buttonCancel}>
            Cancel
          </button>
          <button type="submit" className={styles.buttonAdd}>
            {changeId ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </dialog>
  );
}
