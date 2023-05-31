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

    this.booksCollection.forEach((book, index) => {
      const bookElement = document.createElement('div');
      bookElement.className = index % 2 === 0 ? 'even dynamic-list' : 'odd dynamic-list';
      bookElement.innerHTML = `
        <span class="books-container">
          <p>"${book.title}"</p>
          <p class="para-by">by</p>
          <h2>${book.author}</h2>
        </span>
        <button class="remove-book" data-index="${index}">Remove</button>
      `;
      bookList.appendChild(bookElement);
    });

    const removeButtons = document.querySelectorAll('.remove-book');
    removeButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const index = parseInt(button.getAttribute('data-index'), 10);
        this.removeBook(index);
      });
    });
  }

  addBook(event) {
    event.preventDefault();

    const titleInput = document.querySelector('#title');
    const authorInput = document.querySelector('#author');
    const title = titleInput.value.trim();
    const author = authorInput.value.trim();

    if (title === '' || author === '') {
      return;
    }

    const newBook = { title, author };

    this.booksCollection.push(newBook);
    titleInput.value = '';
    authorInput.value = '';
    this.displayBooks();
    this.saveBooksToStorage();
  }

  removeBook(index) {
    this.booksCollection.splice(index, 1);
    this.displayBooks();
    this.saveBooksToStorage();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  BookCollection.initialize();
});
