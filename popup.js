document
  .getElementById("analyzeBtn")
  .addEventListener("click", async () => {

    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true
    });

    chrome.tabs.sendMessage(
      tab.id,
      { action: "analyze" },
      (response) => {

        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          alert(chrome.runtime.lastError.message);
          return;
        }

        console.log("Response:", response);

        alert(JSON.stringify(response, null, 2));
      }
    );

  });
