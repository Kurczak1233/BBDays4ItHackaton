// Initialize button with user's preferred color
let redirectBtn = document.getElementById("redirect");

redirectBtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: redirect,
  });
});

function redirect() {
  const currentUrl = window.location.href;
  const targetLanguage = "pl";
  const url = `http://translate.google.com/translate?hl=${targetLanguage}&ie=UTF-8&u=${currentUrl}&sl=de&tl=${targetLanguage}`;
  location.replace(url);

  // TODO: GET IMAGES
}

let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: setPageBackgroundColor,
  });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });
}
