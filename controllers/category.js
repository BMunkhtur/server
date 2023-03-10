const { connection } = require("../config/mysql-config");
const { convertQueryStr } = require("../utils/convertQuery");

const getAllCategory = (req, result) => {
  if (err) {
    res.status(400).json({ message: err.message });
    return;
  }
  res.status(200).json({ message: "server huselt amjilttai", data: result });
};

const getCategory = (req, res) => {
  const id = req.params.id;
  connection.query(`SELECT * FROM category WHERE id=${id}`, (err, result) => {
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
  const uusgegch = convertQueryStr(req.body);
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

  // //  update hiihdee huvisagchaar utgaa damjuulan objectees array bolgon map-aar guilgej bg heseg
  // keys:["name", "ovog"]
  const huvsaigch = convertQueryStr(req.body);
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
// const id = req.params.id;
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
