const app = require("./app");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECREATE_KEY,
});

mongoose.connect(process.env.DB_URL, { dbName: "PORTFOLIO" }).then(() => {
  console.log("connected to database");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running in ${port}`);
});
