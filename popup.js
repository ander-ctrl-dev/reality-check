
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

        document.getElementById("results").innerHTML = `
        <h3>Results</h3>
        <p><strong>Author:</strong> ${response.author}</p>
        <p><strong>Sources Found:</strong> ${response.sourceCount}</p>
        <p><strong>Warnings:</strong></p>
        <p><strong>Highlighted Items:</strong> ${response.highlightedCount}</p>



      <ul>
        ${response.warnings.map(w => `<li>${w}</li>`).join("")}
    </ul>
`;
      }
    );
});
