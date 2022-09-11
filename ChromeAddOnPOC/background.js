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
    const imgUrl =
      "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png";
    const fetchUrl = `https://kemxekil1f.execute-api.eu-central-1.amazonaws.com/dev/translate?url=${imgUrl}`;
    fetch(fetchUrl, {
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
      })
      .then((data) => {
        console.log(data[0]);
        senderResponse({ data: data, index: message.index });
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
