import jwt from 'jsonwebtoken';

const {JWT_SECRET} = process.env

const verifyToken = (req,res,next)=> {
    const authHeader = req.headers.authorization;

    //Checks if auth is empty
    if (!authHeader) {
        return res.json({ message: "Missing Authorization header" });
    }

    //Removes "Bearer" string from token
    const jwt_token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

    //Verifes jwt token 
    try{
        req.user = jwt.verify(jwt_token, JWT_SECRET)
        next()
            
    }
    catch(e){
        console.error(e)
        return res.json({message: "Invalid token"})
    }
}

export {verifyToken};