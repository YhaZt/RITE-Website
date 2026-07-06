import { http } from "@/api/http";

export const submissionService = {
  async getAll() {
    const res = await http.get('/submissions');
    return res.data;
  },
  async submit(formData) {
    const res = await http.post('/submissions', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },
  async updateStatus(id, status, adminNote) {
    const res = await http.patch(`/submissions/${id}/status`, { status, admin_note: adminNote });
    return res.data;
  },
  async delete(id) {
    const res = await http.delete(`/submissions/${id}`);
    return res.data;
  },
};
