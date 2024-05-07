import userModels from "../models/userModels.mjs";
import {userSignInService, userSignUpService, createPostService, getPostsService} from '../services/userService.mjs'
import validator from "validator";

const userSignUp = async (req,res)=>{
    
    const activity = 'User SignUp'    

    try {
        
        const {
            name = '',
            email = '',
            password = '',
            mobile = ''
        } = req.body || {}

        // validate all the fields
        if(!validator.isMobilePhone(mobile, 'en-IN')){
            return res.status(400).send({
                status : false,
                message : 'Mobile is mandatory and should be valid indian mobile'
            })
        }

        if(!validator.isAlpha(name.replace(/\s/g, ''))){
            return res.status(400).send({
                status : false,
                message : "Name is mandatory and should be valid alpha"
            })
        }


        if(!validator.isEmail(email)){
            return res.status(400).send({
                status : false,
                message : "Email is mandatory and should be valid email"
            })
        }
        if(!password?.trim()?.length){
            return res.status(400).send({
                status : false,
                message : "Password is mandatory"
            })
        }

        // controll to service function

        const response = await userSignUpService(req.body)

        const {
            status, code,
            token, data, message
        } = response 

        // sending the response
        res.status(code || 201).send({
            status, data, token, message
        })
    }
    catch(error) {
        console.log(`Error in ${activity} - ${error?.message || error}`)
        res.status(500).send({
            status : false,
            message : `Error in ${activity} - ${error?.message || error}`
        })
    }
}

const userSignIn = async (req,res) => {

    const activity = "User SignIn";

    try {
        const {
            email = '',
            password = ''
        } = req.body || {};

        // validating the user credentials
        if(!validator.isEmail(email)){
            return res.status(400).send({
                status : false,
                message : "Email is mandatory and should be valid email"
            })
        }
        if(!password?.trim()?.length){
            return res.status(400).send({
                status : false,
                message : "Password is mandatory"
            })
        }

        // calling the serviece function
        const response = await userSignInService(req.body);

        const {
            status, code, 
            message, token, data
        } = response 

        res.status(code || 200).send({
            status, data, message, token
        })

    } catch (error) {
        console.log(`Error in ${activity} - ${error?.message || error}`);
        res.status(500).send({
            status : false,
            message : `Error in ${activity} - ${error?.message || error}`
        })
    }
}

const createPost = async (req, res) => {

    const activity = "User Create Post";
    
    try {
        const {
            postDetails = []
        } = req.body || {}


        if(!title || !content || !author || !postImageLink){
            return res.status(400).send({
                status : false,
                message : 'All the fields are mandetory'
            })
        }
        if(postDetails?.length <=0){
            return res.status(400).send({
                status : false,
                message : 'There is nothing to create'
            })
        }

        const response = await createPostService(postDetails);

        const {
            status, code, 
            data
        } = response 

        res.status(code || 201).send({
            status ,
            data
        })

    } catch (error) {
        console.log(`Error in ${activity} - ${error?.message || error}`);
        res.status(500).send({
            status : false,
            message : `Error in ${activity} - ${error?.message || error}`
        })
    }
}

const getPosts = async (req, res) => {

    const activity = 'get posts'

    try {

        const response = await getPostsService()
        const {
            data,
            code, status
        } = response 

        res.status(code || 200).send({
            data, status
        })

    }
    catch(error){
        console.log(`Error in ${activity} - ${error?.message || error}`);
        res.status(500).send({
            status : false,
            message : `Error in ${activity} - ${error?.message || error}`
        })
    }
}

export {
    userSignUp, 
    userSignIn, 
    createPost,
    getPosts
}