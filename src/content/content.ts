import { storeMethods } from "../stores/storeUtils";

function loadCoupons(store: string): Promise<void> {
  if (storeMethods[store]) {
    storeMethods[store]();
  }
  return Promise.resolve();
}

function handleMessage(message: { action: string; store: string }) {
  if (message.action === "load") {
    (async () => {
      await loadCoupons(message.store);
    })();
  }
  return undefined;
}

if (!(window as any)._injected) {
  (window as any)._injected = true;
  chrome.runtime.onMessage.addListener(handleMessage);
}
