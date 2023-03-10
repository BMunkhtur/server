const { connection } = require("./config/mysql-config");
const fs = require("fs");

console.log("Working");

const insertTravel = (travels, data) => {
  connection.query(
    `INSERT INTO travels (id,cat_id, title, images, category,price,location,day ) VALUES ${data};`,
    (err, res) => {
      if (err) {
        console.log("EROR-----", err);
        return;
      }
      console.log("Success", res);
    }
  );
};

const contentTravel = fs.readFileSync("./data/travels.json", "utf-8");

const traveldatas = JSON.parse(contentTravel).travels;

const insertTravelData = traveldatas
  .map(
    (data) =>
      `(null, ${data.id}, "${data.title}", "${data.imgUTL}","${data.category}","${data.price}","${data.location}", "${data.day}")`
  )
  .join();

insertTravel("travels", insertTravelData);
console.log(insertTravelData);
