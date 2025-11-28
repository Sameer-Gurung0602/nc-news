const db = require("./connection")
// const runSeed = require("./seeds/run-seed")
// runSeed()
function getAllUsers(){
    return db.query(`SELECT username, name FROM users;`)
    .then((result)=>console.log(result.rows))
    .catch((err)=>{console.log(err)})
}

function getCodingArticles(){
    return db.query(`SELECT * FROM articles WHERE topic = 'coding'`)
    .then((result)=> console.log("coding articles\n",result.rows))
    .catch((err)=> console.log(err))
}
function getNegativeComments(){
    return db.query(`SELECT * FROM comments WHERE votes < 0`)
    .then((result)=> console.log("Negative Comments\n",result.rows))
    .catch((err)=> console.log(err))
}
function getAllTopics(){
    return db.query(`SELECT * FROM topics`)
    .then((result)=> console.log("All topics\n",result.rows))
    .catch((err)=> console.log(err))
}
function getAllArticlesByUser(user){
    return db.query(`SELECT * FROM articles WHERE author = '${user}'`)
    .then((result)=> console.log("All Articles By author\n",result.rows))
    .catch((err)=> console.log(err))
}
function getCommentsMoreThanTen(){
     return db.query(`SELECT * FROM comments WHERE votes >10`)
    .then((result)=> 
        
        console.log("comments more than ten\n",result.rows))
    .catch((err)=> console.log(err))
}
getAllUsers()
getCodingArticles()
getNegativeComments()
getAllTopics()
getAllArticlesByUser('grumpy19')
getCommentsMoreThanTen()

