"use strict";
const form = document.querySelector(".card__form");
const email = document.querySelector(".card__form-input");
const emailError = document.querySelector(".card__form-error");
// Function to show error messages if email is invalid
function showError() {
    if (email.validity.valueMissing) {
        emailError.textContent = "Email required";
    }
    else if (email.validity.typeMismatch) {
        emailError.textContent = "Valid Email required";
    }
    emailError.classList.add("card__form-error--visible");
    email.classList.add("card__form-input-error");
}
// Toggles between success message and form content
function toggleSuccessMessage() {
    const cardImg = document.querySelector(".card__picture");
    const cardContent = document.querySelector(".card__content");
    const cardSuccess = document.querySelector(".card__success");
    if (cardImg && cardContent && cardSuccess) {
        cardImg.classList.toggle("hidden");
        cardContent.classList.toggle("hidden");
        cardSuccess.classList.toggle("hidden");
    }
    else {
        console.error("One or more elements for success message are missing");
    }
}
// Resets the form and removes error messages and styles
function resetForm() {
    form.reset();
    emailError.textContent = "";
    emailError.classList.remove("card__form-error--visible");
    email.classList.remove("card__form-input-error");
}
// Processes a successful form submission
function processSuccess() {
    const emailAddress = email.value;
    const userEmailSpan = document.querySelector(".card__success-email");
    userEmailSpan.innerText = emailAddress;
    toggleSuccessMessage();
    resetForm();
}
// Initializer function
function init() {
    if (!email || !form || !emailError) {
        console.error("Critical form elements are missing");
        return;
    }
    // Handles email input event
    email.addEventListener("input", (event) => {
        if (email.validity.valid) {
            emailError.textContent = "";
            emailError.classList.remove("card__form-error--visible");
            email.classList.remove("card__form-input-error");
        }
    });
    // Handles form submission
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!email.validity.valid) {
            showError();
        }
        else {
            processSuccess();
            dismissBtn.focus(); // Set focus on dismiss button for accessibility
        }
    });
    // Handles dismiss button click
    const dismissBtn = document.querySelector(".card__dismiss-button");
    if (dismissBtn) {
        dismissBtn.addEventListener("click", () => {
            toggleSuccessMessage();
        });
    }
    else {
        console.error("Dismiss button is missing");
    }
}
init();
