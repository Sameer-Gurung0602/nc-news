#Link to the hosted version
- The link to the hosted version can be found at: https://nc-news-xnco.onrender.com/

#Project Summary
- The aim of this project is to build a reddit like application which allows for users to post comments, articles, and like articles/comments.

#Setup Instructions
- The repository can be cloned through running git clone with the repository link
- After this, you will have to install any neccesary dependencies by running npm init
- To seed the local databases and run tests, you will have to
 1. run npm run setup-dbs
 2. npm run seed-dev
- The test database will be reseeded before each test when you run jest

#ENV files
- In order to run test and development databases, you will need to add your own .env files.
- To do this, create two .env files : .env.development and .env.test in the root of your directory.
- Following this assign a PGDATABASE variable in each file with the name of your test and development databases.
- After adding these files, you should be able to connect to both databases locally.

