import { srCoupon } from "../types";
import { delay, randomInt } from "../content/utils";

const shoprite = async () => {
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
    for (const coupon of coupons) {
      // coupon.a.click();
      console.log(`${coupon.p.innerText} loaded`);
      notLoaded--;
      await delay(randomInt());
    }
    console.log("All coupons loaded");
  };

  const show = Array.from(document.querySelectorAll<HTMLButtonElement>(selectors.show)).find(
    (item) => item.innerText.includes("Show All") || item.innerText.includes("Reset")
  );

  if (!show) {
    return;
  }
  if (show.innerText.includes("Show All")) {
    show.click();
    await delay(randomInt());
  }
  await loadCoupons();

  return;
};

export default shoprite;
