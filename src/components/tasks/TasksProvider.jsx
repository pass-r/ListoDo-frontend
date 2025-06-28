import { useState, useEffect, useOptimistic, startTransition } from "react";
import { TasksContext } from "./TasksContext";
import {
  apiGetTasks,
  apiAddTask,
  apiChangeTask,
  apiDeleteTask,
} from "../../api/apiFunctions";
import { convertDates } from "../../utils/convertDates.js";

export default function TaskProvider({ children }) {
  const [serverTasks, setServerTasks] = useState([]);
  const [optimisticTasks, setOptimisticTasks] = useOptimistic(serverTasks);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    const apiResponse = await apiGetTasks();
    if (apiResponse.status) {
      const tasks = convertDates(apiResponse.message);
      setServerTasks(tasks);
    } else {
      console.log("Error getting Tasks");
    }
  };

  const addTask = async (data) => {
    // in order to be displayed a task needs a name and an id
    // -- optimistic update --
    const newOptimisticTask = { ...data, id: `optimistic-${Date.now()}` };
    startTransition(() => setOptimisticTasks((prev) => [...prev, newOptimisticTask]));

    // -- send update to server (if error: revert to previous tasks) --
    const apiResponse = await apiAddTask(data);
    if (apiResponse.success) {
      getTasks();
    } else {
      startTransition(() => setOptimisticTasks(serverTasks));
    }
  };

  const changeTask = async (id, data) => {
    // data is an object, with one or more keys { done: true}
    // -- optimistic update --
    startTransition(() =>
      setOptimisticTasks((prev) =>
        prev.map((oneTask) => (oneTask.id === id ? { ...oneTask, ...data } : oneTask)),
      ),
    );

    // -- send update to server (if error: revert to previous tasks) --
    const apiResponse = await apiChangeTask(id, data);
    if (apiResponse.success) {
      getTasks();
    } else {
      startTransition(() => setOptimisticTasks(serverTasks));
    }
  };

  const deleteTask = async (id) => {
    // -- optimistic update --
    const updatedTasks = optimisticTasks.filter((oneTask) => oneTask.id !== id);
    startTransition(() => setOptimisticTasks((prev) => updatedTasks));

    // -- send update to server (if error: revert to previous tasks) --
    const apiResponse = await apiDeleteTask(id);
    if (apiResponse.success) {
      getTasks();
    } else {
      startTransition(() => setOptimisticTasks(serverTasks));
    }
  };

  const getProjects = () => {
    const projectsArray = serverTasks.map((oneTask) => oneTask.project).filter(Boolean);
    return [...new Set(projectsArray)];
  };

  return (
    <TasksContext
      value={{
        tasks: serverTasks,
        getTasks,
        addTask,
        changeTask,
        deleteTask,
        getProjects,
      }}
    >
      {children}
    </TasksContext>
  );
}
