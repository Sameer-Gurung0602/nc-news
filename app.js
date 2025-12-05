const express = require("express");
const {handlePathNotFound, handleServerErrors, handleCustomErrors, handleBadRequest} = require("./errors")
const app = express()
const {getAllTopics} = require("./controllers/topics.controller")
const {getAllArticles, getArticleById, getCommentsById, addCommentById} = require("./controllers/articles.controller")
const {getAllUsers} = require("./controllers/users.controller")
app.use(express.json())
app.get("/api/topics",getAllTopics)
app.get("/api/articles",getAllArticles)
app.get("/api/users",getAllUsers)
app.get("/api/articles/:article_id", getArticleById)
app.get("/api/articles/:article_id/comments", getCommentsById)


app.use(handlePathNotFound)
app.use(handleCustomErrors)
app.use(handleBadRequest)
app.use(handleServerErrors)
module.exports = app