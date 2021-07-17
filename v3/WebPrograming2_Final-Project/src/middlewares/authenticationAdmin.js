const UserRepo = require('../repositories/User/UserRepo');

module.exports = function auth(req, res, next) {
    const { userID } = req.session;
    res.locals.currentUser = null;

    if(userID) {
        UserRepo.getByID(userID).then((user) => {
            if(user.permission_id == 1){
                req.currentUser = user;
                res.locals.currentUser = user;
                next();
            }
            else{
                res.redirect("/")
            }
        }).catch(next);
    }
    else
    {
        res.redirect("/")
    }
        
}