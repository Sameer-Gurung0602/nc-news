const express = require("express");
const {handleTopicNotFound, handlePathNotFound, handleServerErrors, handleCustomErrors, handleBadRequest, handleIdNotFound} = require("./errors")
const app = express()
const {getAllTopics} = require("./controllers/topics.controller")
const {getAllArticles, getArticleById, getCommentsById, addCommentById, updateArticleById, deleteCommentById} = require("./controllers/articles.controller")
const {getAllUsers} = require("./controllers/users.controller")
const cors = require('cors');

app.use(cors());
app.use(express.json())
app.use("/api",express.static('public'))
app.get("/api/topics",getAllTopics)
app.get("/api/articles",getAllArticles)
app.get("/api/users",getAllUsers)
app.get("/api/articles/:article_id", getArticleById)
app.get("/api/articles/:article_id/comments", getCommentsById)
app.post("/api/articles/:article_id/comments", addCommentById)
app.patch("/api/articles/:article_id", updateArticleById)
app.delete("/api/comments/:comment_id",deleteCommentById)
app.use(handlePathNotFound)
app.use(handleCustomErrors)
app.use(handleBadRequest)
app.use(handleIdNotFound)
app.use(handleTopicNotFound)
app.use(handleServerErrors)
module.exports = app