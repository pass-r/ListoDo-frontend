import { useState, useEffect, useOptimistic } from "react";
import { TasksContext } from "./TasksContext";
import {
  apiGetTasks,
  apiAddTask,
  apiChangeTask,
  apiDeleteTask,
} from "../../api/apiFunctions";
import { convertDates } from "../../utils/convertDates.js";

//
// TODO: add updateOptimistic
// TODO: handle errors
//
export default function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  // optimisticTasks is equal to tasks unless an action is pending
  // in which case it is equal to the value returned by updateFn
  // const [optimisticTasks, addOptimisticTasks] = useState(
  //   tasks,
  //   // updateFn: fn that takes the current state and the
  //   // optimistic value passed to addOptimistic and returns
  //   // the resulting optimistic state. The return value will
  //   // be the merged value of the currentState and optimisticValue
  //   (currentState, optimisticValue) => {
  //     // merge and return new state with optimistic value
  //   },
  // );

  /*

  const [ allValues, setOptimisticValue ] = useOptimistic(
    state,
    (currentState, optimisticValue) => {
      return [... currentState, optimisticValue]
    }
  ) ;
  */

  // TODO -> maybe use this useEffect to always get tasks??????
  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    const apiResponse = await apiGetTasks();
    if (apiResponse.status) {
      const tasks = convertDates(apiResponse.message);
      setTasks(tasks);
    }
    // TODO --> Add 'else'
  };

  const addTask = async (data) => {
    addOptimisticTasks();
    console.log("-- TaskProvider - addTask() - data: ", data);
    const apiResponse = await apiAddTask(data);
    if (apiResponse.status) {
      // TODO
      getTasks();
    }
    // TODO --> Add 'else'
  };

  // data is an object, with one or more keys { done: true}
  const changeTask = async (id, data) => {
    console.log("-- TaskProvider - changeTask() - data: ", data);
    const apiResponse = await apiChangeTask(id, data);
    if (apiResponse.status) {
      // TODO
      getTasks();
    }
    // TODO --> Add 'else'
  };

  const deleteTask = async (id) => {
    const apiResponse = await apiDeleteTask(id);
    if (apiResponse.status) {
      // TODO
      getTasks();
    }
    // TODO --> Add 'else'
  };

  const getProjects = () => {
    const projectsArray = tasks.map((oneTask) => oneTask.project).filter(Boolean);
    return [...new Set(projectsArray)];
  };

  return (
    <TasksContext
      value={{ tasks, getTasks, addTask, changeTask, deleteTask, getProjects }}
    >
      {children}
    </TasksContext>
  );
}
