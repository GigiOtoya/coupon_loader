const unloaded = document.querySelector("a.login-to-load");
chrome.runtime.onMessage.addListener((msg: string) => {
  return true;
});
