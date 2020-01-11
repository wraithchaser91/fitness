checkAuthentication = (req, res, next) =>{
    console.log("checking");
    return next();
}

module.exports = {
    checkAuthentication: checkAuthentication
}