const{fetchAllArticles,fetchArticleById } = require("../models/articles.models")

const getAllArticles = (req, res)=>{
    fetchAllArticles().then((articles)=>{
        res.status(200).send({articles})
    })

}
const getArticleById = (req, res)=> {
    const {article_id} = req.params
    fetchArticleById(article_id).then((articles)=>{
        res.status(200).send({article : articles[0]})
    })
}

module.exports = {getAllArticles, getArticleById}