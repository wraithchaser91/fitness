const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("./models/User");

function init(passport){
    const authenticateUser = async (username, password, done) =>{
        const user = await getUserByName(username);
        if(user == null){
            return done(null, false, {message:"no user with that name"});
        }
        try{
            console.log(user);
            if(await bcrypt.compare(password, user.password)){
                return done(null, user);
            }else{
                return done(null, false, {message:"Password incorrect"});
            }
        }catch(e){
            console.log("ERROR:"+e);
            return done(e);
        }
    }
    passport.use(new LocalStrategy({},authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async(id, done) => {
        try{
            let user = await getUserById(id);
            return done(null, user);
        }catch{
            return done(null, null);
        }
        
    });
}

getUserByName = async name =>{
    try{
        const user =  await User.findOne({username: name}).exec();
        return user;
    }catch{
        console.log("Failed to find user by name");
        return null;
    }
}

getUserById = async id =>{
    try{
        const user =  await User.findById(id);
        console.log("user found");
        return user;
    }catch{
        console.log("Failed to find user by name");
        return null;
    }
}

module.exports = init;