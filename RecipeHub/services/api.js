const BASE_URL = "https://dummyjson.com";

export const api = {
  async get(endpoint, token = null) {
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = "Bearer " + token;
    const response = await fetch(BASE_URL + endpoint, { headers });
    if (!response.ok) throw new Error("API error");
    return response.json();
  },
  async post(endpoint, body, token = null) {
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = "Bearer " + token;
    const response = await fetch(BASE_URL + endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error("POST error");
    return response.json();
  }
};
