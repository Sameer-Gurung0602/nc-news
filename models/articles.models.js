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



module.exports = {fetchAllArticles}