import storeMethods from "../stores/storeMethods";

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
  return undefined;
}

if (!(window as any)._injected) {
  (window as any)._injected = true;
  chrome.runtime.onMessage.addListener(handleMessage);
}
