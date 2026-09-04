import { api } from "../../utils/axios.js";

const getCurrentUser = async () => {
  try {
    const { data } = await api.get("/api/me");

    console.log("Current user data:", data);

    return data;
  } catch (error) {
    if (error.response?.status !== 401) {
      console.error("Error getting current user:", error);
    }

    return null;
  }
};

export default getCurrentUser;