async function getTasks() {
  const url = "http://localhost:3000/api/tasks";
  const response = await fetch(url);
  if (!response.ok) {
    throw {
      message: "Failed to fetch tasks",
      statusText: response.statusText,
      status: response.status,
    };
  }
  return await response.json();
}

async function addTask(newTask) {
  try {
    console.log("addTask(): 1 - running try block");
    const url = "http://localhost:3000/api/tasks";
    const requestData = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    };

    const response = await fetch(url, requestData);
    const parsedBody = await response.json();

    if (!response.ok) {
      // if status is not 2xx
      return {
        success: false,
        message: parsedBody.message,
        status: response.status,
      };
    }

    return {
      success: true,
      message: parsedBody.message,
      status: response.status,
    };
  } catch (error) {
    // errors during async operations
    return {
      success: false,
      message: error,
    };
  }
}

export { getTasks, addTask };
