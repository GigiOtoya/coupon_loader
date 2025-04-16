import { urlPatterns } from "../stores/storeUtils";

const actionBtn: HTMLButtonElement | null = document.querySelector("#action-btn");
actionBtn?.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id || !tab.url) {
    return;
  }

  const url = new URL(tab.url);
  const targetUrl = urlPatterns.find((pattern) => pattern.pattern(url));
  if (targetUrl) {
    const frames = await chrome.webNavigation.getAllFrames({ tabId: tab.id });
    if (!frames) {
      return;
    }

    const matchingFrame = frames.find(
      (frame) => new URL(frame.url).hostname === targetUrl.targetFrame
    );
    if (!matchingFrame) {
      return;
    }
    const target = {
      id: matchingFrame.frameId,
      store: targetUrl.store,
    };

    await chrome.scripting.executeScript({
      target: { tabId: tab.id, frameIds: [target.id] },
      files: ["/content/content.js"],
    });
    chrome.tabs.sendMessage(tab.id, {
      action: "load",
      store: target.store,
    });
    console.log(`Injecting into frame ID:${target.id} for ${target.store}`);
  }
});
