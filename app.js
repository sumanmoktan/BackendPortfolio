const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const appError = require("./utils/appError");
const globalError = require("./controller/errorController");

//import from router
const messageRouter = require("./routes/messageRoute");
const userRouter = require("./routes/userRoute");
const timeRouter = require("./routes/timeRoute");
const softwareRouter = require("./routes/softwareRoute");
const skillRoter = require("./routes/skillRoute");
const projectRouter = require("./routes/projectRoute");

const app = express();
dotenv.config({ path: "./.env" });

app.use(
  cors({
    origin: ["https://suman-moktan.netlify.app", "https://suman12.netlify.app"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization',
    optionsSuccessStatus: 200  
  })
);

app.use(cookieparser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//Routes
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/time", timeRouter);
app.use("/api/v1/software", softwareRouter);
app.use("/api/v1/skill", skillRoter);
app.use("/api/v1/project", projectRouter);

app.all("*", (req, res, next) => {
  // const err = new Error(`can't find ${req.originalUrl} in this server!`);
  // err.status = 'fail';
  // err.statusCode = 404;

  next(new appError(`can't find ${req.originalUrl} in this server!`, 404));
});

app.use(globalError);

module.exports = app;
