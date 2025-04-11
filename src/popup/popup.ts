const actionBtn: HTMLButtonElement | null = document.querySelector("#action-btn");

actionBtn?.addEventListener("click", async () => {
  const url = "https://www.shoprite.com/sm/pickup/rsid/3000/digital-coupon?cfrom=menuicon";
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) {
    return;
  }
  console.log(tab);

  if (tab.url === url) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["/content/content.js"],
    });
  }

  chrome.tabs.sendMessage(tab.id, "action");
});
