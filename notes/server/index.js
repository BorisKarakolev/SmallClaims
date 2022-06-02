const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const port = 4200;

const DATA = require("./mockData.json");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

const jsonParser = bodyParser.json();

app.get("/", (req, res) => {
  try {
    res.status(200).json(DATA.notes);
  } catch (err) {
    res.status(400).json({ message: "Can't find your links" });
  }
});

app.put("/notes/:id", jsonParser, (req, res) => {
  const name = req.body.name;
  const content = req.body.content;
  try {
    const initData = fs.readFileSync("./mockData.json");
    const dataObj = JSON.parse(initData);

    dataObj.notes.forEach(obj => {
      if(obj.id === parseInt(req.params.id)){
        obj.name = name
        obj.content = content
      }
    });

    const updatedJson = JSON.stringify(dataObj, null, 2);

    fs.writeFile("./mockData.json", updatedJson, (err) => {
      if (err) {
        return res.status(400).json(err);
      }
      console.log(updatedJson);
    });

    return res.status(200).json(updatedJson);
  } catch (err) {
    return res.status(400).json({ message: "Can't update your note" });
  }
});

app.listen(port, () => {
  console.log(`Listen on ${port}`);
});
