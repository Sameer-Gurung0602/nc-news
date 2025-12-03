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

})

describe("/api/articles",()=>{
    test("GET returns 200 and responds with correctly formatted objects",()=>{
        return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({body})=>{
                expect(body.articles).not.toBe(0)
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