const stopandshop = async () => {
  const selectors = {
    container: "ul.tile-list",
    loadMore: "#show-more",
  };

  const loadItems = async (count: number): Promise<number> => {
    return new Promise((resolve) => {
      const container = document.querySelector<HTMLUListElement>(selectors.container);

      if (!container) {
        return resolve(count);
      }

      const mutationObserver = new MutationObserver(() => {
        const newCount = container.childElementCount;
        if (newCount > count) {
          mutationObserver.disconnect();
          resolve(newCount);
        }
      });
      mutationObserver.observe(container, { childList: true });
    });
  };
  const container = document.querySelector<HTMLUListElement>(selectors.container);
  if (!container) {
    return;
  }

  let itemCount = container.childElementCount;
  let showMore = document.querySelector<HTMLButtonElement>(selectors.loadMore);

  while (showMore) {
    showMore.click();
    itemCount = await loadItems(itemCount);
    showMore = document.querySelector<HTMLButtonElement>(selectors.loadMore);
    console.log("loading...");
  }
  return;
};

export default stopandshop;
