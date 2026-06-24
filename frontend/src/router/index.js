import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "@/composables/useAuth";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/auth/Login.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/auth/Register.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: () => import("../views/auth/ForgotPassword.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/reset-password",
    name: "ResetPassword",
    component: () => import("../views/auth/ResetPassword.vue"),
    meta: { requiresGuest: true },
  },
  {
    path: "/change-password",
    name: "ChangePassword",
    component: () => import("../views/auth/ChangePassword.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/research",
    name: "ResearchHome",
    component: () => import("../views/ResearchHome.vue"),
  },
  {
    path: "/publication-and-printing",
    name: "PublicationPrinting",
    component: () => import("../views/PublicationPrinting.vue"),
  },
  {
    path: "/research-unit",
    name: "ResearchUnit",
    component: () => import("../views/ResearchUnit.vue"),
  },
  {
    path: "/innovation",
    name: "InnovationHome",
    component: () => import("../views/InnovationHome.vue"),
  },
  {
    path: "/technology-transfer",
    name: "TechnologyTransfer",
    component: () => import("../views/TechnologyTransfer.vue"),
  },
  {
    path: "/innovation-hub",
    name: "InnovationHub",
    component: () => import("../views/InnovationHub.vue"),
  },
  {
    path: "/bukid-hub",
    name: "BukidHub",
    component: () => import("../views/BukidHub.vue"),
  },
  {
    path: "/project-mauya",
    name: "ProjectMauya",
    component: () => import("../views/ProjectMauya.vue"),
  },
  {
    path: "/ethics",
    name: "Ethics",
    component: () => import("../views/Ethics.vue"),
  },
  {
    path: "/extension",
    name: "Extension",
    component: () => import("../views/Extension.vue"),
  },
  {
    path: "/centers",
    name: "CentersHome",
    component: () => import("../views/CentersHome.vue"),
  },
  {
    path: "/centers/:id",
    name: "CenterDetails",
    component: () => import("../views/CenterDetails.vue"),
  },
  {
    path: "/contact",
    name: "Contact",
    component: () => import("../views/Contact.vue"),
  },
  // Backward compatibility redirects for old React paths
  { path: "/mindoro-development", redirect: "/centers/mindoro-development" },
  { path: "/digital-innovation", redirect: "/centers/digital-innovation" },
  { path: "/environmental-studies", redirect: "/centers/environmental-studies" },
  { path: "/fisheries-research", redirect: "/centers/fisheries-research" },
  { path: "/mimaropa-food", redirect: "/centers/mimaropa-food" },
  { path: "/island-education", redirect: "/centers/island-education" },
  { path: "/peace-criminology", redirect: "/centers/peace-criminology" },
  { path: "/smart-agriculture", redirect: "/centers/smart-agriculture" },
  { path: "/textile-fiber", redirect: "/centers/textile-fiber" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

// Senior Dev style navigation guards
router.beforeEach((to, from, next) => {
  const { user } = useAuth();

  if (to.meta.requiresAuth && !user.value) {
    next({ name: "Login" });
  } else if (to.meta.requiresGuest && user.value) {
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router;
