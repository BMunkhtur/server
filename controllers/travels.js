const { Router } = require("express");

const router = Router();
const { connection } = require("../config/mysql-config");
const { convertQueryStr } = require("../utils/convertQuery");

const getAllTravel = (req, res) => {
  connection.query(`SELECT * FROM travels`, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(200).json({ message: "server huselt amjilttai", data: result });
  });
};
const getTravel = (req, res) => {
  const id = req.params.id;
  connection.query(`SELECT * FROM travels WHERE id=${id}`, (err, result));
  if (err) {
    res.status(400).json({ message: err.message });
    return;
  }
  res.status(200).json({ message: "server huselt amjilttai", data: result });
};

const createTravel = (req, res) => {
  const body = req.body;
  const keys = Object.keys(body); // keys:["name", "ovog"]
  const uusgegch = keys.map((key) => `${key}='${body[key]}'`).join();
  connection.query(`INSERT INTO travels VALUES(${uusgegch})`, (err, result) => {
    if (err) {
      res.status(400).json({ message: err, message });
      return;
    }
    res.status(200).json({ message: "server huselt amjilttai", data: result });
  });
};

const updateTravel = (req, res) => {
  const id = req.params.id;
  const huvsaigch = convertQueryStr(req.body);
  connection.query(
    `UPDATE travels SET ${huvsaigch} WHERE id=${id}`,
    (err, result) => {
      if (err) {
        res.status(400).json({ message: err.message });
        return;
      }
      res
        .status(200)
        .json({ message: "server huselt amjilttai", data: result });
    }
  );
};
// const id = req.params.id;
const deleteTravel = (req, res) => {
  const id = req.params.id;
  connection.query(`DELETE travels WHERE id=${id}`, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(200).json({ message: "server huselt amjilttai", data: result });
  });
};
module.exports = {
  createTravel,
  deleteTravel,
  getTravel,
  updateTravel,
  getAllTravel,
};
