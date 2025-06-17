import { useState, useEffect } from "react";
import styles from "./style/App.module.css";
import "./style/global.css";
import Sidebar from "./components/Sidebar.jsx";
import { Tasks } from "./components/TasksViews/index.js";
import TaskModal from "./components/TaskModal.jsx";
import { getTasks, addTask } from "./api.js";
import { convertDatesInArray } from "./utils/convertArray.js";
import { DataContext } from "./components/Context/context.js";

export default function App() {
  const [view, setView] = useState("today");

  const [data, setData] = useState([]);
  const [newTask, setNewTask] = useState({});
  const [update, setUpdate] = useState(true);
  const [statusModal, setStatusModal] = useState(false);

  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    // update on first render and when a new task is added
    async function fetchData() {
      if (update) {
        const tasksFromApi = await getTasks();
        const tasksConverted = convertDatesInArray(tasksFromApi);
        setData(tasksConverted);
        setUpdate(false);
      }
    }
    fetchData();
  }, [update]);
  // console.log("App() data: ", data);

  /*
 TODO
 return from addTask in api.js
 return in the addNewTask function
  */
  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
    } else {
      async function addNewTask() {
        const response = await addTask(newTask);
        // TODO: handle error
        setUpdate(true);
      }
      addNewTask();
    }
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newTask]);

  if (!data) {
    return <h1>Loading</h1>;
  }

  return (
    <DataContext value={data}>
      {/* <button onClick={addTask}>add task to db</button> */}
      <div className={styles.gridLayout}>
        <nav className={styles.sidebarContainer}>
          <Sidebar
            currentView={view}
            changeView={setView}
            showModal={() => setStatusModal(true)}
          />
        </nav>
        <main className={styles.mainContainer}>
          {view == "today" && <Tasks.Today data={data} />}

          {view === "future" && <Tasks.Future data={data} />}
          {view === "completed" && <Tasks.Completed data={data} />}
          {view === "someday" && <Tasks.Someday data={data} />}
        </main>
        {statusModal && (
          <TaskModal
            status={statusModal}
            toggleStatus={() => setStatusModal((prevStatus) => !prevStatus)}
            setNewTask={setNewTask}
          />
        )}
      </div>
    </DataContext>
  );
}
