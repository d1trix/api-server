require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, { useUnifiedTopology: true, useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to Database'));

const commentsRouter = require('./work-effort/comments');
app.use(commentsRouter);


app.listen(3000, () => {
  console.log('RESTful API server started');
});

