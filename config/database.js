const mongoose = require("mongoose");

const db = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB connect");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = db;
