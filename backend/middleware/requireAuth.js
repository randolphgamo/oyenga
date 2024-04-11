import jwt from "jsonwebtoken";

const requireAuth = (req, res, next) => {
    

    //verify authentication
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "Authorization token required" });
    }

    const token = authorization.split(' ')[1];

    //verify token has not changed

    try {

        //verify token
        // if token is not valid then it will throw an error
        const { _id } = jwt.verify(token, process.env.SECRET);

        //attach user data to request
        req.user = { _id };

        next();

    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ error: "Request is not authorized" });
    }


}

export default requireAuth;