import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

import { closeModal, openModal } from "./utils.js";

// Could be improved: It's better to place the array of initial cards
// in a separate file and connect it before `index.js`
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

// Wrappers
const cardsWrap = document.querySelector(".cards__list");
const editFormModalWindow = document.querySelector("#edit-popup");
const cardFormModalWindow = document.querySelector("#new-card-popup");
const cardForm = document.querySelector("#new-card-form");
const imageModalWindow = document.querySelector("#image-popup");
// Students are not proficient enough with `submit`

// Buttons and other DOM nodes
const openEditFormButton = document.querySelector(".profile__edit-button");
const openCardFormButton = document.querySelector(".profile__add-button");

// Profile DOM nodes
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Form data and elements
const titleInputValue = editFormModalWindow.querySelector(
  ".popup__input_type_name"
);
const descriptionInputValue = editFormModalWindow.querySelector(
  ".popup__input_type_description"
);
const cardNameInputValue = cardFormModalWindow.querySelector(
  ".popup__input_type_card-name"
);
const cardLinkInputValue = cardFormModalWindow.querySelector(
  ".popup__input_type_url"
);

const cardSelector = ".card-template";
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const editFormValidator = new FormValidator(
  validationConfig,
  editFormModalWindow
);
const cardFormValidator = new FormValidator(
  validationConfig,
  cardFormModalWindow
);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = titleInputValue.value;
  profileDescription.textContent = descriptionInputValue.value;
  closeModal(editFormModalWindow);
};

const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  renderCard(
    {
      name: cardNameInputValue.value,
      link: cardLinkInputValue.value,
    },
    cardsWrap
  );
  closeModal(cardFormModalWindow);
  // Can be better: reset form after adding a new card. Can be better: use .reset();
  cardNameInputValue.value = "";
  cardLinkInputValue.value = "";
};

const renderCard = (data, wrap) => {
  const card = new Card(data, cardSelector);
  wrap.prepend(card.getView());
};

// Event listeners
editFormModalWindow.addEventListener("submit", handleProfileFormSubmit);
cardFormModalWindow.addEventListener("submit", handleCardFormSubmit);

openEditFormButton.addEventListener("click", () => {
  titleInputValue.value = profileTitle.textContent;
  descriptionInputValue.value = profileDescription.textContent;
  editFormValidator.resetValidation(); // Not required
  openModal(editFormModalWindow);
});

openCardFormButton.addEventListener("click", () => {
  // Resetting the form is optional. If they do, then it is necessary to make submit button inactive and remove the input error messages.
  // Important: it is one of the possible solutions. Students can implement it in different ways but it is important to not duplicate the code.
  // It is acceptable to just call disableSubmitButton and not reset the input contents / errors.
  // This is given as an example of how to reset everything correctly it if they do choose to.
  cardForm.reset();
  cardFormValidator.resetValidation();
  openModal(cardFormModalWindow);
});

editFormModalWindow.addEventListener("mousedown", (evt) => {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close")
  ) {
    closeModal(editFormModalWindow);
  }
});
cardFormModalWindow.addEventListener("mousedown", (evt) => {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close")
  ) {
    closeModal(cardFormModalWindow);
  }
});
imageModalWindow.addEventListener("mousedown", (evt) => {
  if (
    evt.target.classList.contains("popup") ||
    evt.target.classList.contains("popup__close")
  ) {
    closeModal(imageModalWindow);
  }
});

// Initialization
initialCards.forEach((data) => {
  renderCard(data, cardsWrap);
});

/* Summary:
 * There is no new functionality in this sprint, students just refactor the code, rewrite it using the classes.
 * Cards are created using the public method of the Card class.
 * There are should be 2 validation objects. enableValidation function must be called only once for each of them.
 * There should be no code duplication. Opening/closing function should be inside utils.js module
 * */
