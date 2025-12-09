const db = require("../db/connection")
const format = require('pg-format')

const fetchAllArticles = (sort_by ="created_at", order = "DESC", topic)=>{
    const validSortInputs = ["created_at", "article_id", "title","topic", "body","votes", "article_img_url","comment_count"]
    const validOrderInputs = ["ASC", "DESC"]

    if(!validSortInputs.includes (sort_by)|| !validOrderInputs.includes (order)){
        return Promise.reject({status:404, msg: "Invalid Input"})
    }

    let sql = `SELECT articles.*, COUNT(comments.article_id) AS comment_count 
            FROM articles
            LEFT JOIN comments ON comments.article_id = articles.article_id `
    
    const values = []
     if(topic !== undefined){
        values.push(topic)
        sql += ` WHERE topic = $1`

    }
    return  db.query(`${sql} GROUP BY articles.article_id ORDER BY ${sort_by} ${order};`, values)
    .then(({rows})=>{
    return rows    
    })
}



const fetchArticleById = (id)=>{
    return db.query(`SELECT articles.*, COUNT(comments.article_id) AS comment_count 
            FROM articles
            LEFT JOIN comments ON comments.article_id = articles.article_id
            WHERE articles.article_id = $1
            GROUP BY articles.article_id
            ORDER BY created_at DESC;`,[id])
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

const insertCommentById = (data)=>{
    const myArr =[parseInt(data.article_id), data.body, data.author]
    const sql = format(`INSERT INTO comments (article_id, body, author) VALUES (%L) RETURNING *;`, myArr)
    
    return db.query(sql)
    .then(({rows})=>{
        return rows[0]
    })
}
const changeArticleById = (votes, id)=>{
    return db.query(`UPDATE articles SET votes = votes +$1 WHERE article_id = $2 RETURNING *;`, [votes, id])
    .then(({rows})=>{
            if(rows === undefined || rows.length === 0){
            return Promise.reject({
                status: 404,
                msg: `No comments for article_id:${id}` 
            })
        }
        return rows[0]
    })
}
const removeCommentById =(id)=>{
    return db.query(`DELETE FROM comments WHERE comment_id =$1 RETURNING *;`, [id])
    .then(({rows})=>{
        if(rows === undefined || rows.length === 0){
            return Promise.reject({
                status: 404,
                msg: `No comments for article_id:${id}` 
            })
        }       
        return rows[0]
    })
}



module.exports = { fetchAllArticles, fetchArticleById, fetchCommentsById, insertCommentById, changeArticleById, removeCommentById}