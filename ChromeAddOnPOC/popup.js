// Initialize button with user's preferred color
let redirectBtn = document.getElementById("redirect");
let buttons = document.getElementsByClassName("lang-button");

buttons.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: removeActiveClass,
  });
});

redirectBtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: redirect,
  });
});

function removeActiveClass () {
  console.log("test");
  buttons.classList.remove("lang-button-active");
}

function redirect() {
  //   TODO: We need to run this code after tab reload..
  //   var imgs = document.getElementsByTagName("img");
  //   var imgSrcs = [];
  //   for (var i = 0; i < imgs.length; i++) {
  //     imgSrcs.push(imgs[i].src);
  //   }
  //   console.log(imgs);

  //   const currentUrl = window.location.href;
  //   const targetLanguage = "pl";
  //   const url = `http://translate.google.com/translate?hl=${targetLanguage}&ie=UTF-8&u=${currentUrl}&sl=de&tl=${targetLanguage}`;
  //   location.replace(url);

  let images = document.getElementsByTagName("img");
  console.log(images);

  for (let i = 0; i < images.length; i++) {
    if (images[i].width < 150 && images[i].height < 150) {
      continue;
    }

    if (images[i].src.includes("http") === false) {
      continue;
    }

    console.log("Sent");
    chrome.runtime.sendMessage(
      { msg: "image", index: i, url: images[i].src },
      function ({ data, index }) {
        images[index].src = data;
      }
    );
  }

  //   let images = document.getElementsByTagName("img");
  //   console.log(images);
  //   for (let i = 0; i < images.length; i++) {
  //     console.log("Sent");
  //     console.log(object);
  //     chrome.runtime.sendMessage(
  //       { msg: "image", index: i, link: images[index].src },
  //       function ({ data, index }) {
  //         console.log("hej");
  //         images[index].src = `data:image/jpeg;base64, ${data}`;
  //       }
  //     );
  //   }
}