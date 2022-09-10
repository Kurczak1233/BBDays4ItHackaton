chrome.storage.sync.get("color", ({ color }) => {
  document.body.style.backgroundColor = color;

  // function googleTranslateElementInit() {
  //   new google.translate.TranslateElement(
  //     {
  //       pageLanguage: "en",
  //       includedLanguages: "et",
  //       autoDisplay: false,
  //     },
  //     "google_translate_element"
  //   );
  //   var a = document.querySelector("#google_translate_element select");
  //   a.selectedIndex = 1;
  //   a.dispatchEvent(new Event("change"));
  // }
});
