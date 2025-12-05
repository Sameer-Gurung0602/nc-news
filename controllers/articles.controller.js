const{fetchAllArticles,fetchArticleById , fetchCommentsById ,insertCommentsById} = require("../models/articles.models")

const getAllArticles = (req, res)=>{
    fetchAllArticles().then((articles)=>{
        res.status(200).send({articles})
    })

}
const getArticleById = (req, res, next)=> {
   
    const {article_id} = req.params
    fetchArticleById(article_id).then((articles)=>{
        res.status(200).send({article : articles[0]})
    }).catch((err)=>{
        next(err)
    })
   
}

const getCommentsById = (req, res, next)=>{
    const {article_id} = req.params

     fetchCommentsById(article_id).then((comments)=> {
            res.status(200).send({comments})

    }).catch((err)=>{
        console.log(err)
        next(err)
    })

}

module.exports = {getAllArticles, getArticleById, getCommentsById}