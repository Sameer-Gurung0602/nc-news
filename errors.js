const handlePathNotFound = ( req, res) =>{
    res.status(404).send({msg:"Path not found"})
}
const handleCustomErrors = (err, req, res, next)=>{
    if(err.status && err.msg){
    res.status(err.status).send({msg:err.msg})}
    else{
        next(err)
    }
}

const handleBadRequest = (err, req, res, next)=>{
    if(err.code === "22P02"){
        res.status(400).send({msg:"Bad Request"})
    }else next(err)
}

const handleServerErrors = (err, req, res, next)=>{
    res.status(500).send({msg:"Internal Server Error"})
}


module.exports = {handlePathNotFound, handleCustomErrors, handleBadRequest, handleServerErrors}