const isAdmin = (req,res,next) => {
  if (!req.user) {
        return res.status(401).json({ message: "User not authenticated" });
    }

    if (req.user.role !== "admin") {
        return res.json({ message: "Access denied: Admins only" });
    } 
    
    next()
}

export {isAdmin}