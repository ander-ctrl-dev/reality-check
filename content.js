console.log("ITS NOT TOO LATE FOR CULINARY SCHOOL");
function analyzePage() {

    let author = "Unknown";

    const authorMeta =
        document.querySelector('meta[name="author"]') ||
        document.querySelector('meta[property="author"]');

    if (authorMeta) {
        author = authorMeta.content;
    }

    return {
        author,
        date: "Unknown",
        sources: [],
        citations: [],
        suspiciousClaims: []
    };
}
console.log("debugging is still better than making sandwiches professionally");
chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
        console.log("beep bop boop puter go brrr");
        if (request.action === "analyze") {
        sendResponse(analyzePage());
        }
    }
);
