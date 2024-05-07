import userModels from "../models/userModels.mjs"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { MY_SECRET_KEY } from "../const.mjs";
import postModels from "../models/postModels.mjs";


//  FUNCTION TO CREATE THE JSW

function getJwtToken (userId) {

    const payload = {
        userId
    };
    
    const token = jwt.sign(payload, MY_SECRET_KEY, { expiresIn: '1h' });
    return token;
}


// USER SIGNUP FUNCTION


const userSignUpService = async (userData) => {

    // user will come with the some data
    // we have kept the eamil as uniqe
    // so before creating the user we will check if the there is any existing user with same email or not

    const existingUser = await userModels.findOne({
        email : userData.email,
        isDeleted : false
    })

    if(existingUser){
        return {
            code : 400,
            status : false,
            message : 'User already exists'
        }
    }


    // salt for hashing
    const salt = await bcrypt.genSalt();

    //hashing the password
    const hashedPasword = await bcrypt.hash(userData.password, salt)

    // creating the new user
    const data = await userModels.create({
        ...userData,
        password : hashedPasword
    })
    // some how if user creating failed
    if(!data){
        return {
            status : false,
            code : 400,
            message : 'Fialed to create the user'
        }
    }
    const token = getJwtToken(data._id)
    return {
        status : true,
        code : 201,
        data : data,
        token : token
    }

}

const userSignInService = async (userData) => {
    

        // checking if the user exists with the given email or not
        const existingUser = await userModels.findOne({
            email : userData.email,
            isDeleted : false
        })
        
        if(!existingUser){
            return {
                code : 404,
                message : 'User not found, Please Signup',
                status : false
            }
        }

        // matching the user password and hashed password from db data of user matched with the email
        const isPasswordMatched = await bcrypt.compare(
            userData.password, existingUser.password
        )

        if(!isPasswordMatched){
            return {
                status : false,
                message : 'Invalid Credentials',
                code : 400
            }
        }
        
        const token = getJwtToken(existingUser._id)

        return {
            status : true,
            code : 200,
            data : existingUser,
            token : token
        }
}

const createPostService = async (postDetails) => {
    const createdPost = await postModels.insertMany(postDetails)
    return {
        status : true,
        code : 201,
        data : createdPost
    }
}

const getPostsService = async () =>  {
    const data = await postModels.find()
    return {
        status : true,
        code : 200,
        data : data
    }

}


export {
    userSignUpService,
    userSignInService,
    createPostService,
    getPostsService
}