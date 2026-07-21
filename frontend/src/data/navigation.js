// Navigation Routes Configuration
export const navigationRoutes = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  {
    name: "Research & Publication Services",
    path: "/research",
    dropdown: [
      { name: "Publication and Printing Unit", path: "/publication-and-printing" },
      { name: "Research Unit", path: "/research-unit" },
    ],
  },
  {
    name: "Innovation",
    path: "/innovation",
    dropdown: [
      { name: "Technology Transfer & Patent Unit", path: "/technology-transfer" },
      { name: "Minsu I-BIBES", path: "https://www.minsuibibes.com", external: true },
      {
        name: "Innovation Hub",
        path: "/innovation-hub",
        subDropdown: [
          { name: "BUKID Hub", path: "/bukid-hub" },
          { name: "Project MAUYA", path: "/project-mauya" },
        ],
      },
    ],
  },
  { name: "Research Ethics & Integrity", path: "/ethics" },
  { name: "Extension Services", path: "/extension" },
  {
    name: "Research Centers",
    path: "/centers",
    dropdown: [
      { name: "Mindoro Development and Studies Center", path: "/centers/mindoro-development" },
      { name: "Center for Digital Innovation, Cybersecurity & Emerging Technologies", path: "/centers/digital-innovation" },
      { name: "Center for Environmental Studies", path: "/centers/environmental-studies" },
      { name: "Fisheries Research and Development Center", path: "/centers/fisheries-research" },
      { name: "MIMAROPA Food Innovation Center", path: "/centers/mimaropa-food" },
      { name: "Center for Island Education and Sustainability", path: "/centers/island-education" },
      { name: "Center for Peace, Criminology, and Law Enforcement Studies", path: "/centers/peace-criminology" },
      { name: "Center for Smart Agriculture and Biosystems Innovation", path: "/centers/smart-agriculture" },
      { name: "Natural Textile Fiber Innovation Center", path: "/centers/textile-fiber" },
    ],
  },
];
