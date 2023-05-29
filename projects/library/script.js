let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.read = function () {
  return read ? "has been read" : "not read yet";
};

// Book.prototype.info = function () {
//   return `${this.title} by ${this.author}, ${
//     this.pages
//   } pages, ${this.read()}.`;
// };

const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
const book2 = new Book("To Kill a Mockingbird", "Harper Lee", 281, false);
const book3 = new Book("1984", "George Orwell", 328, true);
const book4 = new Book("Pride and Prejudice", "Jane Austen", 432, false);
const book5 = new Book("The Catcher in the Rye", "J.D. Salinger", 224, false);

myLibrary.push(book1);
myLibrary.push(book2);
myLibrary.push(book3);
myLibrary.push(book4);
myLibrary.push(book5);

console.log(myLibrary);

const wrapper = document.getElementById("wrapper");
const cardContainer = document.createElement("div");
cardContainer.classList.add("card-container");
wrapper.appendChild(cardContainer);

myLibrary.forEach((item) => {
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
  cardContainer.appendChild(card);

  card.classList.add("card");
  title.classList.add("title");
  author.classList.add("author");
  pages.classList.add("pages");
  read.classList.add("read");

  if (read.textContent.includes("Not")) {
    read.classList.toggle("text-red");
  }
});

const modal = document.getElementById("modal");
const buttonContainer = document.createElement("div");
buttonContainer.classList.add("button-container");
const buttonOpenModal = document.createElement("button");
const buttonCloseModal = document.getElementById("close-modal");
buttonOpenModal.classList.add("button-open-modal");
buttonOpenModal.textContent = "New Book";

wrapper.appendChild(buttonContainer);
buttonContainer.appendChild(buttonOpenModal);
buttonContainer.style.alignSelf = "flex-start";
buttonOpenModal.addEventListener("click", () => {});

buttonOpenModal.addEventListener("click", () => {
  modal.style.display = "block";
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

buttonCloseModal.addEventListener("click");
