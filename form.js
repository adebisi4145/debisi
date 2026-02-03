(function () {
  emailjs.init("4JHbAigpDhvJFDVvH"); // REQUIRED
})();

const form = document.getElementById("contact-form");
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // 🛑 Honeypot check
  if (form.company && form.company.value !== "") {
    console.warn("Spam submission blocked");
    return;
  }

  // ⛔ Prevent double submission
  if (submitBtn.disabled) return;

  const loading = document.querySelector(".loading");
  const errorMessage = document.querySelector(".error-message");
  const sentMessage = document.querySelector(".sent-message");

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";
  loading.style.display = "block";
  errorMessage.style.display = "none";
  sentMessage.style.display = "none";

  emailjs
    .sendForm(
      "service_i88zc08",   // ⚠️ FIXED (see below)
      "template_6wfn3sl",
      this
    )
    .then(
      () => {
        loading.style.display = "none";
        sentMessage.style.display = "block";
        submitBtn.textContent = "Send Message";
        submitBtn.disabled = false;
        form.reset();
      },
      (error) => {
        loading.style.display = "none";
        errorMessage.textContent =
          "Failed to send message. Please try again.";
        errorMessage.style.display = "block";
        submitBtn.textContent = "Send Message";
        submitBtn.disabled = false;
        console.error("EmailJS error:", error);
      }
    );
});
