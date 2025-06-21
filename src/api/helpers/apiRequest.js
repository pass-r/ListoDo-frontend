/**
 * Makes a fetch request to the given URL and returns an object with the keys 'success', 'status' and 'message'.
 *
 * @param {string} url - API endpoint
 * @param {Object} options - Options for the request
 * @param {string} options.method - HTTP method (e.g., "GET", "POST")
 * @param {Object} [options.headers] - Optional headers
 * @param {string} [options.body] - Optional body to send (e.g. JSON string)
 * @returns {Promise<{ success: boolean, status: number, message: any }>} An object indicating whether the request was successful, the HTTP status code, and the server response or error
 */
export async function apiRequest(url, options = {}) {
  try {
    // 1) -- fetch data and get response
    const response = await fetch(url, options);
    const status = response.status;

    // 2) -- handle server response (success or error)
    if (response.ok) {
      return { success: true, status, message: await response.json() };
    } else {
      return { success: false, status, message: "Failed to fetch tasks" };
    }
  } catch {
    // 3) -- handle network and cors errors
    return {
      success: false,
      status: 503,
      message: "Network connection or CORS error",
    };
  }
}
