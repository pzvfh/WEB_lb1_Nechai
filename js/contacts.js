"use strict";

function initContactForm() {
  const form = document.forms.contactForm;
  const formStatus = document.getElementById("form-status");

  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const messageField = form.elements.message;
    const messageText = messageField.value.toLowerCase();

    if (messageText.includes("спам") || messageText.includes("реклама")) {
      messageField.setCustomValidity("Повідомлення не повинно містити слова: 'спам' або 'реклама'.");
    } else {
      messageField.setCustomValidity("");
    }

    if (form.checkValidity()) {
      const data = new FormData(form);
      console.log("Дані форми відправлено:", Object.fromEntries(data.entries()));

      if (formStatus) {
        formStatus.textContent = "Повідомлення успішно відправлено!";
        formStatus.style.color = "green";
      }
      alert("Форму успішно відправлено!");
      form.reset();
    } else {
      form.reportValidity();
    }
  });

  form.elements.message.addEventListener("input", function() {
    this.setCustomValidity("");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initContactForm();
});