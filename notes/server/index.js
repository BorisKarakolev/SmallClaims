const express = require('express')
const app = express()
const fs = require('fs');
const bodyParser = require('body-parser')
const port = 4200

const DATA = require('./mockData.json')

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
  });

  const jsonParser = bodyParser.json()

app.get('/', (req, res) => {
  try{
    res.status(200).json(DATA.notes);
  } catch (err) {
    res.status(400).json({message: "Can't find your links"})
  }
})

app.put('/notes/:id', jsonParser, (req, res) => {
  // TODO update JSON file
})

app.listen(port, () => {
  console.log(`Listen on ${port}`)
})