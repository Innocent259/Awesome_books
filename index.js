// Create an empty books collection
let booksCollection = [];

// Get DOM elements
const bookList = document.querySelector('.booklist');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const addButton = document.querySelector('.add-button');

// Function to add a book
const addBook = () => {
  const title = titleInput.value;
  const author = authorInput.value;

  // Create a new book object
  const newBook = {
    title,
    author,
  };

  // Add the new book to the collection
  booksCollection.push(newBook);

  // Call the function to update the book list display
  displayBooks();

  // Clear input fields
  titleInput.value = '';
  authorInput.value = '';
};

// Function to remove a book
const removeBook = (title) => {
  // Use the filter() method to remove the book from the collection
  booksCollection = booksCollection.filter((book) => book.title !== title);

  // Call the function to update the book list display
  displayBooks();
};

// Function to display books in the book list
const displayBooks = () => {
  // Clear the book list
  bookList.innerHTML = '';

  // Iterate through the books collection and create HTML for each book
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

  // Attach event listeners to remove buttons
  const removeButtons = document.querySelectorAll('.remove-book');
  removeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const title = button.getAttribute('data-title');
      removeBook(title);
    });
  });
};

// Event listener for the add button
addButton.addEventListener('click', addBook);
