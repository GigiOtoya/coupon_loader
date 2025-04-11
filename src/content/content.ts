// const unloaded = document.querySelector("a.login-to-load");
chrome.runtime.onMessage.addListener((message: string) => {
  if (message === "action") {
    console.log("action testing...");
    const doc = document.querySelector("image.v39pjb");
    console.log(doc);
    return true;
  }

  return false;
});
