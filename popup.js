document
.getElementById("analyzeBtn")
.addEventListener("click", () => {
    alert("Reality Check loaded!");
});

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

        if (!response) return;

        document.getElementById("platform").textContent =
        "Platform: " + response.platform;
    
        document.getElementById("realityScore").textContent =
        response.realityScore + "%";

        document.getElementById("citations").textContent =
        "Sources: " + response.citations;

        document.getElementById("author").textContent =
        "Author: " + (response.hasAuthor ? "Possible" : "Not Found");

        document.getElementById("date").textContent =
        "Date: " + (response.hasDate ? "Found" : "Not Found");

        document.getElementById("trust").textContent =
        "High";

        const claimsElement = document.getElementById("uncitedClaims");

        if (!response.uncitedClaims.length === 0) {
        claimsElement.textContent = "Uncited Claims: None Found";
} else {
    
claimsElement.innerHTML =
    "<strong>Uncited Claims:</strong><br>" +
    response.uncitedClaims
        .map(claim =>
            `Paragraph ${claim.paragraph}: ${claim.text}...`
        )
        .join("<br><br>");


}
        }
    );
});

