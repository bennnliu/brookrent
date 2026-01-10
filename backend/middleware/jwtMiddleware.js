import jwt from 'jsonwebtoken';

const {JWT_SECRET} = process.env

const verifyToken = (req,res,next)=> {
    const token = req.cookies.jwtToken;

    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    //Verifes jwt token 
    try{
        req.user = jwt.verify(jwt_token, JWT_SECRET)
        next()
            
    }
    catch(e){
        if (e.name === 'TokenExpiredError') {
            return res.status(403).json({ message: "Token expired, please login again" });
        }
        return res.status(404).json({message: "Invalid token"})
    }
}

export {verifyToken};