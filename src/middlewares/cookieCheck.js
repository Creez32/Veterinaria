module.exports = (req,res,next)=>{
    if(req.cookies.Veterinaria){
        req.session.userLogin = req.cookies.Veterinaria;
    }
    next()
}