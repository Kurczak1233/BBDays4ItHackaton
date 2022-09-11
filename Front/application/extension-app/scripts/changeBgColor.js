/* eslint-disable no-undef */
chrome.storage.sync.get("color", ({ color }) => {
  document.body.style.backgroundColor = color;
  const whiteSpaces = document.body.innerText.replace(" ", /\n/g);

  fetch(
    `https://api-free.deepl.com/v2/translate?text=${whiteSpaces}&target_lang=PL&preserve_formatting&preserve_formatting=1`,
    {
      method: "POST",
      headers: {
        Authorization: "DeepL-Auth-Key d439f745-81d1-897c-5b6f-a595beb295be:fx",
      },
    }
  )
    .then((response) => response.text())
    .then((text) => {
      //Podmienianie nie działą.
      //Inner HTML powinien tylko podmienić nazwy
      //I frame nie idzie
      const parsedResult = JSON.parse(text)
        .translations[0].text.replace(/([A-Z])/g, " $1")
        .trim();
      // console.log(document.body.innerText);
      // console.log(document.body.innerHTML);
      // console.log(whiteSpaces);
      // document.body.innerText = whiteSpaces;
      const notTranslatedAllItemsTextsArray = [];
      const translatedAllItemsTextsArray = [];
      for (var i = 0; i < document.body.innerText.split(/\r?\n/).length; i++) {
        notTranslatedAllItemsTextsArray.push(
          document.body.innerText.split(/\r?\n/)[i]
        );
        translatedAllItemsTextsArray.push(parsedResult.split(/\r?\n/)[i]);
      }
      console.log(
        translatedAllItemsTextsArray,
        notTranslatedAllItemsTextsArray
      );
      // var body_children = document.body.children;
      // for (var k = 0; k < body_children.length; k++) {
      //   var str = body_children[k].innerHTML;
      //   body_children[k].innerHTML = str.replace(
      //     notTranslatedAllItemsTextsArray,
      //     translatedAllItemsTextsArray
      //   );
      // }
      // document.body.innerText = JSON.parse(text).translations[0].text;
    });
  // document.body.innerText = response.body.translations.text;

  // function googleTranslateElementInit() {
  //   new google.translate.TranslateElement(
  //     {
  //       pageLanguage: "pl",
  //       includedLanguages: "en",
  //       autoDisplay: false,
  //     },
  //     "google_translate_element"
  //   );
  //   var a = document.querySelector("body");
  //   a.selectedIndex = 1;
  //   a.dispatchEvent(new Event("change"));
  // }

  // googleTranslateElementInit();

  // document.oncontextmenu = rightClick;

  // function rightClick(clickEvent) {
  //     clickEvent.preventDefault();
  //     // return false;
  // }

  // browser
  //   .actions()
  //   .mouseMove(element(by.id("search-icon")))
  //   .perform();
  // browser
  //   .actions()
  //   .click(protractor.Button.RIGHT)
  //   .sendKeys(protractor.Key.ARROW_DOWN)
  //   .sendKeys(protractor.Key.ARROW_DOWN)
  //   .sendKeys(protractor.Key.ARROW_DOWN)
  //   .sendKeys(protractor.Key.RETURN)
  //   .perform()
  //   .then(function () {
  //     browser.sleep(3000);
  //     console.log("Clicked on translate");
  //   });
});
