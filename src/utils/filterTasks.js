/**
 * Filters the tasks objects in the taskArray based on when their due date is
 *
 * @param {Object[]} tasksArray - The array of task objects
 * @param {string} time - When the task is due: "overdue", "today" or "future"
 * @returns {Object[]} An array of filtered task objects ("overdue" and "future" sorted: oldest date -> newest date)
 */
function filterByDueDate(tasksArray, time) {
  const tasks = tasksArray.filter((task) => {
    const { dueDate } = task;

    if (!dueDate) return false;
    dueDate.setHours(0, 0, 0, 0);

    const dateToday = new Date();
    dateToday.setHours(0, 0, 0, 0);

    if (time === "today") return dateToday.getTime() == dueDate.getTime();
    if (time === "future") return dateToday < dueDate;
    if (time === "overdue") return dateToday > dueDate;
  });

  // sort tasks: oldest date -> newest date
  if (["future", "overdue"].includes(time)) {
    tasks.sort((a, b) => a.dueDate - b.dueDate);
  }

  return tasks;
}

/**
 * Filters the tasks objects in the taskArray based on their completion status
 *
 * @param {Object[]} tasksArray - The array of task objects
 * @param {boolean} isDone - Is the task done (true) or not done (false)?
 * @returns {Object[]} An array of filtered task objects
 */
function filterIsDone(tasksArray, isDone) {
  if (isDone) {
    return tasksArray.filter((task) => task.done);
  } else if (!isDone) {
    return tasksArray.filter((task) => !task.done);
  }
}

/**
 * Filters the tasks objects in the taskArray whether they are assigned to a project
 *
 * @param {Object[]} tasksArray - The array of task objects
 * @param {boolean} hasProject - Filter for tasks that are part of a project(true) or not (false)
 * @returns {Object[]} An array of filtered task objects
 */
function filterHasProject(tasksArray, hasProject) {
  if (hasProject) {
    return tasksArray.filter((task) => task.project);
  } else if (!hasProject) {
    return tasksArray.filter((task) => !task.project);
  }
}

/**
 * Filters the tasks objects in the taskArray whether they have a due date
 *
 * @param {Object[]} tasksArray - The array of task objects
 * @param {boolean} hasDueDate - Filter for tasks that have a due date (true) or not (false)
 * @returns {Object[]} An array of filtered task objects
 */
function filterHasDueDate(tasksArray, hasDueDate) {
  if (hasDueDate) {
    return tasksArray.filter((task) => task.dueDate);
  } else if (!hasDueDate) {
    return tasksArray.filter((task) => !task.dueDate);
  }
}

export { filterByDueDate, filterIsDone, filterHasProject, filterHasDueDate };
