import { http } from "@/api/http";

export const publicMetricsService = {
  async get() {
    const { data } = await http.get("/public/metrics");
    return data;
  },
};

