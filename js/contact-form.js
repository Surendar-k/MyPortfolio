document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const alertBox = document.getElementById("alertBox");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { Accept: "application/json" },
      });

      const result = await response.json();

      if (response.ok) {
        alertBox.style.color = "green";
        alertBox.innerText = "Message sent successfully!";
        alertBox.style.display = "block";

        // Clear inputs immediately on success
        form.querySelectorAll("input[type=text], input[type=email], textarea").forEach(input => input.value = "");
      } else {
        throw new Error(result.message || "Something went wrong");
      }
    } catch (error) {
      alertBox.style.color = "red";
      alertBox.innerText = "Failed to send message. Please try again.";
      alertBox.style.display = "block";
    }

    // Hide alert after 5 seconds
    setTimeout(() => {
      alertBox.style.display = "none";
      alertBox.innerText = "";
    }, 5000);
  });
});
