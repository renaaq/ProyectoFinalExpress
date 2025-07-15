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


const getBookByISBN = (isbn) => {
    axios.get(`http://localhost:5000/isbn/${isbn}`)
        .then(response => {
            console.log(`Tarea 11 - Libro con ISBN ${isbn}:`, response.data);
        })
        .catch(error => {
            console.error("Error obteniendo libro por ISBN:", error.message);
        });
};

getBookByISBN("1");


// TAREA 12 - Get books by author using async/await
const getBooksByAuthor = async (author) => {
    try {
        const response = await axios.get(`http://localhost:5000/author/${author}`);
        console.log(`Tarea 12 - Libros por autor '${author}':`, response.data);
    } catch (error) {
        console.error("Error obteniendo libros por autor:", error.message);
    }
};

getBooksByAuthor("Unknown");


const getBooksByTitle = (title) => {
    axios.get(`http://localhost:5000/title/${title}`)
        .then(response => {
            console.log(`Tarea 13 - Libros con título '${title}':`, response.data);
        })
        .catch(error => {
            console.error("Error obteniendo libros por título:", error.message);
        });
};

getBooksByTitle("Things Fall Apart"); 
