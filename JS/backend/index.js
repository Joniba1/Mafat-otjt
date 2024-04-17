const express = require('express');
const path = require('path');

const app = express();
const port = 5500;
const base_URL = 'http://localhost:'

app.use(express.static(path.join(__dirname, '..', 'frontend')));

//Starts the server and listens to incoming requests from the HTML file
app.listen(port, () => {
    console.log(`Server is running at ${base_URL}${port}`);
});