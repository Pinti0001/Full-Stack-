
import jwt from 'jsonwebtoken'
import userModels from '../models/userModels.mjs';
import { MY_SECRET_KEY } from '../const.mjs';

async function userAuth (req, res, next) {

    // This function is to authenticate the user
    // will check the user token here

    try {
        const token = req.header('user_auth_token')
        if (!token){
            return res.status(401).send({ 
                status: false, 
                message: "TOKEN_NOT_FOUND" 
            });
        }
        // verifying the token with the same secret key that we had used to create the token
        // after verfying the token we will get the details of user that we have stored while creating the token
        const decodedTokenData = jwt.verify(token,MY_SECRET_KEY)
        // decodedTokenData is the object of user deails that we have stored while creating the token
        const {
            exp = '',
            iat = '',
            userId = ''
        } = decodedTokenData || {}

        if(!userId){
            return res.status(401).send({ 
                status: false, 
                message: "INVALID_TOKEN_CONTENT" 
            });
        }
        // checking if the user exist with the userId that we have stored in token
        const userDetails = await userModels.findOne({ _id: userId, isDeleted: false })
        // no user found === authentication failed/ failed to identofy the user
        if(!userDetails){
            return res.status(403).send({ 
                status: false, 
                message: "UNAUTHORISED_USER" 
            })
        }

        const currentTimestamp = Math.floor(Date.now() / 1000);
        // checking the token exiry time
        if (exp && exp < currentTimestamp) {
            return res.status(401).send({
                status: false,
                message: "TOKEN_EXPIRED"
            });
        }
        // if every thing id good then we will send the user details get from token to next function st key called user
        req.user = decodedTokenData
        next()
    }
    catch (exception) {
        res.status(401).send({ status: false, message: "INVALID_TOKEN" });
    }
}

export {
    userAuth
}