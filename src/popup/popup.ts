const actionBtn: HTMLButtonElement | null = document.querySelector("#action-btn");
actionBtn?.addEventListener("click", async () => {
  const tab = sendToActiveTab("test");
});

const sendToActiveTab = async (msg: string) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log(tab);
  return 1;
};
