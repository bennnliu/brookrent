import jwt from 'jsonwebtoken';

const {JWT_SECRET} = process.env

const verifyToken = (req,res,next)=> {
    const authHeader = req.headers.authorization;

    //Checks if auth is empty
    if (!authHeader) {
        return res.status(400).json({ message: "Missing Authorization header" });
    }

    //Removes "Bearer" string from token
    const jwt_token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

    //Verifes jwt token 
    try{
        req.user = jwt.verify(jwt_token, JWT_SECRET, (e, decoded) => {
            if(e.name === "TokenExpiredError"){
                return res.status(403).json({ message: "Token expired, please login again" });
            }
            req.user = decoded
            next()
        })
    }
    catch(e){
        return res.status(404).json({message: "Invalid token"})
    }
}

export {verifyToken};