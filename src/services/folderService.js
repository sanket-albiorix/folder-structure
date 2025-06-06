import axios from "../api/axiosConfig";

const handleError = (error) => {
  const errorMessage = error.error || error.message || "Something went wrong!";
  alert(errorMessage);
};

const apiHandler = async (apiFunction) => {
  try {
    const response = await apiFunction();
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const initializeRoot = (folderData) => {
  return apiHandler(() => axios.post("initialize-root", folderData));
};

export const createFolder = async (folderData) => {
  return apiHandler(() => axios.post("/", folderData));
};

export const getFolders = async () => {
  return apiHandler(() => axios.get("/"));
};

export const deleteFolder = async (id) => {
  return apiHandler(() => axios.delete(`/${id}`));
};
