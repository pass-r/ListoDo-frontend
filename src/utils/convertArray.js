/**
 * Converts the dates (inside the tasks objects in the taskArray) from strings to a date objects.
 *
 * @param {Object[]} tasksArray - The array of task objects
 * @returns {Object[]} An array with the task objects with the date strings converted to date object or null (if there was no date)
 */
function convertDatesInArray(taskArray) {
  return taskArray.map((taskObject) => ({
    ...taskObject,
    addedDate: taskObject.addedDate ? new Date(taskObject.addedDate) : null,
    dueDate: taskObject.dueDate ? new Date(taskObject.dueDate) : null,
    doneDate: taskObject.doneDate ? new Date(taskObject.doneDate) : null,
  }));
}

export { convertDatesInArray };
