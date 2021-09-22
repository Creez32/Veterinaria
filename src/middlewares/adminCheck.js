
module.exports = (req,res,next)=>{
    if(req.session.userLogin){
        if (req.session.userLogin.admin === 1){
            return next()
        }
    }
    res.redirect('/')
}