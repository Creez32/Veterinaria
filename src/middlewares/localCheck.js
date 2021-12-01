module.exports = (req,res,next)=>{
    if(req.session.userLogin){
        res.locals.user = req.session.userLogin;
    }
    next()
}