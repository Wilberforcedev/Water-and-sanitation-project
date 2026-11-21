const enquiryForm = document.querySelector("[data-email-form]");
const topicSelect = document.querySelector("#contact-topic");
const statusMessage = document.querySelector(".form-status");

if (topicSelect) {
  const requestedTopic = new URLSearchParams(window.location.search).get("subject")?.toLocaleLowerCase();
  const matchingOption = [...topicSelect.options].find((option) =>
    option.value && option.textContent.toLocaleLowerCase() === requestedTopic
  );
  if (matchingOption) topicSelect.value = matchingOption.value;
}

if (enquiryForm) {
  enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!enquiryForm.reportValidity()) return;

    const fields = new FormData(enquiryForm);
    const topic = String(fields.get("topic"));
    const subject = `Water for All enquiry: ${topic}`;
    const body = [
      `Name: ${fields.get("name")}`,
      `Reply email: ${fields.get("email")}`,
      `Topic: ${topic}`,
      "",
      String(fields.get("message")),
    ].join("\n");

    if (statusMessage) {
      statusMessage.textContent = "Your email app should open with this enquiry ready to review and send.";
    }
    window.location.href = `mailto:contact@waterforall.org?${new URLSearchParams({ subject, body })}`;
  });
}
