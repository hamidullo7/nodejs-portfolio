module.exports = function(req, res, next) {
    if(!req.user.isAdmin){
        return res.status(400).send("So'rovingiz bekor qilinadi!")
    }

    next();
}