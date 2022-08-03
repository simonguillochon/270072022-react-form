const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (res) => {
  res.send('Hello World!');
})

app.post('/register', (req, res) => {
  console.log(req.body);
  res.json({ requestBody: req.body });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
