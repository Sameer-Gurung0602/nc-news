const express = require("express");
const app = express()
const {getAllTopics} = require("./controllers/topics.controller")
const {getAllArticles} = require("./controllers/articles.controller")
app.get("/api/topics",getAllTopics)
app.get("/api/articles",getAllArticles)

module.exports = app