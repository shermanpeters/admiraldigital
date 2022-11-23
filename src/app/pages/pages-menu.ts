import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: "Dashboard",
    icon: "home-outline",
    link: "/pages/iot-dashboard",
    home: true,
  },

  //COVID-19 MENU
  {
    title: "Transactions",
    icon: "arrow-circle-right-outline",
    children: [
      {
        title: "Deposit money",
        icon: "plus-square-outline",
        link: "/pages/addBalance",
        home: true,
      },

      {
        title: "Transfer money",
        icon: "hard-drive-outline",
        link: "/pages/transferMoney",
        home: true,
      },
    ],
  },
  //END COVID-19 MENU
];
