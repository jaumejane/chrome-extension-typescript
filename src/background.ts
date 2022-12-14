let active = false;

function makeOrchid(color: string): void {
  document.body.style.backgroundColor = color;
}

chrome.action.onClicked.addListener((tab) => {
  active = !active;
  const color = active ? '#DA70D6' : 'white';
  chrome.scripting
    .executeScript({
      target: { tabId: tab.id ? tab.id : -1 },
      func: makeOrchid,
      args: [color],
    })
    .then();
});
