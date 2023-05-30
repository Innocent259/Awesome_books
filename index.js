document.addEventListener('DOMContentLoaded', () => {
  let booksCollection = [];
  const bookList = document.querySelector('.booklist');
  const titleInput = document.querySelector('#title');
  const authorInput = document.querySelector('#author');
  const addButton = document.querySelector('.add-button');

  const displayBooks = () => {
    bookList.innerHTML = '';
    booksCollection.forEach((book) => {
      const bookElement = document.createElement('div');
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
        // eslint-disable-next-line no-use-before-define
        removeBook(title);
      });
    });
  };

  const addBook = (event) => {
    event.preventDefault();
    const title = titleInput.value;
    const author = authorInput.value;
    const newBook = {
      title,
      author,
    };
    booksCollection.push(newBook);
    titleInput.value = '';
    authorInput.value = '';
    displayBooks();
  };

  const removeBook = (title) => {
    booksCollection = booksCollection.filter((book) => book.title !== title);
    displayBooks();
  };

  addButton.addEventListener('click', addBook);
});
