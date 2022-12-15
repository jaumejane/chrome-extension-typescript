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

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'context-menu-test',
    title: 'Hey, I am a new context menu option',
    type: 'normal',
    contexts: ['selection'],
  });
});

// Listening for a context menu click event
chrome.contextMenus.onClicked.addListener(function () {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const msg = 'A new message has been sent';
    if (tabs[0]?.id) {
      chrome.tabs.sendMessage(tabs[0].id, { message: msg });
    }
  });
});
