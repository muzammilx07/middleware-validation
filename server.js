const express = require('express');
const app = express();
const port = 3000;
const { validateUserData, errorHandler } = require('./middleware/validation');

app.use(express.json());

app.post('/register', validateUserData, (req, res) => {
    res.status(201).send({ message: 'User registered successfully!' });
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
