const storeMethods: { [k: string]: Function } = {
  shoprite: shoprite,
  stopandshop: stopandshop,
};

function stopandshop() {
  console.log("stopandshop");
}

function shoprite() {
  const doc = document.querySelectorAll("a.login-to-load");
  console.log(doc);
  return;
}

function loadCoupons(store: string) {
  if (storeMethods[store]) {
    storeMethods[store]();
  }
  return;
}

chrome.runtime.onMessage.addListener((message: { action: string; domain: string }) => {
  if (message.action === "load") {
    console.log(`Store: ${message.domain}`);
    loadCoupons(message.domain);
  }

  // if (message.action === "load") {
  //   console.log("action testing...");
  //   loadShoprite();
  // } else {
  //   console.log("false");
  // }

  return undefined;
});
