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