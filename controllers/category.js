const { connection } = require("../config/mysql-config");

const getAllCategory = (req, result) => {
  if (err) {
    res.status(400).json({ message: err.message });
    return;
  }
  res.status(200).json({ message: "server huselt amjilttai", data: result });
};

const getCategory = (req, res) => {
  const id = req.params.id;
  connection.query(`SELECT * FROM caregory WHERE id=${id}`, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
      return;
    }
    res
      .status(200)
      .json({ message: "azure server amjilttai" + id, data: result });
  });
};
const createCategory = (req, res) => {
  const body = req.body;
  const keys = Object.keys(body); // keys:["name", "ovog"]
  const uusgegch = keys.map((key) => `${key}='${body[key]}'`).join();
  connection.query(
    `INSERT INTO category VALUES(${uusgegch})`,
    (err, result) => {
      if (err) {
        res.status(400).json({ message: err.message });
        return;
      }
      res
        .status(200)
        .json({ message: "azure server huselt amjilttai", data: result });
    }
  );
};

const updateCategory = (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const keys = Object.keys(body);
  const huvsaigch = keys.map((key) => `${key}='${body[key]}'`).join();
  connection.query(
    `UPDATE category SET ${huvsaigch} WHERE id=${id}`,
    (err, result) => {
      if (err) {
        res.status(400).json({ message: err.message });
        return;
      }
      res
        .status(200)
        .json({ message: "azure server huselt amjilttai", data: result });
    }
  );
};

const deleteCategory = (req, res) => {
  const id = req.params.id;
  connection.query(`DELETE category WHERE id=${id}`, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(200).json({ message: "server huselt amjilttai", data: result });
  });
};
module.exports = {
  getAllCategory,
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
};
