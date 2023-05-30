document.addEventListener('DOMContentLoaded', () => {
  let booksCollection = [];

  const loadBooksFromStorage = () => {
    const storedBooks = localStorage.getItem('books');
    if (storedBooks) {
      booksCollection = JSON.parse(storedBooks);
    }
  };
  loadBooksFromStorage();
  const saveBooksToStorage = () => {
    localStorage.setItem('books', JSON.stringify(booksCollection));
  };
  const table = document.querySelector('#table');
  const addButton = document.querySelector('.add-button');

  const displayBooks = () => {
    const tbody = document.createElement('tbody');
    booksCollection.forEach((book, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td><button class="remove-book" data-index="${index}">Remove</button></td>
      `;
      tbody.appendChild(row);
    });
    table.innerHTML = '';
    table.appendChild(tbody);
    const removeBook = (index) => {
      booksCollection.splice(index, 1);
      displayBooks();
      saveBooksToStorage();
    };
    const removeButtons = document.querySelectorAll('.remove-book');
    removeButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const index = button.getAttribute('data-index');
        removeBook(index);
      });
    });
  };

  const addBook = (event) => {
    event.preventDefault();
    const titleInput = document.querySelector('#title');
    const authorInput = document.querySelector('#author');
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
    saveBooksToStorage();
  };

  addButton.addEventListener('click', addBook);
});
