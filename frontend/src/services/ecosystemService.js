import { http } from "@/api/http";

export const ecosystemService = {
  async getAll() {
    const response = await http.get("/ecosystem");
    return response.data;
  },
  async create(data) {
    const response = await http.post("/ecosystem", data);
    return response.data;
  },
  async update(id, data) {
    const response = await http.put(`/ecosystem/${id}`, data);
    return response.data;
  },
  async delete(id) {
    const response = await http.delete(`/ecosystem/${id}`);
    return response.data;
  },
};
