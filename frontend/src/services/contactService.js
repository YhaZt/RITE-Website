import { http } from "@/api/http";

export const contactService = {
  async getAll() {
    const response = await http.get("/contact");
    return response.data;
  },
  async submit(data) {
    const response = await http.post("/contact", data);
    return response.data;
  },
  async updateStatus(id, status) {
    const response = await http.put(`/contact/${id}`, { status });
    return response.data;
  },
  async delete(id) {
    const response = await http.delete(`/contact/${id}`);
    return response.data;
  },
};
