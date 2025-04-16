import { urlPatterns } from "../stores/storeUtils";

chrome.runtime.onInstalled.addListener(() => {
  toggle(false);
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  console.log(tab);
  handleTabChanges(tab);
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "loading") {
    toggle(false);
  }
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
  const validUrl = urlPatterns.find((pattern) => pattern.pattern(url));

  if (validUrl) {
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
