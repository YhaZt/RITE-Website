// Centralized Site Data Catalog for RITE Vue Migration

// 1. Brand assets
import riteLogo from "@/assets/rite-logo.png";
export { riteLogo };

// 2. Navigation Routes Configuration
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
          { name: "BUKID Hub", path: "/bakodhub" },
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

// 3. Home Page Content
export const homeCarouselSlides = [
  {
    id: 1,
    title: "Research Excellence",
    description: "Advancing knowledge through innovative research",
    image: "https://images.unsplash.com/photo-1530587191325-3db8b1c12d6d?w=1200&h=600&fit=crop",
  },
  {
    id: 2,
    title: "Community Impact",
    description: "Extending knowledge to serve communities",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop",
  },
  {
    id: 3,
    title: "Innovation Drive",
    description: "Transforming ideas into solutions",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=600&fit=crop",
  },
  {
    id: 4,
    title: "Ethical Leadership",
    description: "Upholding integrity in all endeavors",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop",
  },
];

export const homeFeatureCards = [
  { id: 1, title: "Research & Development", description: "Promoting quality, ethical, and impactful research for national and regional development." },
  { id: 2, title: "Extension & Community Service", description: "Bringing knowledge and innovation to communities for inclusive growth." },
  { id: 3, title: "Innovation", description: "Transforming ideas into solutions through technology and enterprise." },
  { id: 4, title: "Research Ethics & Integrity", description: "Upholding ethical standards and integrity in all scholarly activities." },
];

export const homePageOverviews = [
  {
    title: "Research",
    path: "/research",
    color: "#094A25",
    gradient: "linear-gradient(135deg, #094A25 0%, #0C6B37 100%)",
    description: "RITE's research arm drives evidence-based inquiry and knowledge creation across multiple disciplines. We support faculty and student researchers in producing high-quality, ethical, and impactful research outputs that contribute to national and regional development.",
    tags: ["Faculty Research", "Student Research", "Publications", "Grants"],
  },
  {
    title: "Innovation",
    path: "/innovation",
    color: "#094A25",
    gradient: "linear-gradient(135deg, #094A25 0%, #16a34a 100%)",
    description: "The Innovation Office drives creativity and transforms research outputs into real-world solutions through technology transfer, intellectual property management, and entrepreneurship support — bridging the gap between discovery and impact.",
    tags: ["Technology Transfer", "IP Management", "Entrepreneurship"],
  },
  {
    title: "Technology Transfer & Patent Unit",
    path: "/technology-transfer",
    color: "#094A25",
    gradient: "linear-gradient(135deg, #094A25 0%, #0C6B37 100%)",
    description: "The TTPU serves as the institutional bridge between research innovation and commercialization, facilitating the transformation of research outputs into market-ready products and services with comprehensive IP protection.",
    tags: ["IP Protection", "Patents", "Licensing", "Spin-off Support"],
  },
  {
    title: "BUKID Hub",
    path: "/bakodhub",
    color: "#3b0764",
    gradient: "linear-gradient(135deg, #3b0764 0%, #7c3aed 100%)",
    description: "BUKIDHUB is a dedicated innovation hub fostering entrepreneurship, technology development, and collaborative partnerships to transform ideas into viable business solutions through incubation and mentorship.",
    tags: ["Incubation", "Entrepreneurship", "Industry Partners"],
  },
  {
    title: "Extension & Community Service",
    path: "/extension",
    color: "#1e40af",
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
    description: "Bringing knowledge and innovation to communities for inclusive growth. Our extension programs connect institutional expertise with real-world community needs through outreach, training, and capacity-building initiatives.",
    tags: ["Community Outreach", "Training", "Capacity Building"],
  },
  {
    title: "Research Ethics & Integrity",
    path: "/ethics",
    color: "#831843",
    gradient: "linear-gradient(135deg, #831843 0%, #e11d48 100%)",
    description: "Upholding ethical standards and integrity in all scholarly activities. We ensure that research conducted under RITE adheres to the highest standards of ethical conduct, human subjects protection, and academic honesty.",
    tags: ["Ethics Review", "Integrity", "Compliance"],
  },
  {
    title: "Publication & Printing",
    path: "/publication-and-printing",
    color: "#713f12",
    gradient: "linear-gradient(135deg, #713f12 0%, #ca8a04 100%)",
    description: "Supporting the dissemination of research findings and academic materials through quality publication and printing services. We help researchers share their work with the broader academic community.",
    tags: ["Journals", "Printing Services", "Dissemination"],
  },
  {
    title: "Research Centers",
    path: "/centers",
    color: "#0f766e",
    gradient: "linear-gradient(135deg, #134e4a 0%, #14b8a6 100%)",
    description: "RITE hosts specialized research centers focusing on key areas including smart agriculture, digital innovation, environmental studies, fisheries, textile & fiber, and more — each driving domain-specific research and development.",
    tags: ["Smart Agriculture", "Digital Innovation", "Environmental Studies", "Fisheries"],
  },
];

export const homeNewsItems = [
  {
    id: 1,
    category: "Announcement",
    title: "𝐂𝐀𝐋𝐋 𝐅𝐎𝐑 𝐏𝐀𝐑𝐓𝐈𝐂𝐈𝐏𝐀𝐍𝐓𝐒 & 𝐏𝐀𝐏𝐄𝐑 𝐏𝐑𝐄𝐒𝐄𝐍𝐓𝐄𝐑𝐒",
    description: "Mindoro State University, through the Research, Innovation, Technology, and Extension (RITE) Department, proudly invites scholars, educators, practitioners, and advocates to the GLOBAL ISLANDS CONFERENCE 2026 (GIC 2026). Platform: ZOOM ,Registration Fee:PHP 500 , paper presenters will reciece a certificate of presentation Paper Submission Deadline: May 29, 2026",
    date: "june 5 - 6, 2026",
    image: "/globalislands.jpg",
    link: "https://www.facebook.com/photo?fbid=2375990646217537&set=a.725405664609385",
  },
  {
    id: 2,
    category: "Event",
    title: "Upcoming webinar: IP basics for researchers",
    description: "A short orientation on invention disclosure, copyrights, and patent fundamentals.",
    date: "May 20, 2026",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop",
    link: "https://omsc.edu.ph/news",
  },
  {
    id: 3,
    category: "Update",
    title: "New forms now available for download",
    description: "Updated templates for disclosures and agreements are now posted for easier submission.",
    date: "May 10, 2026",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=800&fit=crop",
    link: "https://omsc.edu.ph/news",
  },
  {
    id: 4,
    category: "Partnership",
    title: "New collaboration opportunities opened",
    description: "We’re welcoming partner institutions for joint research and extension initiatives.",
    date: "May 3, 2026",
    image: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=1200&h=800&fit=crop",
    link: "https://omsc.edu.ph/news",
  },
];

// 4. About Page Content
export const aboutContent = {
  hero: {
    title: "Research, Innovation & Technology Extension",
    description: "The RITE office is committed to promoting a strong research culture and supporting researchers, faculty, and students in driving meaningful impact.",
  },
  mission: "To foster excellence in research, innovation, and extension through support, collaboration, and ethical practices.",
  vision: "A leading institution in research-driven innovation and community engagement.",
  coreValues: [
    { label: "Integrity", color: "#166534", bg: "#f0fdf4", border: "#bbf7d0" },
    { label: "Collaboration", color: "#1e40af", bg: "#eff6ff", border: "#bfdbfe" },
    { label: "Excellence", color: "#9a3412", bg: "#fff7ed", border: "#fed7aa" },
    { label: "Service", color: "#6b21a8", bg: "#faf5ff", border: "#e9d5ff" },
  ],
};

export const orgChartData = {
  vp: { name: "OIC Vice President - RDE", title: "Leonel C. Mendoza" },
  manager: { name: "TBI Manager", title: "Engr. Randy A. Joco" },
  divisions: [
    {
      name: "Research and Publication Division",
      support: [
        { name: "University Researcher V", title: "Research Support" },
        { name: "University Researcher IV", title: "Research Support" },
        { name: "Campus Research Coordinator", title: "Research Support" }
      ],
      nodes: [
        { name: "Technology Transfer and Patent Unit", title: "Research Office" },
        { name: "Publication and Printing Unit", title: "Research Office" },
        { name: "Research Unit", title: "Research Office" },
        { name: "Director, Innovation", title: "Research Office" },
        { name: "Director, Research Ethics and Integrity", title: "Research Office" }
      ]
    },
    {
      name: "Highly Specialized Research Centers",
      nodes: [
        { name: "Highly Specialized Research Centers", title: "Research Centers" }
      ]
    },
    {
      name: "Extension Division",
      support: [
        { name: "University Extension Specialist V", title: "Extension Support" },
        { name: "University Extension Specialist IV", title: "Extension Support" },
        { name: "Campus Extension Coordinator", title: "Extension Support" }
      ],
      nodes: [
        { name: "Extension Unit", title: "Extension Office" },
        { name: "Monitoring & Impact Assessment Unit", title: "Extension Office" }
      ]
    }
  ]
};

export const ecosystemPartners = [
  { name: "Thanh Hoa University of Culture, Sports and Tourism", logo: "https://tucst.edu.vn/icon/logo_dhvh.jpg", link: "https://tucst.edu.vn/" },
  { name: "Vietnam National University of Agriculture", logo: "https://file.vnua.edu.vn/data/6/images/2019/08/14/host/logo.png", link: "https://eng.vnua.edu.vn/faculties/agronomy" },
  { name: "Universiti Malaya", logo: "https://www.um.edu.my/images/img-logo-UM.png", link: "https://cebar.um.edu.my/" },
  { name: "Shinawatra University", logo: "/ecosystem/SIU_logo_Head.png", link: "https://siu.ac.th/" },
  { name: "National Research Council of the Philippines", logo: "/ecosystem/national Research.png", link: "https://nrcp.dost.gov.ph/" },
  { name: "Department of Agriculture", logo: "https://acef.da.gov.ph/wp-content/uploads/2018/03/DA-Logo.png", link: "https://acef.da.gov.ph/index.php/acef-executive-committee/" },
  { name: "Department of Agriculture-Regional Field Office-MIMAROPA", logo: "/ecosystem/national research council.png", link: "https://mimaropa.da.gov.ph/" },
  { name: "BFAR MIMAROPA", logo: "https://graph.facebook.com/BFARMimaropa/picture?type=large", link: "https://www.facebook.com/BFARMimaropa/" },
  { name: "DEPARTMENT OF SCIENCE AND TECHNOLOGY – MIMAROPA", logo: "/ecosystem/dost_mimaropa.png", link: "https://mimaropa.dost.gov.ph/" },
  { name: "Batangas State University", logo: "/ecosystem/BatStateU-NEU-Logo.png", link: "https://batstateu.edu.ph/" },
  { name: "DEPARTMENT OF SCIENCE AND TECHNOLOGY – PHILIPPINE INSTITUTE OF VOLCANOLOGY AND SEISMOLOGY", logo: "/ecosystem/DEPARTMENT OF SCIENCE AND TECHNO.png", link: "https://www.phivolcs.dost.gov.ph/" },
  { name: "Department of Agriculture-Bureau of Agricultural Research (DA-BAR)", logo: "/ecosystem/Screenshot 2026-05-06 165540.png", link: "https://hvcdp.da.gov.ph/research-and-development/" },
  { name: "Department of Science and Technology- Philippine Council for Agriculture, Aquatic and Natural Resources Research and Development (DOST-PCAARRD)", logo: "/vite.svg", link: "https://www.pcaarrd.dost.gov.ph/" },
  { name: "DEPARTMENT OF SCIENCE AND TECHNOLOGY-MIMAROPA, Provincial Government of Oriental Mindoro (PGOM)", logo: "https://region4b.dost.gov.ph/wp-content/uploads/2021/06/dost_mimaropa_logo2-New.png", link: "https://region4b.dost.gov.ph/provincialstcenters/" },
  { name: "DOST-MIMAROPA", logo: "https://region4b.dost.gov.ph/wp-content/uploads/2017/09/Website-Header-2.jpg", link: "https://region4b.dost.gov.ph/" },
  { name: "DOST-MIRDC", logo: "https://mirdc.dost.gov.ph/wp-content/uploads/2025/06/MIRDC.jpg", link: "https://mirdc.dost.gov.ph/" },
  { name: "DOST-PTRI", logo: "https://www.ptri.dost.gov.ph/images/headers/logo/new_logo_large.png", link: "https://www.ptri.dost.gov.ph/" },
  { name: "DOST- PCARRD", logo: "https://www.pcaarrd.dost.gov.ph/images/DOST-PCAARRD Logo Horizontal.png", link: "https://www.pcaarrd.dost.gov.ph/" },
  { name: "MAPUA UNIVERSITY", logo: "/ecosystem/mapua.png", link: "https://www.mapua.edu.ph/" },
  { name: "National University Sports Academy, Inc", logo: "/ecosystem/nu-logo.webp", link: "https://www.national-u.edu.ph/nusa-billboard/" },
  { name: "University of the Philippines- Diliman", logo: "/ecosystem/upd-logo-2021.jpg", link: "https://upd.edu.ph/" },
  { name: "University of Santo Tomas", logo: "https://www.ust.edu.ph/wp-content/uploads/2019/07/logoustb.png", link: "https://www.ust.edu.ph/" },
  { name: "Various Universities (Benchmarking CCJE)", logo: "/ecosystem/bcu-logo-Custom-1.png", link: "https://www.bcu.edu.ph/bcu-college-of-criminal-justice-education-conducts-benchmarking-visit-to-university-of-baguio/" },
  { name: "National Coffee Research, Development and Extension Center", logo: "https://cvsu.edu.ph/wp-content/uploads/2021/12/NCRDEC.jpg", link: "http://cvsu.edu.ph/ovpre-ncrdec/" },
  { name: "Philippine Political Science Association (PPSA)", logo: "https://philpolsci.wordpress.com/wp-content/uploads/2024/01/philpolsci.jpg?w=200", link: "https://philpolsci.wordpress.com/" },
  { name: "LGU Mansalay", logo: "/ecosystem/mansalay.png", link: "https://cmci.dti.gov.ph/lgu-profile.php?lgu=Mansalay" },
  { name: "DOST MIMAROPA, Mansalay LGU, and SAMAKA", logo: "/ecosystem/dost_mimaropa.png", link: "https://region4b.dost.gov.ph/mansalay-farmers-trained-in-coffee-farming-and-processing-by-dost-mimaropa-minsu/" },
  { name: "TALARAK Foundation, Inc", logo: "https://static.wixstatic.com/media/b1fcd8_d16c7b4d6ea84df8a6092dba88235138%7Emv2.png/v1/fill/w_182,h_198,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/talarak_logo.png", link: "https://www.talarak.org/" },
  { name: "Department of Education-Division of Calapan", logo: "/ecosystem/depedcalapan.png", link: "https://depedcalapancity.com/" },
  { name: "DIVINE WORD COLLEGE OF CALAPAN, INC", logo: "https://dwcc.edu.ph/wp-content/uploads/2026/02/logo-sidehome.png", link: "https://dwcc.edu.ph/" },
  { name: "CITY COLLEGE OF CALAPAN", logo: "/ecosystem/ccc-header.png", link: "https://dlc.edu.ph/" },
  { name: "PHILIPPINE STATISTICS AUTHORITY", logo: "ecosystem/PSAHeaderWhite_resized_0.png", link: "https://psa.gov.ph/" },
  { name: "MANGYAN EDUCATION CENTER", logo: "/ecosystem/mangyan.jpg", link: "https://www.facebook.com/p/Mangyan-Education-Center-Inc-61558051874280/" },
  { name: "RSU-College of Business and Accountancy", logo: "/ecosystem/rsu-logo.png", link: "https://rsu.edu.ph/college?slug=cba" },
  { name: "IBSMA-Pinamalayan, Oriental Mindoro", logo: "/ecosystem/IBSMA.png", link: "https://ibsmaichoose.weebly.com/" },
  { name: "Sanguniang Barangay ng Mangangan, Baco", logo: "/ecosystem/mangangan.jpg", link: "https://www.facebook.com/profile.php?id=61587259476366#" },
  { name: "DAO Waterlily Association", logo: "/ecosystem/brgy dao.jpg", link: "https://www.facebook.com/p/Dao-waterlily-association-100070057776039/" },
  { name: "Samahan ng mga Magsasaka at Mangingisda sa Pocanil (SMMP)", logo: "/ecosystem/SAMAHAN.jpg", link: "https://www.facebook.com/watch/?v=1126614642313795" },
  { name: "Ruel Foundation, Masipit, Calapan City", logo: "/ecosystem/ruelfoundation.png", link: "http://ruelfoundation.ph/" },
  { name: "Aruga Foundation Inc., Masipit Calapan", logo: "/ecosystem/cda-logo-header.png", link: "https://cda.gov.ph/region-4b/celebrating-unity-a-day-of-joy-and-connection-at-aruga-kapatid-foundation/" },
  { name: "Pili National High School", logo: "/ecosystem/pili.jpg", link: "https://www.facebook.com/PiliNHS301647/" },
  { name: "ALS-DepEd", logo: "/ecosystem/als.png", link: "https://www.deped.gov.ph/k-to-12/inclusive-education/about-alternative-learning-system/" },
  { name: "Students Bucayao National High School", logo: "/ecosystem/bucayao.jpg", link: "https://www.facebook.com/bnhsofficial21/" },
  { name: "Saint Joseph Academy", logo: "/ecosystem/Screenshot 2026-05-14 095814.png", link: "https://sjasanjosebatangas.edu.ph/" },
  { name: "Innovative College of Science and Technology", logo: "/ecosystem/Screenshot 2026-04-27 141908.png", link: "https://home.icst.edu.ph/" },
  { name: "PMUI", logo: "/ecosystem/PMUI LOGO.avif", link: "https://www.pmui.org/" },
  { name: "BPI-Los Banos", logo: "/ecosystem/bpilosbanos.jpg", link: "https://www.facebook.com/bpilosbanos/" },
  { name: "Sanguniang Barangay ng Puting Tubig", logo: "/ecosystem/brgy puting tubig.jpg", link: "https://www.facebook.com/PutingTubigCalapanCity/" },
  { name: "Sanguniang Barangay ng Calero, Calapan City", logo: "/ecosystem/brgay calero.jpg", link: "https://www.facebook.com/p/Pamahalaang-Barangay-ng-Calero-100069265235743/" },
  { name: "Brgy. Balingayan, Calapan City", logo: "/ecosystem/Screenshot 2026-05-14 100239.png", link: "https://www.philatlas.com/luzon/mimaropa/oriental-mindoro/calapan/balingayan.html" },
  { name: "Sanguniang Barangay of Poblacion, San Teodoro", logo: "/ecosystem/poblacion.webp", link: "https://brgy.to/oriental-mindoro/san-teodoro/poblacion" },
  { name: "Sanguniang Barangay of Barangay Wawa, Calapan City", logo: "/ecosystem/brgy wawa.jpg", link: "https://www.facebook.com/Sbwawa2023/" },
  { name: "Sanguniang Barangay ng San Jose Naujan, Oriental Mindoro", logo: "/ecosystem/Screenshot 2026-05-14 100356.png", link: "https://www.philatlas.com/luzon/mimaropa/oriental-mindoro/naujan/san-jose.html" },
  { name: "Sanguniang Barangay ng Tawas, Bongabong (Mangyan Community)", logo: "/ecosystem/Screenshot 2026-05-14 100543.png", link: "https://www.philatlas.com/luzon/mimaropa/oriental-mindoro/bongabong/tawas.html" },
  { name: "Calapan City, Oriental Mindoro", logo: "/ecosystem/Calapan_City_Logo-1.png", link: "https://cityofcalapan.gov.ph/" },
  { name: "City Government of Calapan", logo: "/ecosystem/Calapan_City_Logo-1.png", link: "https://cityofcalapan.gov.ph/" },
  { name: "Mahal na Pangalan, Calapan City", logo: "/ecosystem/Calapan_City_Logo-1.png", link: "https://cityofcalapan.gov.ph/2025/10/16/library-on-wheels-barangay-mahal-na-pangalan-2/" },
  { name: "PGOM / PAgO", logo: "/ecosystem/cropped-PGOM-100x100.png", link: "https://ormindoro.gov.ph/2026/01/09/pgom-strengthens-fresh-prawn-farming-in-ormin/" },
  { name: "LGU-Victoria", logo: "/ecosystem/lguvictoria.jpg", link: "https://www.facebook.com/LGUVictoriaOrMin/" },
  { name: "LGU-Bongabong", logo: "/ecosystem/bongabong.jpg", link: "http://bongabong-connect-copy-d78944f2.base44.app/" },
  { name: "LGU-Gloria", logo: "/ecosystem/gloria.jpg", link: "http://gloria.gov.ph/" },
  { name: "MAO-Bulalacao", logo: "/ecosystem/maolgu.jpg", link: "https://www.facebook.com/municipalagricultureoffici.lgubulalacao/" },
  { name: "DENR-CENRO", logo: "/ecosystem/DENR-IV-A-CALABARZON.png", link: "https://calabarzon.denr.gov.ph/" },
  { name: "NCIP-Oriental Mindoro", logo: "/ecosystem/ncip.svg", link: "https://ncip.gov.ph/news/ncip-central-office-visits-oriental-mindoro/" },
  { name: "City Agriculture and Fishery Council (CAFC) - Calapan Sanguniang Barangay ng Tagumpay, Naujan", logo: "/ecosystem/calpan-naujan.jpg", link: "https://www.facebook.com/p/City-Agricultural-Services-Department-Calapan-City-61554793640385/" },
  { name: "Sanguniang Barangay ng Bethel, Victoria 4H Club", logo: "/ecosystem/BETHEL.jpg", link: "https://www.facebook.com/groups/863816324469369/" },
  { name: "Sanguniang Barangay ng Alcate, Victoria", logo: "/ecosystem/alcate.jpg", link: "https://www.facebook.com/skalcate/" },
  { name: "Sanguniang Barangay ng Balite, Naujan", logo: "/ecosystem/Screenshot 2026-05-14 101229.png", link: "https://www.philatlas.com/luzon/mimaropa/oriental-mindoro/naujan/balite.html" },
  { name: "Sanguniang Barangay ng Mangangan II, Baco", logo: "/ecosystem/mangangan.jpg", link: "https://www.philatlas.com/luzon/mimaropa/oriental-mindoro/baco/mangangan-ii.html" },
  { name: "Malamig Elementary School, Calapan City", logo: "/ecosystem/malamigelemcalap.jpg", link: "https://www.facebook.com/MalamigElementarySchool111565/" },
  { name: "Sanguniang Barangay of Mangangan, Baco", logo: "/ecosystem/mangangan.jpg", link: "https://www.facebook.com/profile.php?id=61587259476366#" },
  { name: "Bahay Kanlungan Center, Barangay Ilaya, Calapan City, Oriental Mindoro", logo: "/ecosystem/bahaykanlungan.webp", link: "https://dswdcashassistance.ph/bahay-kanlungan-women-children-mindoro/" },
  { name: "Sanguniang Barangay of Sitio Dulangan Baco", logo: "/ecosystem/brgy dulungan.jpg", link: "https://www.facebook.com/p/Barangay-Dulangan-1-100082437190605/" },
  { name: "Brgy. Aplaya, Bongabong", logo: "/ecosystem/brgy aplaya.jpg", link: "https://www.facebook.com/BrgyAplayaBongabongOrMdo/" },
  { name: "Sanguniang Barangay of Labasan, Oriental Mindoro", logo: "/ecosystem/brgy labasan.jpg", link: "https://www.facebook.com/p/Sangguniang-Kabataan-ng-Barangay-Labasan-61553162738037/" },
  { name: "Brgy. Poblacion, Mansalay, Oriental Mindoro", logo: "/ecosystem/brgy poblacion.jpg", link: "https://www.facebook.com/p/Barangay-POBLACION-Mansalay-100068356503497/" },
  { name: "Sangguniang Barangay ng San Ignacio, Baco", logo: "/ecosystem/Screenshot 2026-05-14 101731.png", link: "https://www.philatlas.com/luzon/mimaropa/oriental-mindoro/baco/san-ignacio.html" },
  { name: "Formon National High School", logo: "/ecosystem/formon.jpg", link: "https://www.facebook.com/FormonNationalHighSchool/" },
  { name: "Mangyan Mission Incorporated (MM Inc.)", logo: "/ecosystem/mangyanmission.jpg", link: "https://www.facebook.com/p/Mangyan-Mission-100067374363094/" },
  { name: "Father's House Christian Center Inc.", logo: "/ecosystem/Father's House Christian Center Inc..jpg", link: "https://www.facebook.com/fathershousechristiancenter/?locale=en_GB" },
  { name: "Mansalay, Oriental Mindoro", logo: "/ecosystem/mansalay.png", link: "https://www.philatlas.com/luzon/mimaropa/oriental-mindoro/mansalay.html" },
  { name: "Naujan Municipal High School", logo: "/ecosystem/naujan municipal.png", link: "https://www.facebook.com/naujanmunicipalhighschool/" },
  { name: "Oriental Mindoro National High School (OMNHS)", logo: "/ecosystem/omnhs.png", link: "https://omnhscalapancity.com/?AspxAutoDetectCookieSupport=1" },
  { name: "Baco National High School", logo: "/ecosystem/baconationalhighschool.png", link: "https://www.facebook.com/BacoNationalHighSchoolshsofficial/" },
  { name: "PAgO", logo: "/ecosystem/pago.svg", link: "https://www.pago.ro/en" },
  { name: "DepEd", logo: "/ecosystem/DepEd.png", link: "https://www.deped.gov.ph/" },
  { name: "Kisloyan Minority School", logo: "/ecosystem/kisyolan minority.jpg", link: "https://www.facebook.com/100085010255943/about/" },
  { name: "DENR-CENRO", logo: "/ecosystem/DENR-IV-A-CALABARZON.png", link: "https://calabarzon.denr.gov.ph/" },
  { name: "LGU-Calapan", logo: "/ecosystem/Calapan_City_Logo-1.png", link: "https://cityofcalapan.gov.ph/" },
  { name: "LGU-Naujan", logo: "/ecosystem/lgunaujan.jpg", link: "https://www.facebook.com/NaujanPIO/" },
  { name: "DEpED-MINAS Elementary School", logo: "/ecosystem/minas.jpg", link: "https://www.facebook.com/groups/1895538890729566/" },
  { name: "Sangguniang Barangay ng Tawiran", logo: "/ecosystem/brgy tawiran.jpg", link: "https://www.facebook.com/p/Tawiran-Sangguniang-Kabataan-61554110881014/" },
  { name: "Sangguniang Barangay ng Masipit", logo: "/ecosystem/brgy masipit.jpg", link: "https://www.facebook.com/masipit22/" },
  { name: "Sangguniang Barangay ng Aplaya 3", logo: "/ecosystem/brgy aplaya3.jpg", link: "https://www.facebook.com/SKBrgyAplaya/" },
  { name: "Independent Volunteers Monitoring Covid Care Concerned Doctors and Citizens Philippines", logo: "/ecosystem/IVMCC.png", link: "https://www.ivmcc.org/" },
  { name: "DSWD MIMAROPA Youth Center", logo: "/ecosystem/DSWD.png", link: "https://fo4b.dswd.gov.ph/2025/12/%F0%9D%90%83%F0%9D%90%92%F0%9D%90%96%F0%9D%90%83-%F0%9D%90%8C%F0%9D%90%88%F0%9D%90%8C%F0%9D%90%80%F0%9D%90%91%F0%9D%90%8E%F0%9D%90%8F%F0%9D%90%80-%F0%9D%90%98%F0%9D%90%A8%F0%9D%90%AE%F0%9D%90%AD/" },
  { name: "Pola Community College", logo: "/ecosystem/POLA COM.jpg", link: "https://www.facebook.com/polacommunitycollegesupremestudentcouncil/" },
  { name: "Sangguniang Barangay of Babangonan, Victoria", logo: "/ecosystem/brgy babangonan.jpg", link: "https://www.facebook.com/babangonanvictoria/" },
  { name: "Sangguniang Barangay of Alcate, Victoria", logo: "/ecosystem/brgy alcate.jpg", link: "https://www.facebook.com/skalcate/" },
  { name: "Sangguniang Barangay of Villa Cerveza, Victoria", logo: "/ecosystem/brgy villa serveza.jpg", link: "https://www.facebook.com/p/Sangguniang-Barangay-Villa-Cerveza-Victoria-Oriental-Mindoro-100065507649310/" },
  { name: "Community Vocational High School", logo: "/ecosystem/CVHS.png", link: "https://www.facebook.com/CVHS.Calapan/" },
  { name: "Pedro V. Panaligan Memorial National High School", logo: "/ecosystem/pedrocpanaligan MNHS.png", link: "https://www.facebook.com/depedcalapancitypedrovpanaligan/" },
  { name: "DSWD", logo: "/ecosystem/DSWD.png", link: "https://www.dswd.gov.ph/" },
  { name: "Fortunato Perez High School", logo: "/ecosystem/matatag fortunato g perez highschoool.jpg", link: "https://web.facebook.com/FPHS.304912/?_rdc=1&_rdr#" },
  { name: "Alcate High School", logo: "/ecosystem/alcate highschool.jpg", link: "https://web.facebook.com/alcatehighschool/?_rdc=1&_rdr#" },
  { name: "4H Club Youth Empowerment", logo: "/ecosystem/4-h-logo.svg", link: "https://4-h.org/" },
  { name: "VODACTCO", logo: "/ecosystem/VODACTCO.jpg", link: "https://www.facebook.com/VodactcoVictoria/" },
  { name: "Brgy. Dao, Naujan", logo: " /ecosystem/brgy dao.jpg", link: "https://www.facebook.com/pages/Dao.%20Naujan%20Oriental%20Mindoro/189995471630586/" },
  { name: "Eastern Mindoro College, Inc.", logo: "/ecosystem/EMC.jpg", link: "https://www.facebook.com/emcinc.hsdept/" },
  { name: "Felisa Guevara Salvacion Memorial Elementary School", logo: "/ecosystem/Screenshot 2026-05-14 105456.png", link: "https://www.facebook.com/pages/Guevara%20Elementary%20School/875338439271923/#" },
  { name: "Elim Mangyan High School", logo: "/ecosystem/elimlisapmangyan.jpg", link: "https://www.facebook.com/elimlisapmangyanhs/" },
  { name: "Department of Science and Technology - Philippine Council for Industry, Energy and Emerging Technology (DOST PCIEERD)", logo: "/ecosystem/DOST-PCIEERD.webp", link: "https://pcieerd.dost.gov.ph/" },
  { name: "UNIVERSITY INCUBATOR CONSORTIUM (UNIIC)", logo: "/ecosystem/CamTech-logo-wide.jpg", link: "https://camtech.edu.kh/university-incubator-consortium-uniic/" },
  { name: "Wadhwani Foundation", logo: "/ecosystem/Wadhwani-Foundation-Logo.webp", link: "https://wadhwanifoundation.org/" },
  { name: "Department of Agriculture (DA MIMAROPA), through DA - Agribusiness and Marketing Assistance Division (AMAD)", logo: "/ecosystem/AMAD.png", link: "https://mimaropa.da.gov.ph/about/frontline-services/amad" },
  { name: "Department of Agrarian Reform (DAR - Oriental Mindoro)", logo: "/ecosystem/DAR.png", link: "https://www.dar.gov.ph/home" },
  { name: "Department of Trade and Industry (DTI - Oriental Mindoro)", logo: "/ecosystem/DTI.jpg", link: "https://www.facebook.com/DTI.OrientalMindoro/" },
  { name: "Occidental Mindoro State College (OMSC), through Technology Business Incubation and Development Office (TBIDO)", logo: "/ecosystem/omsc.logo.png", link: "https://omsc.edu.ph/news/omsc-tbid-and-dti-occidental-mindoro-forge-partnership-to-advance-startup-development" },
  { name: "Fhether John B. Calanday, Co-Founder of IT-ERA Technology Solutions", logo: "/ecosystem/ITERA.png", link: "https://www.facebook.com/iTEraCompany/" },
  { name: "Francis Neil B. Quijano, Lead Agritech of AGRITEKTURA", logo: "/ecosystem/AGRITEKTURA-LOGO-ICON.png", link: "https://agritektura.ph/people/" },
  { name: "Nelson B. Gabutero, Owner of Gabutero Organic Farm", logo: "/ecosystem/gabutero.jpg", link: "https://www.facebook.com/gabuteroorganicfarm/" },
];

// 5. Research Page Content
export const researchServices = [
  { title: "Research Proposal Assistance", desc: "Guidance in proposal writing, documentation, and methodology development for impactful research.", color: "#166534", bg: "linear-gradient(145deg, #f0fdf4, #dcfce7)", border: "#bbf7d0" },
  { title: "Publication Support", desc: "Help with journal selection, formatting, and submission to maximize publication success.", color: "#1e40af", bg: "linear-gradient(145deg, #eff6ff, #dbeafe)", border: "#bfdbfe" },
  { title: "Data Analysis Support", desc: "Basic consultation on research data handling, statistical tools, and interpretation of results.", color: "#9a3412", bg: "linear-gradient(145deg, #fff7ed, #ffedd5)", border: "#fed7aa" },
  { title: "Research Funding Information", desc: "Updates on grants, funding opportunities, and financial support for research initiatives.", color: "#6b21a8", bg: "linear-gradient(145deg, #faf5ff, #f3e8ff)", border: "#e9d5ff" },
  { title: "Capacity Building", desc: "Trainings, seminars, and workshops designed to enhance research skills and scholarly competence.", color: "#0e7490", bg: "linear-gradient(145deg, #ecfeff, #cffafe)", border: "#a5f3fc" },
];

// 6. Innovation Page Content
export const innovationPillars = [
  {
    letter: "B",
    front: "Boost Knowledge and Technology Innovations and Transfer",
    back: "Supported generation, transfer, and commercialization of innovations and intellectual property, leading to enhanced research impact, societal relevance, and regional development.",
    link: "/technology-transfer",
  },
  {
    letter: "U",
    front: "Upskilled Faculty, Students, and Communities in Innovation",
    back: "Enhanced innovation competencies and entrepreneurial skills of faculty, students, and communities, leading to greater problem-solving capacity, applied research, and industry relevance.",
  },
  {
    letter: "I",
    front: "Implemented Smart University Systems and Infrastructure",
    back: "Optimized operations and research productivity through smart systems and advanced infrastructure, leading to improved efficiency, technology adoption, and innovation outputs.",
  },
  {
    letter: "L",
    front: "Launched Accelerated Entrepreneurial and Startup Ecosystems",
    back: "Strengthened entrepreneurial and startup ecosystem, leading to scalable spinoffs, technology commercialization, and expanded market opportunities.",
  },
  {
    letter: "T",
    front: "Transformed Communities and MSMEs through Inclusive Innovation",
    back: "Enabled adoption of innovations and capacity-building for communities and MSMEs, leading to increased productivity, competitiveness, and inclusive socioeconomic growth.",
  },
];

export const ttpuNews = [
  {
    id: 1,
    category: "Event",
    title: "𝗠𝗶𝗻𝗦𝗨 𝗥𝗲𝗰𝗼𝗴𝗻𝗶𝘇𝗲𝗱 𝗮𝘀 𝟭𝟬𝟱𝘁𝗵  𝗜𝗧𝗦𝗢 𝗠𝗲𝗺𝗯𝗲𝗿 𝗯𝘆 𝗜𝗣𝗢𝗣𝗛𝗜𝗟",
    description: "Mindoro State University (MinSU) has been officially welcomed as the 105th  member of the Innovation and Technology Support Office (ITSO) network under the Intellectual Property Office of the Philippines (IPOPHIL), following a strategic meeting held on May 6, 2026. The meeting was attended by key officials from IPOPHIL, including Hon. Ralph Jharvis H. Alindogan, J.D., Director IV of the Documentation, Information, and Technology Transfer Bureau (DITTB); Engr. Chamlette D. Garcia, Director III; and Maria Leidy Gatuz, IP Rights Specialist III, along with other IPOPHIL personnel. Representing MinSU were Prof. Leonel C. Mendoza, Vice President for Research, Innovation, Technology, and Extension; Dr. Polemer Cuarto IV, Director of Research and Publication Services; Engr. Randy A. Joco, Director of Innovation; and members of the university’s ITSO support team.",
    date: "𝙼𝚊𝚢 𝟼, 𝟸𝟶𝟸𝟼 ",
    image: "/ITso.jpg",
  },
  {
    id: 2,
    category: "Partnership",
    title: "Industry Partnership Signed",
    description: "TTPU has signed a technology licensing agreement with a leading pharmaceutical company.",
    date: "February 15, 2026",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    category: "Event",
    title: "IP Awareness Workshop Held",
    description: "Over 100 researchers attended our comprehensive IP awareness seminar.",
    date: "February 10, 2026",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    category: "Technology",
    title: "Spinoff Company Formation",
    description: "New startup launched based on RITE's innovative technology.",
    date: "February 5, 2026",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    category: "Achievement",
    title: "Innovation Award Received",
    description: "RITE recognized for outstanding contributions to technology transfer.",
    date: "January 30, 2026",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
  },
];

export const ttpuForms = [
  { name: "IP Application form", downloadUrl: "/forms/ip-application-form.pdf" },
  { name: "Invention / Creative Work Disclosure Form (IDF)", downloadUrl: "/forms/invention-disclosure-form.pdf" },
  { name: "Licensing Agreement Template", downloadUrl: "/forms/licensing-agreement-template.pdf" },
  { name: "Material Transfer Agreement (MTA) Template", downloadUrl: "/forms/mta-template.pdf" },
  { name: "Non-Disclosure Agreement (NDA) Template", downloadUrl: "/forms/nda-template.pdf" },
  { name: "Spin off Valuation Checklist", downloadUrl: "/forms/spinoff-valuation-checklist.pdf" },
  { name: "TRL-Based Valuation Table", downloadUrl: "/forms/trl-valuation-table.pdf" },
];

export const ttpuFunctions = [
  {
    title: "Strengthen IP Creation",
    gradient: "linear-gradient(135deg, #094A25 0%, #062f1a 100%)",
    color: "white",
    bullets: [
      "Conducting IP awareness seminars and workshops.",
      "Consulting on patents, copyrights, trademarks, and industrial designs.",
      "Guiding preparation of invention disclosures and documentation.",
      "Advising on research data management and prior art searches.",
      "Identifying commercially viable ideas for IP protection.",
      "Coordinating with R&D units to capture potential IP from ongoing projects.",
    ],
  },
  {
    title: "Facilitate IP Protection",
    gradient: "linear-gradient(135deg, #0C6B37 0%, #094a27 100%)",
    color: "white",
    bullets: [
      "Provide general IP guidance on patents, trademarks, copyrights, and utility models.",
      "Conduct skills training in patent drafting and prosecution.",
      "Render patent drafting and filing services.",
      "Support patent prosecution and coordinate with the Intellectual Property Office.",
      "Manage IP portfolios and advise on enforcement and infringement issues.",
      "Assist in technology licensing, NDAs, and commercialization arrangements ongoing projects.",
    ],
  },
  {
    title: "Promote IP Utilization",
    gradient: "linear-gradient(135deg, #FFC107 0%, #FFB300 100%)",
    color: "#333",
    bullets: [
      "Organize IP exhibitions, showcases, and fairs.",
      "Develop digital catalogs and platforms for IP publicity.",
      "Conduct media outreach to highlight innovation achievements.",
      "Provide IP audit, evaluation, and valuation services.",
      "Offer training on IP licensing for patents, copyrights, trademarks, and utility models.",
      "Serve as a depository for patent-related documents, papers, and statistics.",
    ],
  },
  {
    title: "Support Technology Transfer",
    gradient: "linear-gradient(135deg, #EB442C 0%, #D93A1F 100%)",
    color: "white",
    bullets: [
      "Identifying industry partners and commercialization opportunities.",
      "Drafting and negotiating technology licensing agreements.",
      "Supporting the creation of spinoff companies.",
      "Providing incubation and mentoring for IP-based startups.",
      "Conducting market feasibility studies and business planning.",
      "Monitoring post-transfer implementation and assessing impact.",
    ],
  },
];

// 7. Innovation Hub Page Content
export const innovationHubInitiatives = [
  {
    path: "/bakodhub",
    title: "BUKID Hub",
    description: "A dedicated incubation platform fostering entrepreneurship, technology development, and strategic partnerships to commercialize innovations.",
    features: ["Incubation", "Entrepreneurship", "Partnerships"],
    color: "#0b7f47",
    gradient: "linear-gradient(135deg, #0b7f47 0%, #16a34a 100%)",
  },
  {
    path: "/project-mauya",
    title: "Project MAUYA",
    description: "Community-driven innovation initiatives delivering targeted solutions through field pilots, capacity-building workshops, and stakeholder engagement.",
    features: ["Field Pilots", "Capacity Building", "Community Labs"],
    color: "#059669",
    gradient: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
  },
];

// 8. BUKID Hub Page Content
export const bukidHubData = {
  title: "BUKID Hub",
  tagline: "Business Upgrading for Knowledge, Innovation and Development Hub",
  description: "A structured support system for entrepreneurship, training, and mentorship — empowering YFC awardees, young agripreneurs, and local startups across the MIMAROPA region.",
  sdgs: ["SDG-1 No Poverty", "SDG-2 Zero Hunger", "SDG-8 Decent Work", "SDG-9 Innovation", "SDG-11 Sustainable Cities", "SDG-12 Responsible Consumption", "SDG-17 Partnerships"],
  stats: [
    { value: "₱2.71M", label: "Total Project Cost", sub: "DA + MinSU Combined" },
    { value: "30+", label: "Target Clients", sub: "YFC, Agripreneurs, Startups" },
    { value: "2", label: "Functional Zones", sub: "Food Lab + IoT Fab-Lab" },
    { value: "3.7 yrs", label: "Payback Period", sub: "Strong Viability" },
  ],
  about: {
    text1: "The MIMAROPA region holds the third smallest number of MSMEs and ranks as the second slowest-growing region among 17 regions in the Philippines. BUKID Hub addresses this by providing structured support for entrepreneurship, training programs, and mentorship.",
    text2: "Through the partnership between MinSU and Department of Agriculture MIMAROPA, the hub will facilitate ventures in biowaste products, renewable energy, food innovation, smart agriculture, and IoT for sustainable communities — fueling regional economic growth.",
    details: [
      { label: "Implementing Agency", value: "MinSU (i-BIBES) & IABE" },
      { label: "Funding Agency", value: "DA RFO MIMAROPA – AMAD" },
      { label: "Location", value: "ABE Processing Lab, MinSU Main Campus" },
      { label: "DA Funding", value: "₱2,000,000.00" },
    ],
  },
  objectives: [
    { num: "01", title: "Prototyping & Fabrication", desc: "Provide equipment for product development, enabling YFC awardees and startups to build market-ready prototypes." },
    { num: "02", title: "Food Innovation", desc: "Provide machinery and equipment for value-addition of agricultural commodities through advanced food processing." },
    { num: "03", title: "Mentorship & Training", desc: "Deliver comprehensive mentorship and training to YFC awardees, young agripreneurs, and local startups." },
    { num: "04", title: "Partnerships", desc: "Establish partnerships between local businesses, government agencies, educational institutions, and industry experts." },
  ],
  focusAreas: [
    { icon: "🧪", title: "Biowaste-Derived Products", desc: "Transforming agricultural waste into high-value products through innovative processing and bioengineering techniques." },
    { icon: "⚡", title: "Renewable Energy", desc: "Developing sustainable energy solutions for farming communities, including solar-powered agricultural equipment." },
    { icon: "🍽️", title: "Food Innovation", desc: "Creating value-added agricultural commodities through food processing, preservation, and product development." },
    { icon: "🌾", title: "Smart Agriculture & Fisheries", desc: "Implementing IoT-based monitoring and precision farming technologies for improved crop and aquaculture management." },
    { icon: "📡", title: "IoT for Sustainable Community", desc: "Building connected systems that optimize resource use and enable data-driven decision making for communities." },
    { icon: "🏭", title: "Prototyping & Fabrication", desc: "Providing state-of-the-art 3D printing and fabrication tools for rapid product development and testing." },
  ],
  carouselImages: [
    { title: "Lounge & Collaboration Area", description: "Comfortable seating area designed for client consultations, mentorship sessions, and collaborative discussions between agripreneurs and mentors.", figure: "Figure 1", placeholder: "/bukid-lounge.png" },
    { title: "Food Innovation Laboratory", description: "Fully equipped food processing facility with stainless steel tables, dehydrator, vacuum packing machine, autoclave sterilizers, and other state-of-the-art equipment.", figure: "Figure 2", placeholder: "/bukid-foodlab.png" },
    { title: "Hub Interior Overview", description: "Wide-angle view showing the integrated layout of the Food Innovation Laboratory and IoT Fab-Lab with the collaborative lounge area.", figure: "Figure 3", placeholder: "/bukid-interior.png" },
    { title: "BUKID Hub Exterior", description: "Front view of the BUKID Hub building at the ABE Processing Laboratory, featuring MinSU i-BIBES and Innovation Development Hub branding.", figure: "Figure 4", placeholder: "/bukid-exterior.png" },
  ],
  zones: [
    {
      title: "Food Innovation Laboratory",
      icon: "🍽️",
      gradient: "linear-gradient(135deg, #166534 0%, #84cc16 100%)",
      desc: "Equipped with state-of-the-art equipment to support food innovation and product development for agricultural commodities.",
      equipment: [
        "1 unit Dehydrator",
        "1 unit Continuous Band Sealer",
        "1 unit Heavy Duty Blender",
        "2 units Plastic Labelling Machine",
        "1 unit Freezer & 1 unit Refrigerator",
        "1 set Burner with LPG",
        "3 units Stainless Steel Table",
        "3 units Weighing Scale",
        "1 full set Kitchen Utensils",
        "1 unit Vacuum Packing Machine w/ Nitrogen Flushing",
        "1 set Laboratory Tools",
        "1 unit Essential Oil Distillation Unit",
        "2 units Vertical Autoclave Sterilizer",
      ],
    },
    {
      title: "Machinery / IoT Fab-Lab",
      icon: "⚙️",
      gradient: "linear-gradient(135deg, #6b3f1d 0%, #15803d 100%)",
      desc: "Essential tools for prototyping and product development, enabling fabrication of innovative agricultural machinery and IoT solutions.",
      equipment: [
        "2 units 3D Printers with Filaments",
        "2 units Steel Cabinets",
        "2 sets Sofas",
        "Prototyping workspace",
        "IoT development tools",
        "Product testing area",
      ],
    },
  ],
  operations: {
    schedule: [
      { hours: "4 hrs", title: "YFC & Incubatees", desc: "Reserved exclusively for YFC awardees and MinSU i-BIBES incubatees — free of charge", icon: "🌾" },
      { hours: "2 hrs", title: "Tolling Services", desc: "For external clients beyond target groups, with rental fees per equipment hour", icon: "🏭" },
      { hours: "2 hrs", title: "Maintenance", desc: "Equipment and facility maintenance to keep everything in top operational shape", icon: "🔧" },
    ],
    terms: "📋 YFC awardees must be endorsed by DA-AMAD • Incubatees need endorsement from MinSU i-BIBES • Equipment rental: ₱1,500/hr (₱100/equipment) for external clients",
  },
  yfcAwardees2023: [
    "LA Flavoured Salted Egg – Earl T. Legaspi",
    "Made in Silangang Mindoro: VCO – Welmar G. Delos Reyes et al.",
    "Monti Fish Farm – Mark Jayson Lualhati",
    "Pig-Give-Back Hog Farming – Julius C. Medes & Charlie G. Magsino",
    "JR Hog Farm Enterprise – Ramon De Guzman",
    "Mr. Tubu Sugarcane Supplies – Jezreel C. Laging",
    "KMJC Infeedgreted Farm – Jestoni M. Atienza",
    "Mentor's Sustainable Native Pig – Bonifacio R. Claveria",
  ],
  yfcAwardees2024: [
    "Charm Hydroventure – Charmain D. Hernandez",
    "Agri Side – Clinton D. Conde",
    "Crab-beng Taba – Glenn Jahred S. Guatno",
    "Chickelon Agri-Fastfood – Mark Marlon G. Suarez",
    "Aquacraytech – Rose Anne B. Damilig et al.",
    "Integrated Gold Agri Farm – Allysa Clarish G. Comia et al.",
  ],
  outputs: [
    { icon: "👥", title: "People Service", value: "10+", desc: "YFC awardees granted facility access, plus 20+ young agripreneurs and 30 clients capacitated" },
    { icon: "🚀", title: "Products", value: "20+", desc: "New innovative products and solutions developed by empowered agripreneurs" },
    { icon: "🏢", title: "Place", value: "1", desc: "Established BUKID Hub at Mindoro State University—a regional innovation center" },
    { icon: "🤝", title: "Partnerships", value: "3+", desc: "Collaborative projects with DA MIMAROPA, LGUs, YFC awardees, and startups" },
    { icon: "🌐", title: "Ecosystem", value: "1", desc: "Startup ecosystem uniting NGAs, LGUs, and MinSU for entrepreneurship" },
  ],
  impacts: [
    {
      icon: "💰",
      title: "Economic Impact",
      color: "#166534",
      gradient: "linear-gradient(135deg, #6b3f1d, #166534)",
      items: [
        "Transformative economic growth through agricultural enterprises",
        "Creation of new job opportunities enhancing community stability",
        "Increased demand for raw materials and agricultural commodities",
        "Support for agricultural innovation and economic resilience",
        "Cultivation of a robust agricultural sector adaptable to market demands",
      ],
    },
    {
      icon: "🤝",
      title: "Social Impact",
      color: "#15803d",
      gradient: "linear-gradient(135deg, #365314, #15803d)",
      items: [
        "Essential training and mentorship for YFC awardees and agripreneurs",
        "Skills development in innovation and enhanced farming practices",
        "Improvement in financial stability and welfare of clients",
        "Facilitation of client base expansion through the hub's network",
        "Fostering a thriving agricultural community through collaboration",
      ],
    },
    {
      icon: "♻️",
      title: "Sustainability Plan",
      color: "#22c55e",
      gradient: "linear-gradient(135deg, #7c4a23, #22c55e)",
      items: [
        "Revenue from facility rental fees for long-term sustainability",
        "Energy-efficient machinery and waste reduction strategies",
        "Local material sourcing and environmentally friendly operations",
        "Regular economic and environmental impact assessments",
        "Community events and workshops promoting knowledge sharing",
      ],
    },
  ],
  leadership: {
    leader: { name: "Engr. Randy A. Joco", role: "TBI Manager / Project Lead", initial: "R" },
    members: ["Engr. Christian B. Hernandez", "Dr. Jerrel S. Reyes", "Engr. Jake Siscar", "Ms. Flordemae Ines", "Ms. Arlhet O. Atienza", "Dr. Enya Marie D. Apostol"],
  },
  structure: [
    { role: "Funding Agency", name: "DA MIMAROPA (AMAD)", desc: "Project funding and YFC endorsement", color: "#365314" },
    { role: "Implementing Agency", name: "Mindoro State University", desc: "Approved by SUC President III", color: "#6b3f1d" },
    { role: "Supervision", name: "Research, Development & Extension Dept.", desc: "Oversight and strategic direction", color: "#15803d" },
    { role: "Management", name: "MinSU i-BIBES", desc: "Day-to-day operations with IABE collaboration", color: "#166534" },
    { role: "Operations", name: "Engr. Randy A. Joco – Project Leader", desc: "Coordinating closely with IABE for facilitation", color: "#22c55e" },
  ],
};

// 9. Project MAUYA Page Content
export const projectMauyaData = {
  title: "Project MAUYA",
  tagline: "Modern Agricultural Urban and Peri-Urban Yield Advancement",
  description: "A demonstration and training site integrating vertical farming, hydroponics, aquaponics, and renewable energy to uplift local production and capacity.",
  sdgs: ["SDG-2 Zero Hunger", "SDG-8 Decent Work", "SDG-9 Innovation", "SDG-11 Sustainable Cities", "SDG-17 Partnerships"],
  stats: [
    { value: "₱4M", label: "Project Funding", sub: "DA RFO MIMAROPA" },
    { value: "150+", label: "Target Trainees", sub: "Farmers & Students" },
    { value: "4", label: "Smart Systems", sub: "Integrated Technologies" },
    { value: "2.36x", label: "Benefit-Cost Ratio", sub: "Return per Peso" },
  ],
  about: {
    text1: "Project MAUYA establishes demonstration farms and training facilities for urban agriculture at Mindoro State University, integrating smart systems and renewable energy.",
    text2: "The initiative targets capacity building, sustainable production methods, and income-generating activities for local communities and students.",
    details: [
      { label: "Implementing Agency", value: "Mindoro State University" },
      { label: "Cooperating Agency", value: "DA RFO MIMAROPA" },
      { label: "Location", value: "Brgy. Alcate, Victoria, Oriental Mindoro" },
      { label: "Project Structure", value: "10-year lifespan" },
    ],
  },
  objectives: [
    { num: "01", title: "Design & Construction", desc: "Build automated vertical gardens, hydroponic, aquaponics, and drip fertigation systems." },
    { num: "02", title: "Hands-On Training", desc: "Train farmers, students, and extension workers in smart farming." },
    { num: "03", title: "Market Analysis", desc: "Develop sustainable business models and value chains." },
  ],
  focusAreas: [
    { icon: "🌿", title: "Vertical Farming", desc: "Stacked production systems for increased yield." },
    { icon: "💧", title: "Hydroponics", desc: "Water-efficient, soilless production methods." },
    { icon: "🐟", title: "Aquaponics", desc: "Circular systems linking fish and plants." },
    { icon: "⚡", title: "Solar Integration", desc: "Renewable energy powering automated systems." },
    { icon: "🧪", title: "Crop Science", desc: "Research-driven crop selection and management." },
    { icon: "🍅", title: "Drip Fertigation", desc: "Precise nutrient delivery for quality produce." },
  ],
  carouselImages: [
    { title: "Greenhouse Demonstration", description: "Solar-powered automated greenhouse showcasing vertical systems and climate control.", figure: "Figure 1", placeholder: "/greenhouse.png" },
    { title: "Aquaponics Unit", description: "Integrated aquaponics system demonstrating fish-plant symbiosis for nutrient recycling.", figure: "Figure 2", placeholder: "/aquaponics.png" },
    { title: "Vertical Farming", description: "Vertical towers maximizing yield per area with LED lighting and automated irrigation.", figure: "Figure 3", placeholder: "/vertical.png" },
  ],
  outputs: [
    { icon: "👥", title: "People Service", desc: "150+ trained farmers, students, and practitioners", value: "150+" },
    { icon: "🌱", title: "Products", desc: "Increased production using smart farming", value: "12x" },
    { icon: "🤝", title: "Partnerships", desc: "Collaborations with DA and local partners", value: "3+" },
  ],
  impacts: [
    { icon: "🌍", title: "Social Impact", color: "#16a34a", gradient: "linear-gradient(135deg, #0b7f47, #16a34a)", items: ["Capacitate farmers with modern smart farming techniques", "Address urban food security"] },
    { icon: "💰", title: "Economic Impact", color: "#059669", gradient: "linear-gradient(135deg, #059669, #10b981)", items: ["Increase crop yields and profitability", "Create job opportunities"] },
    { icon: "♻️", title: "Environmental Impact", color: "#10b981", gradient: "linear-gradient(135deg, #10b981, #34d399)", items: ["Conserve water and protect ecosystems", "Promote resource-efficient agriculture"] },
  ],
};

// 10. Research Ethics & Integrity Page Content
export const ethicsPrograms = [
  { title: "Research Ethics Review", desc: "Thorough evaluation of research involving human or animal subjects to ensure compliance with ethical standards.", color: "#166534", bg: "linear-gradient(145deg, #f0fdf4, #dcfce7)", border: "#bbf7d0" },
  { title: "Ethics Clearance", desc: "Issuance of ethics approval, certifications, and documentation required for responsible research conduct.", color: "#1e40af", bg: "linear-gradient(145deg, #eff6ff, #dbeafe)", border: "#bfdbfe" },
  { title: "Integrity Monitoring", desc: "Promoting honesty, accountability, and transparency in all stages of the research process.", color: "#9a3412", bg: "linear-gradient(145deg, #fff7ed, #ffedd5)", border: "#fed7aa" },
  { title: "Ethics Training", desc: "Seminars and workshops on ethical standards, compliance protocols, and best practices in research integrity.", color: "#6b21a8", bg: "linear-gradient(145deg, #faf5ff, #f3e8ff)", border: "#e9d5ff" },
];

// 11. Extension Services Page Content
export const extensionPrograms = [
  { title: "Community Engagement", desc: "Outreach programs and capacity building that empower local communities through education and sustainable practices.", color: "#166534", bg: "linear-gradient(145deg, #f0fdf4, #dcfce7)", border: "#bbf7d0" },
  { title: "Training & Workshops", desc: "Skills development programs for partner communities, enhancing knowledge transfer and professional growth.", color: "#1e40af", bg: "linear-gradient(145deg, #eff6ff, #dbeafe)", border: "#bfdbfe" },
  { title: "Technology Transfer", desc: "Sharing research outputs for practical use, bridging the gap between academic innovation and real-world application.", color: "#9a3412", bg: "linear-gradient(145deg, #fff7ed, #ffedd5)", border: "#fed7aa" },
  { title: "Partnership Programs", desc: "Strategic collaboration with LGUs, NGOs, and industries to maximize community impact and institutional reach.", color: "#6b21a8", bg: "linear-gradient(145deg, #faf5ff, #f3e8ff)", border: "#e9d5ff" },
];

// 12. Highly Specialized Research Centers Pages (Structured Catalog)
export const researchCenters = {
  "mindoro-development": {
    title: "Mindoro Development and Studies Center",
    icon: "🏝️",
    gradient: "linear-gradient(135deg, #064e3b 0%, #065f46 30%, #047857 60%, #059669 100%)",
    themeColor: "#059669",
    description: "Conducting comprehensive research on the socio-economic, environmental, and cultural aspects of Mindoro — fostering sustainable development and regional growth.",
    focusAreas: [
      { icon: "🏗️", title: "Regional Development", desc: "Analyzing and promoting sustainable development initiatives in Mindoro region.", color: "#059669", bg: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)" },
      { icon: "📊", title: "Socio-Economic Studies", desc: "Investigating social and economic conditions for improved quality of life.", color: "#0284c7", bg: "linear-gradient(135deg, #f0f9ff 0%, #dbeafe 100%)" },
      { icon: "🌿", title: "Environmental Conservation", desc: "Protecting Mindoro's natural resources and ecosystems.", color: "#16a34a", bg: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)" },
      { icon: "🏛️", title: "Cultural Heritage Studies", desc: "Documenting and preserving the cultural identity of Mindoro communities.", color: "#9333ea", bg: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)" },
    ],
    programs: [
      { icon: "📋", title: "Policy Research & Advisory", desc: "Evidence-based policy recommendations for local government units to support sustainable regional development and resource management.", color: "#059669" },
      { icon: "🎓", title: "Community Development Training", desc: "Capacity-building programs for community leaders, cooperatives, and local organizations in livelihood, governance, and planning.", color: "#0284c7" },
      { icon: "📖", title: "Cultural Documentation", desc: "Systematic recording and preservation of Mangyan heritage, indigenous knowledge systems, and Mindoro's cultural traditions.", color: "#9333ea" },
    ],
    mission: "To advance knowledge and understanding of Mindoro's unique characteristics and challenges, contributing to evidence-based policy making and sustainable development in the region.",
  },
  "digital-innovation": {
    title: "Center for Digital Innovation, Cybersecurity & Emerging Technologies",
    icon: "💻",
    gradient: "linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #1e40af 70%, #3b82f6 100%)",
    themeColor: "#3b82f6",
    description: "Advancing digital transformation and cybersecurity research to address emerging technological challenges and opportunities in the modern digital landscape.",
    focusAreas: [
      { icon: "🔒", title: "Cybersecurity Research", desc: "Developing robust security solutions and protocols for digital systems.", color: "#dc2626", bg: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)" },
      { icon: "🤖", title: "Artificial Intelligence & ML", desc: "Exploring AI applications and innovation in business and society.", color: "#7c3aed", bg: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)" },
      { icon: "☁️", title: "Cloud Computing & IoT", desc: "Researching distributed computing and Internet of Things technologies.", color: "#0284c7", bg: "linear-gradient(135deg, #f0f9ff 0%, #dbeafe 100%)" },
      { icon: "🌿", title: "Digital Transformation", desc: "Supporting organizations in adopting digital technologies and strategies.", color: "#d97706", bg: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)" },
    ],
    programs: [
      { icon: "🔒", title: "Cybersecurity Assessment", desc: "Vulnerability analysis and threat intelligence testing for organizations.", color: "#dc2626" },
      { icon: "🤖", title: "AI Application Building", desc: "Prototyping machine learning and artificial intelligence systems for process optimization.", color: "#7c3aed" },
      { icon: "☁️", title: "IoT Hub Development", desc: "Technical implementation support for cloud integrations and hardware prototyping.", color: "#0284c7" },
    ],
    mission: "To pioneer research in digital innovation and cybersecurity, fostering a secure and innovative digital ecosystem that supports organizational and societal growth.",
  },
  "environmental-studies": {
    title: "Center for Environmental Studies",
    icon: "🌿",
    gradient: "linear-gradient(135deg, #064e3b 0%, #065f46 30%, #047857 60%, #10b981 100%)",
    themeColor: "#10b981",
    description: "Dedicated to sustainability, conservation, and ecosystem protection through innovative research and practical solutions for environmental challenges.",
    focusAreas: [
      { icon: "🦋", title: "Biodiversity Conservation", desc: "Protecting and restoring natural habitats and species diversity.", color: "#059669", bg: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)" },
      { icon: "🌡️", title: "Climate Change Research", desc: "Studying climate impacts and developing mitigation and adaptation strategies.", color: "#dc2626", bg: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)" },
      { icon: "♻️", title: "Sustainable Resource Management", desc: "Promoting responsible use and management of natural resources.", color: "#0284c7", bg: "linear-gradient(135deg, #f0f9ff 0%, #dbeafe 100%)" },
      { icon: "🧪", title: "Pollution Control & Remediation", desc: "Developing solutions for air, water, and soil contamination.", color: "#d97706", bg: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)" },
    ],
    programs: [
      { icon: "🦋", title: "Eco-Monitoring Projects", desc: "Conducting biodiversity audits and tracking ecological shifts across protected locations.", color: "#059669" },
      { icon: "🌡️", title: "Climate Adaptation Advisory", desc: "Partnering with local agencies to design disaster risk reduction schemes.", color: "#dc2626" },
      { icon: "♻️", title: "Waste Management Audits", desc: "Assisting local communities and businesses with zero-waste frameworks.", color: "#0284c7" },
    ],
    mission: "To advance environmental knowledge and drive sustainable practices that protect our planet for future generations while supporting economic and social development.",
  },
  "fisheries-research": {
    title: "Fisheries Research and Development Center",
    icon: "🐟",
    gradient: "linear-gradient(135deg, #0c4a6e 0%, #0891b2 60%, #06b6d4 100%)",
    themeColor: "#0891b2",
    description: "Advancing aquatic science and sustainable fishing technologies to support food security and the livelihoods of fishing communities.",
    focusAreas: [
      { icon: "🐟", title: "Sustainable Fishing Practices", desc: "Developing methods that balance productivity with ecosystem health.", color: "#0891b2", bg: "linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)" },
      { icon: "🦐", title: "Aquaculture Development", desc: "Advancing fish farming and breeding technologies.", color: "#0d9488", bg: "linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)" },
      { icon: "🐠", title: "Fish Biology & Ecology", desc: "Understanding aquatic ecosystems and species behavior.", color: "#2563eb", bg: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)" },
      { icon: "🧊", title: "Post-Harvest Technology", desc: "Improving processing, preservation, and product development.", color: "#7c3aed", bg: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)" },
    ],
    programs: [
      { icon: "🎓", title: "Fisher-Folk Training", desc: "Capacity-building workshops on modern, sustainable fishing techniques, net mending, and safety at sea for local fishing communities.", color: "#0891b2" },
      { icon: "🔬", title: "Water Quality Testing", desc: "Laboratory services for monitoring water quality in coastal and inland fisheries, ensuring safe environments for aquaculture production.", color: "#0d9488" },
      { icon: "🐟", title: "Fingerling Production", desc: "Breeding and distribution of quality fingerlings to support local aquaculture ventures and community-based fish farming projects.", color: "#2563eb" },
    ],
    highlights: [
      { tag: "Aquaculture", title: "Tilapia Breeding Optimization in Mindoro Waters", desc: "A study on selective breeding techniques producing higher yield and disease-resistant tilapia strains adapted to local conditions.", tagColor: "#06b6d4" },
      { tag: "Conservation", title: "Mangrove Ecosystem Restoration for Fisheries", desc: "Assessing the impact of mangrove rehabilitation on fish stocks and biodiversity in coastal areas of Oriental Mindoro.", tagColor: "#10b981" },
      { tag: "Technology", title: "Solar-Powered Fish Drying Systems", desc: "Development and field-testing of low-cost solar dryers to improve post-harvest fish quality and reduce spoilage for small-scale fishers.", tagColor: "#f59e0b" },
    ],
    mission: "To strengthen the fisheries sector through research-driven innovations, ensuring sustainable aquatic resource management and improved food security.",
    ctaText: "Whether you're a fisherfolk cooperative, an LGU, or an academic institution — we welcome collaborations that advance sustainable fisheries in the MIMAROPA region and beyond.",
  },
  "mimaropa-food": {
    title: "MIMAROPA Food Innovation Center",
    icon: "🍊",
    gradient: "linear-gradient(135deg, #7c2d12 0%, #c2410c 40%, #ea580c 70%, #f97316 100%)",
    themeColor: "#ea580c",
    description: "Focusing on nutrition, food safety, and agricultural processing innovations to enhance food security and support local farmers in the MIMAROPA region.",
    focusAreas: [
      { icon: "🏭", title: "Food Processing Innovation", desc: "Developing value-added food products and processing technologies.", color: "#ea580c", bg: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)" },
      { icon: "🛡️", title: "Food Safety & Quality", desc: "Ensuring food safety standards and quality assurance.", color: "#0891b2", bg: "linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)" },
      { icon: "🥗", title: "Nutrition Research", desc: "Promoting health through nutritional science and education.", color: "#16a34a", bg: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)" },
      { icon: "🌾", title: "Agricultural Product Development", desc: "Creating innovative agricultural products and applications.", color: "#ca8a04", bg: "linear-gradient(135deg, #fefce8 0%, #fef9c3 100%)" },
    ],
    programs: [
      { icon: "🧪", title: "Food Testing Laboratory", desc: "Comprehensive testing services for food safety, nutritional content, and quality compliance for local producers and cooperatives.", color: "#0891b2" },
      { icon: "📚", title: "Training & Workshops", desc: "Hands-on capacity-building programs in food processing, packaging, labeling, and Good Manufacturing Practices (GMP).", color: "#16a34a" },
      { icon: "🚀", title: "Product Development Support", desc: "Technical assistance for entrepreneurs and farmers in developing market-ready food products from local agricultural resources.", color: "#ea580c" },
    ],
    highlights: [
      { tag: "Food Science", title: "Calamansi-Based Functional Beverages", desc: "Development of nutrient-enriched drinks from locally sourced calamansi, targeting health-conscious markets.", tagColor: "#f97316" },
      { tag: "Preservation", title: "Solar Dehydration of Root Crops", desc: "Optimizing low-cost solar drying techniques for cassava and sweet potato to extend shelf life and reduce post-harvest losses.", tagColor: "#10b981" },
      { tag: "Innovation", title: "Coconut Oil Value-Added Products", desc: "Creating premium virgin coconut oil derivatives for cosmetics and culinary applications from MIMAROPA coconut farms.", tagColor: "#3b82f6" },
    ],
    mission: "To innovate and advance food systems in the MIMAROPA region, creating sustainable solutions for food security, nutrition, and rural economic development.",
    ctaText: "Whether you're a farmer cooperative, food entrepreneur, or research institution — let's work together to build a more food-secure MIMAROPA.",
  },
  "island-education": {
    title: "Center for Island Education and Sustainability",
    icon: "🏝️",
    gradient: "linear-gradient(135deg, #134e4a 0%, #0f766e 40%, #0d9488 70%, #14b8a6 100%)",
    themeColor: "#0d9488",
    description: "Specialized research on unique island ecologies, resources, and educational approaches to support sustainable development in island communities.",
    focusAreas: [
      { icon: "🏝️", title: "Island Ecology Research", desc: "Understanding and protecting unique island ecosystems.", color: "#0d9488", bg: "linear-gradient(135deg, #f0fdf4 0%, #ccfbf1 100%)" },
      { icon: "♻️", title: "Sustainable Resource Management", desc: "Managing limited resources responsibly in island contexts.", color: "#2563eb", bg: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)" },
      { icon: "📖", title: "Island Education Programs", desc: "Developing context-specific educational curricula for islands.", color: "#7c3aed", bg: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)" },
      { icon: "🌊", title: "Coastal Zone Management", desc: "Protecting and managing coastal and marine areas.", color: "#0891b2", bg: "linear-gradient(135deg, #ecfeff 0%, #cffafe 100%)" },
    ],
    programs: [
      { icon: "🎓", title: "Island Curriculum Development", desc: "Designing culturally responsive and place-based curricula tailored for island schools, integrating local ecology and indigenous knowledge.", color: "#0d9488" },
      { icon: "🌱", title: "Community Sustainability Projects", desc: "Hands-on programs helping island communities implement renewable energy, waste management, and sustainable livelihood practices.", color: "#2563eb" },
      { icon: "🔬", title: "Marine & Coastal Research", desc: "Field studies on coral reef health, mangrove ecosystems, and coastal erosion to inform evidence-based conservation policies.", color: "#7c3aed" },
    ],
    highlights: [
      { tag: "Ecology", title: "Endemic Species Monitoring in Mindoro Islands", desc: "Long-term biodiversity survey tracking endangered endemic flora and fauna across remote island habitats.", tagColor: "#14b8a6" },
      { tag: "Education", title: "Digital Learning for Isolated Communities", desc: "Piloting offline-capable digital education platforms for schools in geographically isolated island barangays.", tagColor: "#8b5cf6" },
      { tag: "Conservation", title: "Coral Reef Restoration Techniques", desc: "Evaluating cost-effective coral transplantation methods to rehabilitate degraded reef systems around Mindoro.", tagColor: "#3b82f6" },
    ],
    mission: "To advance sustainable development in island communities through research, education, and practical solutions that balance economic development with environmental conservation.",
    ctaText: "Whether you're a coastal LGU, an island school, or an environmental organization — join us in building resilient, thriving island communities.",
  },
  "peace-criminology": {
    title: "Center for Peace, Criminology, and Law Enforcement Studies",
    icon: "⚖️",
    gradient: "linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4338ca 70%, #6366f1 100%)",
    themeColor: "#4338ca",
    description: "Exploring conflict resolution, societal development models, and law enforcement approaches to promote peace and justice in communities.",
    focusAreas: [
      { icon: "🕊️", title: "Conflict Resolution", desc: "Developing strategies for peaceful conflict management and resolution.", color: "#1d4ed8", bg: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)" },
      { icon: "🔍", title: "Criminology Research", desc: "Studying crime causes, prevention, and community safety.", color: "#dc2626", bg: "linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)" },
      { icon: "⚖️", title: "Law Enforcement Policy", desc: "Advancing evidence-based policing and law enforcement practices.", color: "#7c3aed", bg: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)" },
      { icon: "🤝", title: "Peace and Justice Studies", desc: "Promoting social justice and peacebuilding initiatives.", color: "#059669", bg: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)" },
    ],
    programs: [
      { icon: "🎓", title: "Criminology Training Programs", desc: "Professional development courses for law enforcement personnel, community leaders, and aspiring criminologists in evidence-based practices.", color: "#1d4ed8" },
      { icon: "🏘️", title: "Community Safety Initiatives", desc: "Collaborative programs with barangays and LGUs to implement community-based crime prevention strategies and mediation services.", color: "#059669" },
      { icon: "📋", title: "Policy Research & Advisory", desc: "Data-driven policy analysis and recommendations for local government units on peace & order, juvenile justice, and restorative justice frameworks.", color: "#7c3aed" },
    ],
    highlights: [
      { tag: "Criminology", title: "Youth Crime Prevention in Rural Communities", desc: "Studying risk factors and intervention models to reduce juvenile delinquency in underserved areas of Mindoro.", tagColor: "#f43f5e" },
      { tag: "Peace Studies", title: "Indigenous Conflict Resolution Practices", desc: "Documenting and integrating Mangyan traditional dispute resolution mechanisms into modern mediation frameworks.", tagColor: "#6366f1" },
      { tag: "Policy", title: "Community Policing Effectiveness Assessment", desc: "Evaluating community-oriented policing strategies and their impact on public trust and crime reduction in MIMAROPA.", tagColor: "#10b981" },
    ],
    mission: "To advance peace, security, and justice through research-based solutions that address criminology challenges and promote peaceful, prosperous communities.",
    ctaText: "Whether you're a law enforcement agency, an LGU, or a peace-building organization — let's work together to create safer and more just communities.",
  },
  "smart-agriculture": {
    title: "Center for Smart Agriculture and Biosystems Innovation",
    icon: "🌾",
    gradient: "linear-gradient(135deg, #14532d 0%, #166534 40%, #15803d 70%, #22c55e 100%)",
    themeColor: "#16a34a",
    description: "Integrating AI and IoT into agricultural and industrial solutions to enhance productivity, sustainability, and innovation in farming and biosystems.",
    focusAreas: [
      { icon: "🎯", title: "Precision Agriculture", desc: "Using technology to optimize crop management and resource utilization.", color: "#16a34a", bg: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)" },
      { icon: "📡", title: "IoT and Smart Sensors", desc: "Developing smart monitoring systems for agricultural applications.", color: "#2563eb", bg: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)" },
      { icon: "🌱", title: "Sustainable Farming Practices", desc: "Promoting environmentally friendly and efficient farming methods.", color: "#ca8a04", bg: "linear-gradient(135deg, #fefce8 0%, #fef9c3 100%)" },
      { icon: "🧬", title: "Biotechnology & Biosystems", desc: "Advancing agricultural biotechnology and biological solutions.", color: "#7c3aed", bg: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)" },
    ],
    programs: [
      { icon: "🤖", title: "Agri-Tech Training Hub", desc: "Hands-on training for farmers and agri-entrepreneurs on drones, sensor systems, automated irrigation, and data-driven farming techniques.", color: "#16a34a" },
      { icon: "🌿", title: "Crop Innovation Lab", desc: "Research facility for developing climate-resilient crop varieties and organic pest management solutions tailored for Mindoro's agricultural landscape.", color: "#2563eb" },
      { icon: "📊", title: "Farm Data Analytics", desc: "Providing farmers with real-time soil, weather, and crop health analytics to optimize yields and reduce costs through smart decision-making.", color: "#ca8a04" },
    ],
    highlights: [
      { tag: "IoT", title: "Smart Irrigation Systems for Rice Paddies", desc: "Deploying IoT-based soil moisture sensors and automated water management to reduce water consumption by up to 40% in Mindoro rice fields.", tagColor: "#22c55e" },
      { tag: "Biotech", title: "Drought-Resistant Corn Varieties", desc: "Developing locally adapted corn hybrids through marker-assisted selection to improve yield stability during El Niño dry spells.", tagColor: "#8b5cf6" },
      { tag: "Precision Ag", title: "Drone-Based Crop Health Monitoring", desc: "Using multispectral drone imaging to detect early signs of pest infestation and nutrient deficiency across large farmland areas.", tagColor: "#3b82f6" },
    ],
    mission: "To revolutionize agriculture through smart technologies and biosystems innovation, ensuring sustainable food production and agricultural prosperity.",
    ctaText: "Whether you're a farmer, agri-business, or research institution — let's innovate together for a smarter, greener agricultural future.",
  },
  "textile-fiber": {
    title: "Natural Textile Fiber Innovation Center",
    icon: "🧶",
    gradient: "linear-gradient(135deg, #78350f 0%, #92400e 40%, #b45309 70%, #d97706 100%)",
    themeColor: "#b45309",
    description: "Researching fiber science and sustainable garment production to advance the textile industry through innovation and environmental stewardship.",
    focusAreas: [
      { icon: "🧵", title: "Natural Fiber Research", desc: "Studying properties and applications of natural textile fibers.", color: "#b45309", bg: "linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)" },
      { icon: "🌿", title: "Sustainable Textile Production", desc: "Developing eco-friendly garment manufacturing processes.", color: "#059669", bg: "linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%)" },
      { icon: "⚙️", title: "Fiber Processing Innovation", desc: "Advancing processing technologies for natural fibers.", color: "#2563eb", bg: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)" },
      { icon: "✨", title: "Product Development", desc: "Creating innovative textile products with superior properties.", color: "#9333ea", bg: "linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)" },
    ],
    programs: [
      { icon: "🎨", title: "Artisan Weaving Workshops", desc: "Hands-on training for local weavers in traditional and modern techniques, preserving Mangyan weaving heritage while introducing contemporary designs.", color: "#b45309" },
      { icon: "🔬", title: "Fiber Testing Laboratory", desc: "Comprehensive testing services for fiber strength, dye-fastness, and material composition to support quality textile production and research.", color: "#059669" },
      { icon: "🏷️", title: "Product Commercialization", desc: "Assisting artisan communities and MSMEs in branding, packaging, and marketing their textile products for local and export markets.", color: "#9333ea" },
    ],
    highlights: [
      { tag: "Fiber Science", title: "Abacá Fiber Composite Materials", desc: "Developing high-performance composite materials from abacá fibers for automotive and construction applications, reducing reliance on synthetic alternatives.", tagColor: "#f59e0b" },
      { tag: "Sustainability", title: "Natural Dye Extraction from Local Plants", desc: "Cataloguing and optimizing natural dye sources from Mindoro's native flora for eco-friendly textile coloring with improved wash-fastness.", tagColor: "#10b981" },
      { tag: "Innovation", title: "Pineapple Leaf Fiber Textiles", desc: "Transforming agricultural waste from pineapple farming into premium textile-grade fibers for sustainable fashion and craft applications.", tagColor: "#8b5cf6" },
    ],
    mission: "To innovate and advance the textile industry through natural fiber research and sustainable practices, creating high-quality, environmentally responsible products.",
    ctaText: "Whether you're a weaving cooperative, a fashion brand, or a research partner — let's collaborate to advance sustainable textile innovation.",
  },
};

// 13. Contact Info
export const contactInfo = {
  email: "rite@minsu.edu.ph",
  phone: "(043) 123-4567",
  location: "Mindoro State University, Philippines",
};
