const express = require('express');
const path = require('path');

const app = express();
const port = 3000;
const base_URL = 'http://localhost:'

app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.listen(port, () => {
    console.log(`Server is running at ${base_URL}${port}`);
});