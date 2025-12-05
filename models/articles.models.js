const db = require("../db/connection")


const fetchAllArticles = ()=>{

    return  db.query(`SELECT articles.*, COUNT(comments.article_id) AS comment_count 
            FROM articles
            LEFT JOIN comments ON comments.article_id = articles.article_id
            GROUP BY articles.article_id 
            ORDER BY articles.created_at`)
    .then(({rows})=>{
    return rows    
    })
}
const fetchArticleById = (id)=>{
    return db.query(`SELECT * FROM articles WHERE article_id = $1`,[id])
    .then(({rows})=>{
        const article = rows[0]
        if(!article){
            return Promise.reject({
                status:404,
                msg: `No article found for article_id: ${id}`
            })
        }
        return rows
    })
}

const fetchCommentsById = (id)=>{
    return db.query('SELECT * FROM comments WHERE article_id =$1 ORDER BY created_at DESC', [id])
    .then(({rows})=>{
        const comments = rows
        if(comments.length === 0){
            return Promise.reject({
                status: 404,
                msg: `No comments for article_id:${id}` 
            })
        }
        return rows
    })
}





module.exports = {fetchAllArticles, fetchArticleById, fetchCommentsById  }