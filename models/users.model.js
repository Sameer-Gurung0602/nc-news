const db = require("../db/connection")

const fetchAllUsers = ()=>{
    return db.query("SELECT * FROM users")
    .then(({rows})=>{
        console.log(rows)
        return rows
    })
}

module.exports = {fetchAllUsers}