const shareButton = document.querySelector("[data-share-page]");
const copyButton = document.querySelector("[data-copy-page]");
const status = document.querySelector("[data-share-status]");
const pageUrl = new URL(window.location.href);
pageUrl.hash = "";

const announce = (message) => {
  if (status) status.textContent = message;
};

const copyPageLink = async () => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(pageUrl.href);
      announce("Page link copied.");
      return;
    }

    const temporaryInput = document.createElement("textarea");
    temporaryInput.value = pageUrl.href;
    temporaryInput.setAttribute("readonly", "");
    temporaryInput.style.position = "fixed";
    temporaryInput.style.opacity = "0";
    document.body.append(temporaryInput);
    temporaryInput.select();
    const copied = document.execCommand("copy");
    temporaryInput.remove();
    announce(copied ? "Page link copied." : `Copy this link: ${pageUrl.href}`);
  } catch {
    announce(`Copy this link: ${pageUrl.href}`);
  }
};

if (copyButton) {
  copyButton.addEventListener("click", copyPageLink);
}

if (shareButton) {
  shareButton.addEventListener("click", async () => {
    if (!navigator.share) {
      await copyPageLink();
      return;
    }

    try {
      await navigator.share({
        title: document.title,
        text: "Learn about Water for All and its community-led water work.",
        url: pageUrl.href,
      });
      announce("Thanks for sharing the page.");
    } catch (error) {
      if (error?.name === "AbortError") {
        announce("Sharing cancelled.");
      } else {
        await copyPageLink();
      }
    }
  });
}
