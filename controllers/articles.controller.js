const{fetchAllArticles,fetchArticleById , fetchCommentsById ,insertCommentById, changeArticleById, removeCommentById} = require("../models/articles.models")

const getAllArticles = (req, res)=>{
    const{sort_by, order, topic} = req.query


    return fetchAllArticles(sort_by, order, topic).then((articles)=>{
        res.status(200).send({articles})
    })

}
const getArticleById = (req, res, next)=> {
   
    const {article_id} = req.params
    return fetchArticleById(article_id).then((articles)=>{
        res.status(200).send({article : articles[0]})
    })
   
}

const getCommentsById = (req, res, next)=>{
    const {article_id} = req.params

     return fetchCommentsById(article_id).then((comments)=> {
            res.status(200).send({comments})

    })

}
const addCommentById =(req, res)=>{
    const data = req.body
    return insertCommentById(data).then((comment)=>{
        
        res.status(201).send({comment})
    })
}
const updateArticleById =( req, res)=>{
    const {inc_votes} = req.body
    const {article_id} = req.params
    return changeArticleById(inc_votes, article_id).then((article)=>{
        res.status(200).send({article})
    })
}

const deleteCommentById = (req,res)=>{
    const {comment_id} = req.params

    return removeCommentById(comment_id).then((comment)=>{
        res.status(204).send({comment})
    })
}

module.exports = {getAllArticles, getArticleById, getCommentsById,addCommentById, updateArticleById, deleteCommentById}