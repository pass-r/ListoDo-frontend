/**
 * Converts data string fields within each task object in the array to JavaScript Date objects.
 *
 * This function processes each task and converts the 'addedDate', 'dueDate' and 'doneDate'
 * fields from strings to 'Date' objects, if present. If any of those fields are missing or empty,
 * they will be set to 'null'.
 *
 * @param {Object[]} tasksArray - The array of task objects
 * @returns {Object[]} A new array of task objects with date strings converted to 'Date' obejcts
 * of 'null' if no valid date was provided.
 */
export function convertDates(taskArray) {
  return taskArray.map((taskObject) => ({
    ...taskObject,
    addedDate: taskObject.addedDate ? new Date(taskObject.addedDate) : null,
    dueDate: taskObject.dueDate ? new Date(taskObject.dueDate) : null,
    doneDate: taskObject.doneDate ? new Date(taskObject.doneDate) : null,
  }));
}
