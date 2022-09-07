"use strict";

const scrollContainer = document.querySelector(".navigation__scroll-box");
const scrollBackToTop = document.querySelector(".navigation__scroll-btn");
const popup = document.querySelector(".popup");
const popupOverlay = document.querySelector(".popup__overlay");
const navigationButton = document.querySelector(".navigation__button");
const checkbox = document.querySelector(".navigation__checkbox");
const navigationLink = document.querySelectorAll(".popup__link");
const sendMessage = document.querySelector(".btn--form");
const nameInput = document.querySelector(".name");
const emailInput = document.querySelector(".email");
const messageInput = document.querySelector(".message");
const messageSucces = document.querySelector(".form__succes-message");
const messageFail = document.querySelector(".form__failed-message");
checkbox.checked = false;

window.addEventListener("load", disableInput);
window.addEventListener("load", clear);
// nameInput.value = "";
// emailInput.value = "";
// messageInput.value = "";
// checkbox.checked = false;

//* CLOSING NAVIGATION MENU AFTER CLICKING A NAVIGATION LINK

for (let link of navigationLink) {
  link.addEventListener("click", function () {
    openPopup();
    toggleCheckbox();
  });
}

//* OPEN/CLOSING NAVIGATION MENU ON NAVIGATION BUTTON
navigationButton.addEventListener("click", openPopup);

function openPopup() {
  popup.classList.toggle("hidden");
  popupOverlay.classList.toggle("hidden");
}

//*CHECK IF CHECKBOX IS CHECKED/UNCHECKED
function toggleCheckbox() {
  if (checkbox.checked) {
    checkbox.checked = false;
  } else {
    checkbox.checked = true;
  }
}

//*CLOSING NAVIGATION MENU ON ESC KEY
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !popup.classList.contains("hidden")) {
    openPopup();
    toggleCheckbox();
  }
});

//*CLOSING NAVIGATION MENU WITH CLICKING ON OVERLAY BACKGROUND
popupOverlay.addEventListener("click", ExitPopup);

function ExitPopup() {
  openPopup();
  toggleCheckbox();
}

//* SHOW BUTTON ON SCROLL

window.addEventListener("scroll", showButton);

function showButton() {
  if (window.pageYOffset > 400) {
    if (!scrollBackToTop.classList.contains("slide-in-blurred-bottom")) {
      scrollBackToTop.classList.remove("slide-out-blurred-bottom");
      scrollBackToTop.classList.add("slide-in-blurred-bottom");
      scrollContainer.style.display = "block"; //SHOW BUTTON
      scrollBackToTop.style.display = "block";
    }
  } else {
    if (!scrollBackToTop.classList.contains("slide-out-blurred-bottom")) {
      scrollBackToTop.classList.remove("slide-in-blurred-bottom");
      scrollBackToTop.classList.add("slide-out-blurred-bottom");

      setTimeout(() => {
        scrollBackToTop.style.display = "none"; //HIDE BUTTON
      }, 450);
    }
  }
}

//* SCROLL TO TOP
scrollBackToTop.addEventListener("click", scrollToTop);

function scrollToTop() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

//*CONTACT FORM

window.onload = function () {
  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault(event);
      // generate a five digit number for the contact_number variable
      // this.contact_number.value = (Math.random() * 100000) | 0;
      // these IDs from the previous steps
      emailjs.sendForm("contact_service", "contact_form", this).then(
        function () {
          messageSucces.style.display = "block";
          nameInput.value = "";
          emailInput.value = "";
          messageInput.value = "";
        },
        function (error) {
          messageFail.style.display = "block";
          console.log(error);
          nameInput.value = "";
          emailInput.value = "";
          messageInput.value = "";
        }
      );
    });
};

//?THE FORM

//*DISABLE INPUT
function disableInput() {
  emailInput.disabled = true;
  emailInput.style.opacity = "0.7";
  messageInput.disabled = true;
  messageInput.style.opacity = "0.7";
}
//*ENABLE INPUT
function enableInput() {
  emailInput.disabled = false;
  emailInput.style.opacity = "1";
  messageInput.disabled = false;
  messageInput.style.opacity = "1";
}

//*IF NAME INPUT IS EMPTY DISABLE EMAIL AND MESSAGE INPUT
nameInput.addEventListener("input", function () {
  console.log(nameInput.value);
  if (nameInput.value.length > 0) {
    enableInput();
  } else {
    disableInput();
  }
});

//*CLEAR THE FORM

function clear() {
  nameInput.value = "";
  emailInput.value = "";
  messageInput.value = "";
}
