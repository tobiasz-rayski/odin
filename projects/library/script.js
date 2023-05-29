function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = function () {
    return read ? "has been read" : "not read yet";
  };
  this.info = function () {
    return `${this.title} by ${this.author}, ${
      this.pages
    } pages, ${this.read()}.`;
  };
}

const book1 = new Book(
  "Influence: The Psychology of Persuasion",
  "R. Cialdini",
  295,
  true
);

const book2 = new Book("A Game of Thrones", "George R. R. Martin", 694, false);

const book3 = new Book("Sword of Destiny", "A. Sapkowski", 384, false);

const book4 = new Book(
  "Thinking, Fast and Slow",
  "Daniel Kahneman",
  499,
  false
);

console.log(book1.info());
