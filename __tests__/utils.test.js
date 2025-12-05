const {createLookUp} = require("../db/seeds/utils.js");
const {commentData,articleData} = require("../db/data/test-data/")
const db = require("../db/connection.js")
 describe("createLookUp",()=>{
    test ("returns an object",()=>{
        expect(typeof createLookUp([],"","")).toBe('object')
    
    })
 
    
    test ("When given an array with one object, returns the correct key value pair",()=>{
        const data = [
            {
            article_id: 1,
            title: 'Living in the shadow of a great man',
            article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
          }
        ]

        const result = createLookUp(data, 'title', 'article_id')
        expect(result).toEqual({ 'Living in the shadow of a great man': 1 })
    
    })
    test("When given an array with more than one object, returns correct key value pairs",()=>{
           const data = [
            {
            article_id: 1,
            title: 'Living in the shadow of a great man',
            article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
          },
          {
            article_id : 2,
            title : "sameer"
          }
        ]

        const result = createLookUp(data, 'title', 'article_id')
        expect(result).toEqual({ 'Living in the shadow of a great man': 1,
            "sameer":2
        },)
    
    })
    })
