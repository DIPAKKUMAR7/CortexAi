import { api } from "../../utils/axios.js";

const getCurrentUser = async () => {
  try {
    const { data } = await api.get("/api/me");

    console.log("Current user data:", data);

    return data;
  } catch (error) {
    console.error("Status:", error.response?.status);
    console.error("Backend error:", error.response?.data);
    console.error("Full error:", error);

    return null;
  }
};

export default getCurrentUser;