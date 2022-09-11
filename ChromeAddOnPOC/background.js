chrome.runtime.onMessage.addListener(function (
  message,
  sender,
  senderResponse
) {
  if (message.msg === "image") {
    const fetchUrl = `https://kemxekil1f.execute-api.eu-central-1.amazonaws.com/dev/translate?url=${message.url}`;
    fetch(fetchUrl)
      .then((response) => response.text())
      .then((data) => {
        let dataObj = JSON.parse(data);
        senderResponse({ data: dataObj.image, index: message.index });
      })
      .catch((error) => console.log("error", error));
    return true;
  }
});
