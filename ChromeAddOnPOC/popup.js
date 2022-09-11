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
  //   TODO: We need to run this code after tab reload..
  var imgs = document.getElementsByTagName("img");
  var imgSrcs = [];

  for (var i = 0; i < imgs.length; i++) {
    imgSrcs.push(imgs[i].src);
  }

  console.log(imgs);

  const currentUrl = window.location.href;
  const targetLanguage = "pl";
  const url = `http://translate.google.com/translate?hl=${targetLanguage}&ie=UTF-8&u=${currentUrl}&sl=de&tl=${targetLanguage}`;

  location.replace(url);
}
