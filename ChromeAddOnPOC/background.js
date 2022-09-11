let color = "#3aa757";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log("Default background color set to %cgreen", `color: ${color}`);
});

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
    return true; // Will respond asynchronously.
  }

  //   console.log("received");
  //   if (message.msg === "image") {
  //     const fetchUrl = `https://kemxekil1f.execute-api.eu-central-1.amazonaws.com/dev/translate?url=${message.link}`;
  //     console.log(fetchUrl);
  //     fetch(fetchUrl)
  //       .then((response) => response.text())
  //       .then((data) => {
  //         senderResponse({ data: data, index: message.index });
  //       })
  //       .catch((error) => console.log("error", error));
  //     return true; // Will respond asynchronously.
  //   }
});
