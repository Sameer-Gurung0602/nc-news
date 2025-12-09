const db = require("../db/connection")
const seed = require("../db/seeds/seed")
const data = require("../db/data/test-data")
const request = require("supertest")
const app = require("../app")
beforeEach(()=> seed(data))

afterAll(()=> db.end())

describe("/api/topics",()=>{
    test("GET returns 200 and responds with correctly formatted objects",()=>{
        return request(app)
            .get("/api/topics")
            .expect(200)
            .then(({body})=>{
                expect(body.topics).not.toBe(0)
                body.topics.forEach((topic)=> {
                    expect(typeof topic.slug).toBe("string")
                    expect(typeof topic.description).toBe("string")
                })
            })
    })
    test("GET returns 404 when endpoint is non existent",()=>{
        return request(app)
        .get("/api/corner")
        .expect(404)
        .then(({body})=>{
            expect(body.msg).toBe("Path not found")
        })
    })

})

describe("/api/articles",()=>{
    test("GET returns 200 and responds with correctly formatted objects",()=>{
        return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({body})=>{
                expect(body.articles.length).not.toBe(0)
                body.articles.forEach((article)=> {
                    expect(typeof article.author).toBe("string")
                    expect(typeof article.title).toBe("string")
                    expect(typeof article.article_id).toBe("number")
                    expect(typeof article.topic).toBe("string")
                    expect(typeof article.created_at).toBe("string")
                    expect(typeof article.votes).toBe("number")
                    expect(typeof article.article_img_url).toBe("string")
                    expect(typeof article.comment_count).toBe("string")
                })
            })
    })
    test("GET request with id returns 200 and responds with a correctly formatted object",()=>{
        return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then(({body})=>{
                expect(typeof body.article.author).toBe("string")
                expect(typeof body.article.title).toBe("string")
                expect(typeof body.article.article_id).toBe("number")
                expect(typeof body.article.body).toBe("string")
                expect(typeof body.article.topic).toBe("string")
                expect(typeof body.article.created_at).toBe("string")
                expect(typeof body.article.votes).toBe("number")
                expect(typeof body.article.article_img_url).toBe("string")
                expect(typeof body.article.comment_count).toBe("string")

            })
        })
     test("GET request with id returns 200 and responds with a correctly formatted object",()=>{
        return request(app)
            .get("/api/articles/2")
            .expect(200)
            .then(({body})=>{
                expect(typeof body.article.author).toBe("string")
                expect(typeof body.article.title).toBe("string")
                expect( body.article.article_id).toBe(2)
                expect(typeof body.article.body).toBe("string")
                expect(typeof body.article.topic).toBe("string")
                expect(typeof body.article.created_at).toBe("string")
                expect(typeof body.article.votes).toBe("number")
                expect(typeof body.article.article_img_url).toBe("string")
                expect(typeof body.article.comment_count).toBe("string")

            })
        })
    test("GET request with a valid id that does not exist should return with a 404",()=>{
        return request(app)
            .get("/api/articles/9999")
            .expect(404)
            .then(({body})=>{
                expect(body.msg).toBe("No article found for article_id: 9999")
            })
    })
    test("GET request with an invalid id should return a 400", ()=>{
        return request(app)
        .get("/api/articles/cow")
        .expect(400)
        .then(({body})=>{
            expect(body.msg).toBe("Bad Request")
        })
    })
    test("GET request with id returns 200 and responds with a list of comments assosciated with that id", ()=>{
        return request(app)
            .get("/api/articles/1/comments")
            .expect(200)
            .then(({body})=>{
                expect(body.comments.length).not.toBe(0)
                body.comments.forEach((comment)=>{
                    expect(typeof comment.comment_id).toBe('number')
                    expect(typeof comment.votes).toBe("number")
                    expect(typeof comment.created_at).toBe("string")
                    expect(typeof comment.author).toBe("string")
                    expect(typeof comment.body).toBe("string")
                    expect( comment.article_id).toBe(1)
                    
                })
            })
    })

    //no comments assosciated with id
    test("GET request with a valid id that does not exist returns 404", ()=>{
        return request(app)
            .get("/api/articles/9999/comments")
            .expect(404)
            .then(({body})=>{
                expect(body.msg).toBe("No comments for article_id:9999")
            })
    })

    test("GET request with an invalid id  returns 400", ()=>{
        return request(app)
        .get("/api/articles/cow/comments")
        .expect(400)
        .then(({body})=>{
            expect(body.msg).toBe("Bad Request")
        })
    })
    test("GET request with id returns 200 and responds with a list of comments ORDERED BY the most recent comments first",()=>{
        return request(app)
            .get("/api/articles/1/comments")
            .expect(200)
            .then(({body})=>{
                expect(body.comments).toBeSortedBy('created_at',{
                    descending: true,
                    
                })
            })  
    })
    test("POST request returns 201 and correctly formatted comment", ()=>{
        return request(app)
            .post("/api/articles/2/comments")
            .send({  
        "article_id": 2,
        "body": "I love Cake",
        "author": "icellusedkars"
    })
            .expect(201)
            .then(({body})=>{
                const {comment} = body
                expect(typeof comment.author).toBe("string")
                expect(typeof comment.body).toBe("string")
            })
    })
    test("POST request returns 404 when invoked with a valid non-existent id", () =>{
        return request(app)
            .post("/api/articles/2000/comments")
            .send({  
        "article_id": 2000,
        "body": "I love Cakesss",
        "author": "icellusedkars"
    })
            .expect(404)
            .then(({body})=>{
                expect(body.msg).toBe("File not found.")
            })

    })
    test("POST request returns 400 when invoked with a invalid id", ()=>{
            return request(app)
            .post("/api/articles/cows/comments")
            .send({  
        "article_id": "cows",
        "body": "I love Cakesss",
        "author": "icellusedkars"
    })
            .expect(400)
            .then(({body})=>{
                expect(body.msg).toBe("Bad Request")
            })

    })
    test("PATCH request returns 200 and correctly formated article object", ()=>{
        return request(app)
            .patch("/api/articles/1")
            .send({inc_votes : 99999})
            .expect(200)
            .then(({body})=>{
                const {article} = body
                expect(typeof article.author).toBe("string")
                expect(typeof article.title).toBe("string")
                expect(typeof article.article_id).toBe("number")
                expect(typeof article.body).toBe("string")
                expect(typeof article.topic).toBe("string")
                expect(typeof article.created_at).toBe("string")
                expect(typeof article.votes).toBe("number")
                expect(typeof article.article_img_url).toBe("string")
            })
    })
    test("PATCH request returns 404 when invoked with a valid non-existent id",()=>{
         return request(app)
            .patch("/api/articles/9999")
            .send({"inc_votes" : 99999})
            .expect(404)
            .then(({body})=>{
                expect(body.msg).toBe("No comments for article_id:9999")
            })

    })
    test("PATCH request returns 400 when invoked with a invalid id",()=>{
         return request(app)
            .patch("/api/articles/cows")
            .send({"inc_votes" : 99999})
            .expect(400)
            .then(({body})=>{
                expect(body.msg).toBe("Bad Request")
            })

    })

    test("DELETE request returns 204 when invoked with a valid id",()=>{
        return request(app)
            .delete("/api/comments/2")
            .expect(204)
            .then(({body})=>{
                expect(body).toEqual({})
            })
    })

    test("DELETE request with a non-existent valid id returns 404",()=>{
        return request(app)
            .delete("/api/comments/9999")
            .expect(404)
            .then(({body})=>{
                expect(body.msg).toEqual("No comments for article_id:9999")
            })
    })
    test("DELETE request with a non-existent invalid id returns 400",()=>{
        return request(app)
            .delete("/api/comments/cows")
            .expect(400)
            .then(({body})=>{
                expect(body.msg).toEqual("Bad Request")
            })
    })
    test("GET request returns 200 and is sorted by articleid and ordered asc", ()=>{
        return request(app)
            .get("/api/articles?sort_by=article_id&order=ASC")
            .expect(200)
            .then(({body})=>{
                expect(body.articles.length).not.toBe(0)
                body.articles.forEach((article)=>{
                expect(typeof article.author).toBe("string")
                expect(typeof article.title).toBe("string")
                expect(typeof article.article_id).toBe("number")
                expect(typeof article.body).toBe("string")
                expect(typeof article.topic).toBe("string")
                expect(typeof article.created_at).toBe("string")
                expect(typeof article.votes).toBe("number")
                expect(typeof article.article_img_url).toBe("string")
                
                })
                expect(body.articles).toBeSortedBy('article_id',{
                descending: false,
                
                })
            })
    })

    //test order by itself
    test("200- order query by itself works, default sort is by date", ()=>{
        return request(app)
        .get("/api/articles?order=ASC")
        .expect(200)
        .then(({body})=>{
            expect(body.articles).toBeSortedBy('created_at',{
                    descending: false
            })
        })
    })
    //test sort by by itself
     test("200- sort_by query by itself works, default order is desc", ()=>{
        return request(app)
        .get("/api/articles?sort_by=article_id")
        .expect(200)
        .then(({body})=>{
            expect(body.articles).toBeSortedBy('article_id',{
                    descending: true
            })
        })
    })
    // test all three tgt
    test("200- sort_by query by itself works, default order is desc", ()=>{
        return request(app)
        .get("/api/articles?sort_by=article_id&order=DESC&topic=mitch")
        .expect(200)
        .then(({body})=>{
            expect(body.articles.length).not.toBe(0);
            expect(body.articles).toBeSortedBy('article_id',{
                    descending: true
            })
            body.articles.forEach((article)=>{
                expect(article.topic).toBe('mitch')
            })
        })
    })
    test("GET request returns 200 and articles sorted by topic",()=>{
        return request(app)
        .get("/api/articles?topic=mitch")
        .expect(200)
        .then(({body})=>{
            expect(body.articles.length).not.toBe(0)
            body.articles.forEach((article)=>{
                expect(typeof article.author).toBe("string")
                expect(typeof article.title).toBe("string")
                expect(typeof article.article_id).toBe("number")
                expect(typeof article.body).toBe("string")
                expect(article.topic).toBe("mitch")
                expect(typeof article.created_at).toBe("string")
                expect(typeof article.votes).toBe("number")
                expect(typeof article.article_img_url).toBe("string")
            })
        })
    })
    test("GET request with invalid queries returns 404",()=>{
      return request(app)
          .get("/api/articles?sort_by=asad&order=opqowd")
          .expect(404)
          .then(({body})=>{
              expect(body.msg).toEqual("Invalid Input")
          })
  })
      test("GET request with one invalid query returns 404",()=>{
      return request(app)
          .get("/api/articles?sort_by=asad&order=ASC")
          .expect(404)
          .then(({body})=>{
              expect(body.msg).toEqual("Invalid Input")
          })
  })
    test("Get request with bad query returns 404", ()=>{
        request(app)
            .get("/api/articles?topic=ronaldo")
            .expect(404)
            .then(({body})=>{
                expect(body.msg).toBe("Invalid Input")
            })
        })
    test("Get request with bad query returns 404", ()=>{
        request(app)
            .get("/api/articles?topic=speed")
            .expect(404)
            .then(({body})=>{
                expect(body.msg).toBe("Invalid Input")
            })
        })
    })
        



describe("/api/users",()=>{
    test("GET returns 200 and responds with correctly formatted objects",()=>{
        return request(app)
            .get("/api/users")
            .expect(200)
            .then(({body})=>{
                expect(body.users).not.toBe(0)
                body.users.forEach((user)=> {
                    expect(typeof user.username).toBe("string")
                    expect(typeof user.name).toBe("string")
                    expect(typeof user.avatar_url).toBe("string")
                })
            })
    })

})