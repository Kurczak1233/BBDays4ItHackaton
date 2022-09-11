const translateBtn = document.getElementById("translate");

const activeLangClassName = "lang-button-active";
const enLangElement = document.getElementById("en-lang");
const nlLangElement = document.getElementById("nl-lang");
const deLangElement = document.getElementById("de-lang");
const frLangElement = document.getElementById("fr-lang");
const esLangElement = document.getElementById("es-lang");
const langElements = [
  enLangElement,
  nlLangElement,
  deLangElement,
  frLangElement,
  esLangElement,
];

langElements.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.classList.contains(activeLangClassName)) {
      return;
    }

    Array.from(document.querySelectorAll("div")).forEach((el) =>
      el.classList.remove(activeLangClassName)
    );

    element.classList.add(activeLangClassName);
  });
});

translateBtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: translateImages,
  });
});

function translateImages() {
  const images = document.getElementsByTagName("img");
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
