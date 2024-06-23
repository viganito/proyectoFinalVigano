document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://api.example.com/books';

    
    function fetchBooks() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                renderBooks(data);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });
    }

    
    function renderBooks(books) {
        const bookList = document.getElementById('book-list');
        bookList.innerHTML = '';

        books.forEach(book => {
            const bookItem = document.createElement('div');
            bookItem.classList.add('book-item');
            bookItem.innerHTML = `
                <strong>${book.title}</strong> - ${book.author}
                <button class="delete-btn" data-id="${book.id}">Eliminar</button>
            `;
            bookList.appendChild(bookItem);

            
            const deleteButton = bookItem.querySelector('.delete-btn');
            deleteButton.addEventListener('click', () => {
                deleteBook(book.id);
            });
        });
    }

    
    function deleteBook(bookId) {
        fetch(`${apiUrl}/${bookId}`, {
            method: 'DELETE'
        })
        .then(() => fetchBooks())
        .catch(error => {
            console.error('Error deleting book:', error);
        });
    }

    
    const addBookForm = document.getElementById('add-book-form');
    addBookForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;

        
        if (title.trim() === '' || author.trim() === '') {
            alert('Por favor ingresa el título y el autor del libro.');
            return;
        }

       
        const newBook = {
            title: title,
            author: author
        };

        
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
        })
        .then(response => response.json())
        .then(() => {
            fetchBooks(); 
            document.getElementById('title').value = '';
            document.getElementById('author').value = '';
        })
        .catch(error => {
            console.error('Error adding book:', error);
        });
    });

    
    fetchBooks();
});