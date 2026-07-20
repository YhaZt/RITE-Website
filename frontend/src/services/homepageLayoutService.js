import { http } from '@/api/http';
import { LAYOUT_SETTING_KEY, defaultLayout } from '@/publicHomepage/widgetRegistry';

export const homepageLayoutService = {
  async getPublic() {
    const { data } = await http.get('/public/homepage-layout');
    return data;
  },

  async getAdminLayout() {
    try {
      const { data } = await http.get(`/settings/${LAYOUT_SETTING_KEY}`);
      if (data?.value) {
        const parsed = typeof data.value === 'string' ? JSON.parse(data.value) : data.value;
        if (parsed && typeof parsed === 'object') return parsed;
      }
    } catch {
      // fall through to default
    }
    return defaultLayout();
  },

  async saveAdminLayout(layout) {
    const { data } = await http.post('/settings', {
      key: LAYOUT_SETTING_KEY,
      value: JSON.stringify(layout),
    });
    return data;
  },
};
