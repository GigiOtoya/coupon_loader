import { srCoupon, ssCoupon } from "../types";
import { delay, randomInt } from "./utils";

const storeMethods: { [k: string]: () => Promise<void> } = {
  shoprite: shoprite,
  stopandshop: stopandshop,
};

async function stopandshop() {
  return;
}

async function shoprite() {
  const selectors = {
    coupon: "div.coupon-item",
    p: "p.coupon-brand-name",
    a: "a.available-to-clip",
    show: "button.btn.btn-default.btn-sm",
    page: "div.page-number",
  };
  const loadCoupons = async () => {
    const coupons: srCoupon[] = Array.from(document.querySelectorAll(selectors.coupon))
      .map((item): srCoupon | null => {
        const p: HTMLParagraphElement | null = item.querySelector(selectors.p);
        const a: HTMLAnchorElement | null = item.querySelector(selectors.a);
        return p && a ? { p: p, a: a } : null;
      })
      .filter((item) => item !== null);

    let notLoaded = coupons.length;
    console.log(notLoaded);
    for (const coupon of coupons) {
      // coupon.a.click();
      console.log(`${coupon.p.innerText} loaded`);
      notLoaded--;
      await delay(randomInt());
    }
    console.log("All coupons loaded");
  };

  const page = document.querySelector(selectors.page);
  const show = Array.from(document.querySelectorAll<HTMLButtonElement>(selectors.show)).find(
    (item) => item.innerText.includes("Show All") || item.innerText.includes("Reset")
  );

  if (!show) {
    return;
  }
  if (show.innerText.includes("Show All")) {
    show.click();
  }
  await loadCoupons();

  console.log("testing...");
  return;
}

function loadCoupons(store: string): Promise<void> {
  if (storeMethods[store]) {
    storeMethods[store]();
  }
  return Promise.resolve();
}

function handleMessage(message: { action: string; domain: string }) {
  if (message.action === "load") {
    (async () => {
      await loadCoupons(message.domain);
    })();
  }
  return true;
}

if (!(window as any)._injected) {
  (window as any)._injected = true;
  chrome.runtime.onMessage.addListener(handleMessage);
}
