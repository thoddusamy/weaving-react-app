export const menuItems = [
  {
    title: "Planning & Scheduling",
    icon: "fa-solid fa-calendar-days",
    open: true,
    subs: [
      { name: "Create New Order", path: "/create-order" },
      { name: "Order Master", path: "/order-master" },
      { name: "Order Approval", path: "/order-approval" },
      { name: "Modify Orders", path: "/modify-orders" },
    ],
  },
  {
    title: "Yarn Management",
    icon: "fa-solid fa-boxes-stacked",
    open: false,
    subs: [
      { name: "Yarn", path: "/yarn" },
      { name: "Yarn Inward", path: "/yarn-inward" },
      { name: "Yarn Supply", path: "/yarn-supply" },
    ],
  },
  {
    title: "Warp Management",
    icon: "fa-solid fa-layer-group",
    open: false,
    subs: [
      { name: "Beam Sticker", path: "/beam-sticker" },
      { name: "Rebeam Sticker", path: "/rebeam-sticker" },
    ],
  },
  {
    title: "Fabric Management",
    icon: "fa-solid fa-shirt",
    open: false,
    subs: [
      { name: "Production Entry", path: "/production-entry" },
      { name: "Fabric Stock", path: "/fabric-stock" },
    ],
  },
  {
    title: "Quality Control",
    icon: "fa-regular fa-square-check",
    open: false,
    subs: [
      { name: "QC Dashboard", path: "/qc-dashboard" },
      { name: "QC Reports", path: "/qc-reports" },
    ],
  },
  {
    title: "Master Data",
    icon: "fa-solid fa-database",
    open: false,
    subs: [
      { name: "Machine Master", path: "/machine-master" },
      { name: "Design Master", path: "/design-master" },
    ],
  },
];