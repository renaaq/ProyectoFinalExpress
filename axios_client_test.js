const axios = require('axios');


const getAllBooks = async () => {
    try {
        const response = await axios.get('http://localhost:5000/');
        console.log("Tarea 10 - Todos los libros:", response.data);
    } catch (error) {
        console.error("Error obteniendo todos los libros:", error.message);
    }
};

getAllBooks();

// TAREA 11 - Get book by ISBN using Promises
const getBookByISBN = (isbn) => {
    axios.get(`http://localhost:5000/isbn/${isbn}`)
        .then(response => {
            console.log(`Tarea 11 - Libro con ISBN ${isbn}:`, response.data);
        })
        .catch(error => {
            console.error("Error obteniendo libro por ISBN:", error.message);
        });
};

getBookByISBN("1");  // Cambia "1" por un ISBN válido si hace falta


// TAREA 12 - Get books by author using async/await
const getBooksByAuthor = async (author) => {
    try {
        const response = await axios.get(`http://localhost:5000/author/${author}`);
        console.log(`Tarea 12 - Libros por autor '${author}':`, response.data);
    } catch (error) {
        console.error("Error obteniendo libros por autor:", error.message);
    }
};

getBooksByAuthor("Unknown"); // Cambia por uno que esté en tu base


// TAREA 13 - Get books by title using Promises
const getBooksByTitle = (title) => {
    axios.get(`http://localhost:5000/title/${title}`)
        .then(response => {
            console.log(`Tarea 13 - Libros con título '${title}':`, response.data);
        })
        .catch(error => {
            console.error("Error obteniendo libros por título:", error.message);
        });
};

getBooksByTitle("Things Fall Apart");  // Cambia por un título válido si hace falta
