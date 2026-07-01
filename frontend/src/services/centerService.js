import { http } from "@/api/http";

export const centerService = {
  async getAll() {
    const response = await http.get("/centers");
    return response.data;
  },
  async get(idOrSlug) {
    const response = await http.get(`/centers/${idOrSlug}`);
    return response.data;
  },
  async create(data) {
    const response = await http.post("/centers", data);
    return response.data;
  },
  async update(id, data) {
    const response = await http.put(`/centers/${id}`, data);
    return response.data;
  },
  async delete(id) {
    const response = await http.delete(`/centers/${id}`);
    return response.data;
  },
};
