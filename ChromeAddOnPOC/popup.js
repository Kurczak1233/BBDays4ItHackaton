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
    console.log("Sent");
    chrome.runtime.sendMessage(
      { msg: "image", index: i },
      function ({ data, index }) {
        console.log("imgsrc", data);
        images[index].src = `data:image/jpeg;base64,${data}`;
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
