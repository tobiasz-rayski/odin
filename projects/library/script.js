let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

const wrapper = document.getElementById("wrapper");
const cardContainer = document.createElement("div");
const modal = document.getElementById("modal");
const buttonContainer = document.createElement("div");
const buttonOpenModal = document.createElement("button");
buttonOpenModal.textContent = "New Book";
const buttonCloseModal = document.getElementById("close-modal");
const addButton = document.getElementById("addButton");

buttonContainer.classList.add("button-container");
buttonOpenModal.classList.add("button-open-modal");
cardContainer.classList.add("card-container");

wrapper.appendChild(cardContainer);
wrapper.appendChild(buttonContainer);
buttonContainer.appendChild(buttonOpenModal);

function closeModal() {
  modal.style.display = "none";
}

buttonOpenModal.addEventListener("click", () => {
  modal.style.display = "block";
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

addButton.addEventListener("click", (event) => {
  event.preventDefault();
  const titleForm = document.getElementById("book-title").value;
  const authorForm = document.getElementById("book-author").value;
  const pagesForm = document.getElementById("book-pages").value;
  const readForm =
    document.querySelector(`input[name="book_read"]:checked`).value === "true";
  const book = new Book(titleForm, authorForm, pagesForm, readForm);
  myLibrary.push(book);
  addBookToLibrary(book);
  closeModal();
});

window.addEventListener("keydown", (event) => {
  if (event.keyCode === 27) {
    closeModal();
  }
});

function addBookToLibrary(item) {
  const card = document.createElement("div");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const read = document.createElement("p");

  title.textContent = item.title;
  author.textContent = item.author;
  pages.textContent = item.pages + " pages";
  read.textContent = item.read ? "Read" : "Not read yet";

  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(read);

  card.classList.add("card");
  title.classList.add("title");
  author.classList.add("author");
  pages.classList.add("pages");
  read.classList.add("read");

  if (!item.read) {
    read.classList.add("text-red");
  }

  cardContainer.appendChild(card);
}
