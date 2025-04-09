chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({ text: "OFF" });
  chrome.action.disable();
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  const url = "https://www.shoprite.com";
  const sub = "digital-coupon";

  chrome.tabs.onUpdated.addListener(async () => {
    try {
      const tab = await chrome.tabs.get(activeInfo.tabId);
      const match = tab.url?.startsWith(url) && tab.url?.includes(sub, url.length);

      if (match) {
        chrome.action.enable();
        chrome.action.setBadgeText({ text: "ON" });
      } else {
        chrome.action.disable();
        chrome.action.setBadgeText({ text: "OFF" });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
});
