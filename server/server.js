const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv")
const bodyParser = require("body-parser");

dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/message', (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });