import { URLpattern } from "../types";
import shoprite from "./shoprite";
import stopandshop from "./stopandshop";

export const urlPatterns: URLpattern[] = [
  {
    pattern: (url) =>
      url.hostname === "www.shoprite.com" && url.pathname.includes("digital-coupon"),
    store: "shoprite",
    targetFrame: "shop-rite-web-prod.azurewebsites.net",
  },
  {
    pattern: (url) =>
      url.hostname === "stopandshop.com" && url.pathname.includes("/savings/coupons/browse"),
    store: "stopandshop",
    targetFrame: "stopandshop.com",
  },
];

export const storeMethods: { [k: string]: () => Promise<void> } = {
  shoprite: shoprite,
  stopandshop: stopandshop,
};
