import { http } from "@/api/http";

export const newsService = {
  async getAll() {
    const response = await http.get("/news");
    return response.data;
  },
  async get(id) {
    const response = await http.get(`/news/${id}`);
    return response.data;
  },
  async create(data) {
    const response = await http.post("/news", data);
    return response.data;
  },
  async update(id, data) {
    const response = await http.put(`/news/${id}`, data);
    return response.data;
  },
  async delete(id) {
    const response = await http.delete(`/news/${id}`);
    return response.data;
  },
};
