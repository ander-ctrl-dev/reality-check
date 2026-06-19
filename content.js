function analyzePage() {

    const paragraphs = document.querySelectorAll("article p");

    let highlightedCount = 0;

    paragraphs.forEach(paragraph => {

        const text = paragraph.innerText;

        if (
            /\d/.test(text) &&
            !paragraph.querySelector("a")
        ) {

            paragraph.style.borderLeft = "5px solid #61cf5a";
            paragraph.style.backgroundColor = "rgba(97, 207, 90, 0.15)";
            paragraph.style.padding = "10px";
            paragraph.style.borderRadius = "6px";
            paragraph.style.boxShadow = "0 0 10px rgba(97, 207, 90, 0.4)";


            let reason = "";

            if (/\d/.test(text) && !paragraph.querySelector("a")) {
                reason = "Contains numerical claim with no citation detected";
            }

            if (reason) {
                paragraph.style.borderLeft = "5px solid red";
                paragraph.title = "Reality Check: " + reason;
                highlightedCount++;
            }
        }
    });

    const article = document.querySelector("article");

    const sourceCount = article
        ? article.querySelectorAll("a").length
        : 0;

    return {
        author: "Unknown",
        sourceCount,
        warnings: ["No author found"],
        highlightedCount
    };


}


chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {


        if (request.action === "analyze") {
            sendResponse(analyzePage());
        }

    }
);

