let translateBtn = document.getElementById("translate");

translateBtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: translateImages,
  });
});

function translateImages() {
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
}