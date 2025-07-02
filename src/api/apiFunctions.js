import { apiRequest } from "./helpers/apiRequest";

/**
 * Gets all the tasks by making a GET request to the 'tasks API'.
 *
 * @returns {Promise<{ success: boolean, status: number, message: any }>}
 *  An object indicating whether the request was successful, the HTTP status code,
 *  and the server response or error.
 */
export async function apiGetTasks() {
  const url = "http://localhost:4000/api/tasks";

  return apiRequest(url);
}

/**
 * Sends a new task to the server by making a POST request to the 'tasks API'.
 *
 * @param {Object} newTask - The task object to add. Should conform to the API's expected format.
 * @returns {Promise<{ success: boolean, status: number, message: any }>}
 *  An object indicating whether the request was successful, the HTTP status code,
 *  and the server response or error.
 */
export async function apiAddTask(newTask) {
  const url = "http://localhost:3000/api/tasks";
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTask),
  };

  return apiRequest(url, options);
}

/**
 * Updates specific fields of a task by making a PATCH request
 *
 * @param {string} id - The unique identifier of the task to be updated.
 * @param {Object} itemsToBeUpdated - An object containing the fields to update with their
 *  new values. Should conform to the API's expected format.
 * @returns {Promise<{ success: boolean, status: number, message: any }>}
 *  An object indicating whether the request was successful, the HTTP status code,
 *  and the server response or error.
 */
export async function apiChangeTask(id, itemsToBeUpdated) {
  const url = `http://localhost:3000/api/tasks/${id}`;
  const options = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(itemsToBeUpdated),
  };

  return apiRequest(url, options);
}

/**
 * Deletes a task from the server by making a DELETE request.
 *
 * @param {string} id - The unique identifier of the task to be updated.
 * @returns {Promise<{ success: boolean, status: number, message: any }>}
 *  An object indicating whether the request was successful, the HTTP status code,
 *  and the server response or error.
 */
export async function apiDeleteTask(id) {
  const url = `http://localhost:3000/api/tasks/${id}`;
  const options = {
    method: "DELETE",
  };

  return apiRequest(url, options);
}
