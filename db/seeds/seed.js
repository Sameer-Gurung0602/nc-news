const db = require("../connection")
const { topicData, userData, articleData, commentData } = require("../data/development-data")
const {insertTopics, insertUsers, insertArticles, createLookUp} = require("./utils.js")
const format = require("pg-format")

//Topics- Does not reference other tables
//Users- Does not reference other tables
//Articles - topic, references slug in topics table, author references username in users
//Comments- references article id in articles , author references username in users
//Drop comments first,
// const format = require("pg-format")

// insertArticles(articleData)
// insertComments(commentData)
const seed = ({ topicData, userData, articleData, commentData }) => {
  return db.query(`DROP TABLE IF EXISTS comments;
      DROP TABLE IF EXISTS emoji_article_user;
      DROP TABLE IF EXISTS articles;
      DROP TABLE IF EXISTS emojis;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS topics;`)
  .then(()=>{
  return db.query(
      `CREATE TABLE topics(
      slug VARCHAR(200) PRIMARY KEY,
      description VARCHAR(200) NOT NULL,
      img_url VARCHAR(1000),
      UNIQUE(slug)
      );
  `)})

  .then(()=>{ 
    return db.query(
      `CREATE TABLE users(
      username VARCHAR(200)PRIMARY KEY,
      name VARCHAR(200) NOT NULL,
      avatar_url VARCHAR(1000),
      UNIQUE(username)
      );
  `)
  })
  .then(()=>{
    return db.query(
      `CREATE TABLE emojis(
      emoji_id INT PRIMARY KEY,
      EMOJI VARCHAR(200) NOT NULL);`
    )
  })
  .then(()=>{ 
    return db.query(
      `CREATE TABLE articles(
      article_id SERIAL PRIMARY KEY,
      title VARCHAR(200) NOT NULL,
      topic VARCHAR(200) NOT NULL REFERENCES topics(slug),
      author VARCHAR(200) NOT NULL REFERENCES users(username),
      body TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      votes INT DEFAULT 0,
      article_img_url VARCHAR(1000)

  );
   `)})
  .then(()=>{ 
    return db.query(
      `CREATE TABLE emoji_article_user(
      emoji_article_user_id SERIAL PRIMARY KEY,
      emoji_id INT REFERENCES emojis(emoji_id),
      username VARCHAR(200) REFERENCES users(username) ON DELETE CASCADE ON UPDATE CASCADE,
      article_id INT REFERENCES articles(article_id)
      );`
    )
  })
  .then(()=> {      
    return db.query(
      `CREATE TABLE comments(
      comment_id SERIAL PRIMARY KEY,
      article_id INT REFERENCES articles(article_id) ON DELETE CASCADE ON UPDATE CASCADE,
      body TEXT,
      votes INT DEFAULT 0,
      author VARCHAR(200) REFERENCES users(username) ON DELETE CASCADE ON UPDATE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  `)})
       
  .then(()=>{
    const topicQuery = insertTopics(topicData)
    return db.query(topicQuery)
  })
  .then(()=> {
    return db.query(insertUsers(userData))
  })
  .then(()=>{
    return db.query(insertArticles(articleData))
  })
  .then((data)=>{
    
    const articlesRef = createLookUp(data.rows, "title", "article_id")
    
    const dataWithIds = commentData.map(comment =>{
      const newComment = Object.assign({article_id : articlesRef[comment.article_title]}, comment)//spread operator
      delete newComment.article_title
      return newComment
    })
    const rows = dataWithIds.map((data)=>{
    return Object.values(data)
    })
    
    const insertionQuery =  format(`INSERT INTO comments(article_id, body, votes, author, created_at)VALUES %L RETURNING *`,rows);
    return db.query(insertionQuery)
  })

  
  
}

   
      
      module.exports = seed;
