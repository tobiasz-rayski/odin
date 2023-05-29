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
const box = document.createElement("div");
box.classList.add("box");
wrapper.appendChild(box);

myLibrary.forEach((item) => {
  const card = document.createElement("div");
  const title = document.createElement("p");
  const author = document.createElement("p");
  const pages = document.createElement("p");
  const read = document.createElement("p");
  title.textContent = item.title;
  author.textContent = item.author;
  pages.textContent = item.pages;
  read.textContent = item.read;
  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(read);
  box.appendChild(card);
  card.classList.add("card");
  title.classList.add("title");
});
