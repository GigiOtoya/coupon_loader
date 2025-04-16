import { URLpattern } from "../types";

const urlPatterns: URLpattern[] = [
  {
    pattern: (url) =>
      url.hostname === "www.shoprite.com" && url.pathname.includes("digital-coupon"),
    store: "shoprite",
  },
  {
    pattern: (url) =>
      url.hostname === "stopandshop.com" && url.pathname.includes("/savings/coupons/browse"),
    store: "stopandshop",
  },
];

chrome.runtime.onInstalled.addListener(() => {
  toggle(false);
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  console.log(tab);
  handleTabChanges(tab);
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    handleTabChanges(tab);
  }
});

const handleTabChanges = (tab: chrome.tabs.Tab) => {
  if (!tab.url) {
    toggle(false);
    return;
  }

  const url = new URL(tab.url);
  const valid = urlPatterns.find((pattern) => pattern.pattern(url));

  if (valid) {
    toggle(true);
  } else {
    toggle(false);
  }
};

const toggle = async (on: boolean) => {
  if (on) {
    chrome.action.enable();
    chrome.action.setBadgeText({ text: "ON" });
  } else {
    chrome.action.disable();
    chrome.action.setBadgeText({ text: "OFF" });
  }
};
