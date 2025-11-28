const format = require("pg-format")
function insertTopics(data){
   const rows = data.map((data)=>{
        return Object.values(data)
    })

    const insertionQuery =  format(`INSERT INTO topics(description, slug, img_url)VALUES %L`,rows);
  
    return insertionQuery
}


function insertUsers(data){
   const rows = data.map((data)=>{
        return Object.values(data)
    })
    const insertionQuery =  format(`INSERT INTO users(username, name, avatar_url)VALUES %L`,rows);
    return insertionQuery
}
function insertArticles(data){
   const rows = data.map((data)=>{
        return Object.values(data)
    })

    const insertionQuery =  format(`INSERT INTO articles(title, topic, author, body, created_at, votes, article_img_url)VALUES %L RETURNING *`,rows);
    return insertionQuery
}

function createLookUp(array, key1, key2){
    const lookUpObj ={}

    if(array.length === 0){
        return lookUpObj
    }
    for(let i = 0 ; i < array.length ; i++){
    const objKey = array[i][key1]
    const objValue = array[i][key2]

    lookUpObj[objKey]= objValue
    }
    return lookUpObj
}
 function insertComments(){
  

}

  

module.exports = {insertTopics, insertUsers, insertArticles, insertComments, createLookUp}
