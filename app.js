const express = require("express");
const app = express()
const {getAllTopics} = require("./controllers/topics.controller")
const {getAllArticles, getArticleById} = require("./controllers/articles.controller")
const {getAllUsers} = require("./controllers/users.controller")
app.get("/api/topics",getAllTopics)
app.get("/api/articles",getAllArticles)
app.get("/api/users",getAllUsers)
app.get("/api/articles/:article_id", getArticleById)
module.exports = app