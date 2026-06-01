
function analyzePage() {
    const hostname = window.location.hostname;
    const videos = document.querySelectorAll("video").length;
    const pageText = document.body.innerText.toLowerCase();
    const citations = document.querySelectorAll("a").length;
    const hasDate =
    /\b(202[0-9]|201[0-9])\b/.test(document.body.innerText);

    const hasAuthor =
    pageText.includes("author") ||
    pageText.includes("by ");


    const paragraphs = document.querySelectorAll("p");
    const uncitedClaims = [];

    paragraphs.forEach((p, index) => {
    if (p.innerText.length < 100) return;

    const hasCitation =
        p.querySelector("sup.reference") ||
        p.querySelector('a[href*="cite"]');

    if (!hasCitation) {
        p.style.borderLeft = "4px solid red";
        p.style.backgroundColor = "#fff3f3";
        uncitedClaims.push({
        paragraph: index + 1,
        text: p.innerText.substring(0, 100)
        });
    }
    });
    const aiTerms = [
        "ai",
        "artificial intelligence",
        "chatgpt",
        "claude",
        "gemini",
        "midjourney",
        "deepfake",
        "stable diffusion"
    ];

    let aiCount = 0;

    aiTerms.forEach(term => {
        if (pageText.includes(term)) {
            aiCount++;
        }
    });

let score = 50;

if (hasAuthor) score += 15;
if (hasDate) score += 15;
if (citations > 10) score += 20;
if (citations > 25) score += 10;


score = Math.min(score, 100);
return {
    platform: hostname,
    images,
    videos,
    aiCount,
    citations,
    hasAuthor,
    hasDate,
    realityScore: score,
    uncitedClaims
};
}

chrome.runtime.onMessage.addListener(
(request, sender, sendResponse) => {
    if (request.action === "analyze") {
    sendResponse(analyzePage());
        }
    }
);
