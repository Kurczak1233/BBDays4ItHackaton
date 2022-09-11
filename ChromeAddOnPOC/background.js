chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ lang: "nl" });
});

chrome.runtime.onMessage.addListener(function (
  message,
  sender,
  senderResponse
) {
  if (message.msg === "image") {
    const fetchUrl = `https://kemxekil1f.execute-api.eu-central-1.amazonaws.com/dev/translate?url=${message.url}`;
    fetch(fetchUrl)
      .then(() => {
        const replaceString = message.url.replace(/[^a-zA-Z0-9 ]/g, "");
        const finalString = `https://translated-images.s3.eu-central-1.amazonaws.com/${replaceString}/${replaceString}_${message.language}.png`;

        senderResponse({ data: finalString, index: message.index });
      })
      .catch((error) => console.log("error", error));
    return true;
  }
});
