const{fetchAllUsers} = require("../models/users.model")

const getAllUsers = (req, res)=>{
    fetchAllUsers()
    .then((users)=>{
        res.status(200).send({users}) 
    })
}

module.exports = {getAllUsers}