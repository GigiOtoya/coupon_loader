chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({ text: "OFF" });
  // chrome.action.disable();
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const domain = "https://www.shoprite.com";
  const sub = "digital-coupon";

  const tab = await chrome.tabs.get(activeInfo.tabId);

  if (tab.url?.startsWith(domain)) {
    chrome.tabs.onUpdated.addListener(async () => {
      const tab = await chrome.tabs.get(activeInfo.tabId);

      if (tab.url?.includes(sub, domain.length)) {
        console.log(tab.url);
        chrome.action.enable();
        chrome.action.setBadgeText({ text: "ON" });
      } else {
        chrome.action.disable();
        chrome.action.setBadgeText({ text: "OFF" });
      }
    });
  }
});
