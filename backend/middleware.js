const JWT_SECRET = require('./config');
const jwt = require('jsonwebtoken');

const authMiddleware =(req,res,next)=>{
    const authHeader = req.headers.authorization;
    
    
    if(!authHeader || !authHeader.startsWith('Bearer ') || (authHeader.split(' ')[1]=="")){
        
        return res.status(400).json({
            success:false,
            message:"authHeader not found ,user need to signup"
        });
    }
    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token,JWT_SECRET);
        if(decoded.userId){
            req.userId = decoded.userId;
        next();
        }
        else {
            return res.status(403).json({
                message:"invalid token"
            })
        }
    }catch (err){

        return res.status(401).json({
            message:"something went wrong while authentication"
        });

    }
}

module.exports = {authMiddleware};

