import { api } from "../../utils/axios.js";

export const getConversations = async (userId) => {
  // Prevent API call if userId is missing
  if (!userId) {
    console.warn("getConversations called without a userId");
    return [];
  }

  try {
    const { data } = await api.get("/api/chat/get-conversations", {
      headers: {
        "x-user-id": userId,
      },
    });
    return data;
  } catch (error) {
    console.error("Error getting conversation:", error);
    return [];
  }
};