checkAuthentication = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect("/");
    }
}

checkUnAuthenticated = (req, res, next) => {
    if(!req.isAuthenticated()){
        return next();
    }else{
        res.redirect("dashboard");
    }
}

module.exports = {
    checkAuthentication: checkAuthentication,
    checkUnAuthenticated: checkUnAuthenticated
}