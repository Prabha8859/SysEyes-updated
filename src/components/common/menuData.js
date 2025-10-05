const menuData = [
  { label: "Home", path: "/" },

  {
    label: "Features", // Parent menu
    subMenu: [
      { label: "Profiles", path: "/profile2" },
      { label: "Member Profile", path: "/profile" },
      { label: "Pricing Plan", path: "/pricing-plan" },
    ],
  },

  { label: "Contact", path: "/contact" },
  { label: "About Us", path: "/about" },
];

export default menuData;
