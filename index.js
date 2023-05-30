class BookCollection {
  constructor() {
    this.booksCollection = [];

    this.loadBooksFromStorage();
    this.displayBooks();

    this.addButton = document.querySelector('.add-button');
    this.addButton.addEventListener('click', this.addBook.bind(this));
  }

  static initialize() {
    const bookCollection = new BookCollection();
    return bookCollection;
  }

  loadBooksFromStorage() {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      this.booksCollection = JSON.parse(storedBooks);
    }
  }

  saveBooksToStorage() {
    localStorage.setItem('books', JSON.stringify(this.booksCollection));
  }

  displayBooks() {
    const bookList = document.querySelector('.booklist');
    bookList.innerHTML = '';

    this.booksCollection.forEach((book) => {
      const bookElement = document.createElement('div');
      bookElement.className = 'dynamic-list';
      bookElement.innerHTML = `
        <p>${book.title}</p>
        <p>By</p>
        <h2>${book.author}</h2>
        <button class="remove-book" data-title="${book.title}">Remove</button>
      `;
      bookList.appendChild(bookElement);
    });

    const removeButtons = document.querySelectorAll('.remove-book');
    removeButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const title = button.getAttribute('data-title');
        this.removeBook(title);
      });
    });
  }

  addBook(event) {
    event.preventDefault();

    const titleInput = document.querySelector('#title');
    const authorInput = document.querySelector('#author');
    const title = titleInput.value;
    const author = authorInput.value;
    const newBook = { title, author };

    this.booksCollection.push(newBook);
    titleInput.value = '';
    authorInput.value = '';
    this.displayBooks();
    this.saveBooksToStorage();
  }

  removeBook(title) {
    this.booksCollection = this.booksCollection.filter((book) => book.title !== title);
    this.displayBooks();
    this.saveBooksToStorage();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  BookCollection.initialize();
});
