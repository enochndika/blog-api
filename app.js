const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();
require("./utils/dbConnection");

/* import Routes*/
const likePostRoutes = require("./routes/post/likePostsRoutes");
const postCategoryRoutes = require("./routes/post/postCategoryRoutes");
const postCrudRoutes = require("./routes/post/postCrudRoutes");
const postFilterRoutes = require("./routes/post/postFilterRoutes");
const reportPostRoutes = require("./routes/post/reportPostRoutes");

const commentRoutes = require("./routes/comment/commentRoutes");
const reportCommentRoutes = require("./routes/comment/reportCommentRoutes");

const childCommentsRoutes = require("./routes/commentChild/childCommentRoutes");
const reportChildCommentRoutes = require("./routes/commentChild/reportChildCommentRoutes");
const userRoutes = require("./routes/user/userRoutes");

const authRoutes = require("./routes/user/authRoutes");
const fileUploadRoutes = require("./routes/fileUploadRoutes");
const mockRoutes = require("./routes/mockRoutes");

const app = express();

const corsOption = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["Authorization"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

/* Middlewares */
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors(corsOption));
app.use(helmet());

/* Routes Middleware*/
app.use("/api/like-posts", likePostRoutes);
app.use("/api/post-categories", postCategoryRoutes);
app.use("/api/posts", postCrudRoutes);
app.use("/api/post-filters", postFilterRoutes);
app.use("/api/report-posts", reportPostRoutes);

app.use("/api/comments", commentRoutes);
app.use("/api/report-comments", reportCommentRoutes);

app.use("/api/child-comments", childCommentsRoutes);
app.use("/api/report-child-comments", reportChildCommentRoutes);
app.use("/api/users", userRoutes);

app.use("/api", authRoutes);
app.use("/api/upload", fileUploadRoutes);
app.use("/api/mocks", mockRoutes);

/*
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
*/

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
