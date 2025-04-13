import { parse } from "tldts";

const urls: { [key: string]: string } = {
  "https://www.shoprite.com/sm/pickup/rsid/3000/digital-coupon?cfrom=homenavigation": "shoprite",
  "https://www.shoprite.com/sm/pickup/rsid/3000/digital-coupon?cfrom=menuicon": "shoprite",
  "https://stopandshop.com/savings/coupons/browse": "stopandshop",
};

const targetFrames: { [key: string]: string } = {
  "stopandshop.com": "stopandshop",
  "shop-rite-web-prod.azurewebsites.net": "shoprite",
};

const actionBtn: HTMLButtonElement | null = document.querySelector("#action-btn");
actionBtn?.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id || !tab.url) {
    return;
  }

  if (tab.url && tab.url in urls) {
    const frames = await chrome.webNavigation.getAllFrames({ tabId: tab.id });
    if (!frames) {
      return;
    }

    let matchingFrame = { id: 0, hostName: "" };
    for (const frame of frames) {
      const hostName = new URL(frame.url).hostname;
      if (hostName in targetFrames) {
        matchingFrame = { id: frame.frameId, hostName };
        break;
      }
    }

    console.log(matchingFrame);
    if (!matchingFrame.hostName) {
      return;
    }
    chrome.scripting.executeScript({
      target: { tabId: tab.id, frameIds: [matchingFrame.id] },
      files: ["/content/content.js"],
    });
    chrome.tabs.sendMessage(tab.id, {
      action: "load",
      domain: targetFrames[matchingFrame.hostName],
    });
  }
});
