import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api/v0.1";
axios.defaults.headers = {
  "Content-Type": "application/json",
};

export const request = async ({ method, route, body, headers = {} }) => {
  try {

    const token = localStorage.getItem("bearer_token");
    
    const defaultHeaders = {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    };

    const response = await axios.request({
      method,
      url: route,
      data: body,
      headers: defaultHeaders,
    });

    return response.data;
  } catch (error) {
    return {
      error: true,
      message: error.message,
    };
  }
};
