let myLibrary = [];
let idCounter = 0;

function Book(title, author, pages, read, idNum) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.idNum = idNum;
}

const cardContainer = document.createElement("div");
const buttonContainer = document.createElement("div");
const buttonOpenModal = document.createElement("button");
const wrapper = document.getElementById("wrapper");
const modal = document.getElementById("modal");
const buttonCloseModal = document.getElementById("close-modal");
const addButton = document.getElementById("addButton");
const modalContent = document.getElementById("modal-cont");
buttonOpenModal.textContent = "New Book";

buttonContainer.classList.add("button-container");
buttonOpenModal.classList.add("button-open-modal");
cardContainer.classList.add("card-container");

wrapper.appendChild(cardContainer);
wrapper.appendChild(buttonContainer);
buttonContainer.appendChild(buttonOpenModal);

function closeModal() {
  modal.style.display = "none";
  modalContent.style.transform = "scale(0)";
}

buttonOpenModal.addEventListener("click", () => {
  modal.style.display = "block";

  setTimeout(() => {
    modalContent.style.transform = "scale(1)";
  }, 10);
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

buttonCloseModal.addEventListener("click", (event) => {
  if (event.target === buttonCloseModal) {
    closeModal();
  }
});

window.addEventListener("keydown", (event) => {
  if (event.keyCode === 27) {
    closeModal();
  }
});

function createCard(book) {
  let card = document.createElement("div");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const read = document.createElement("p");
  const readButton = document.createElement("div");
  const deleteCard = document.createElement("span");

  title.textContent = book.title;
  author.textContent = book.author;
  pages.textContent = book.pages + " pages";
  read.textContent = book.read ? "Read" : "Not read yet";
  deleteCard.innerHTML = "&times";

  if (!book.read) {
    readButton.classList.add("switch-off");
  }

  card.setAttribute("data-id", book.idNum);

  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(read);
  card.appendChild(readButton);
  card.appendChild(deleteCard);

  card.classList.add("card");
  title.classList.add("title");
  author.classList.add("author");
  pages.classList.add("pages");
  read.classList.add("read");
  readButton.classList.add("read-button");
  deleteCard.classList.add("delete-card");

  deleteCard.addEventListener("click", (event) => {
    const parent = event.target.parentNode;
    const dataId = Number(parent.getAttribute("data-id"));
    parent.remove();
    myLibrary = myLibrary.filter((book) => book.idNum !== dataId);
  });

  readButton.addEventListener("click", (event) => {
    const parent = event.target.parentNode;
    const dataId = Number(parent.getAttribute("data-id"));
    myLibrary.forEach((book) => {
      if (book.idNum === dataId) {
        book.read = !book.read;
        readButton.classList.toggle("switch-off");
        read.textContent = book.read ? "Read" : "Not read yet";
      }
    });
  });

  return card;
}

function addBookToLibrary(book) {
  let card = createCard(book);
  cardContainer.appendChild(card);

  if (!book.read) {
    readButton.classList.add("switch-off");
  }
}

addButton.addEventListener("click", (event) => {
  event.preventDefault();
  const title = document.getElementById("book-title").value;
  const author = document.getElementById("book-author").value;
  const pages = document.getElementById("book-pages").value;
  const checkbox = document.querySelector(`input[name="read-check"]`);
  const read = checkbox.checked;
  const idNum = idCounter;
  idCounter++;
  const book = new Book(title, author, pages, read, idNum);
  myLibrary.push(book);
  addBookToLibrary(book);
});
