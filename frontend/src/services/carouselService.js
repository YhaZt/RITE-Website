import { http } from "@/api/http";

export const carouselService = {
  async getAll() {
    const response = await http.get("/carousel");
    return response.data;
  },
  async create(data) {
    const response = await http.post("/carousel", data);
    return response.data;
  },
  async update(id, data) {
    const response = await http.put(`/carousel/${id}`, data);
    return response.data;
  },
  async delete(id) {
    const response = await http.delete(`/carousel/${id}`);
    return response.data;
  },
};
