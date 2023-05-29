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
Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${
    this.pages
  } pages, ${this.read()}.`;
};

function addBook() {
  const title = prompt("TITLE");
  const author = prompt("AUTHOR");
  const pages = prompt("PAGES");
  const read = prompt("READ?");
  const checkRead = read.toLowerCase() === "yes";
  const book = new Book(title, author, pages, checkRead);
  myLibrary.push(book);
}

addBook();
console.log(myLibrary);

// const book = new Book(
//   "Influence: The Psychology of Persuasion",
//   "R. Cialdini",
//   295,
//   true
// );
