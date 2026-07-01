import { http } from "@/api/http";

export const orgService = {
  async getAll() {
    const response = await http.get("/org-members");
    return response.data;
  },
  async create(data) {
    const response = await http.post("/org-members", data);
    return response.data;
  },
  async update(id, data) {
    const response = await http.put(`/org-members/${id}`, data);
    return response.data;
  },
  async delete(id) {
    const response = await http.delete(`/org-members/${id}`);
    return response.data;
  },
};
