const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');

// GET Route for retrieving diagnostic information
diagnostics.get('/', (req, res) => {
  // TODO: Logic for sending all the content of db/diagnostics.json
  readFromFile('./db/diagnostics.json').then((data) => res.json(JSON.parse(data)))
});

// POST Route for a error logging
diagnostics.post('/', (req, res) => {
  // TODO: Logic for appending data to the db/diagnostics.json file
  const { isValid, errors } = req.body;

  let diagnosticsArr = readFromFile("../db/diagnostics.json", "utf-8");
  
  const newDiagObj = {
    "time": Date().now(),
    "error_id": uuidv4(),
    "errors": {
      "tip": errors.tip,
      "topic": errors.topic,
      "username": errors.username
    }
  }

  diagnosticsArr.push(newDiagObj);
  writeToFile("../db/diagnostics.json", diagnosticsArr);
});

module.exports = diagnostics;
