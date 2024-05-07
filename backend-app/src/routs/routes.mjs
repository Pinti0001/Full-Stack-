import express from 'express';
import { 
        createPost, 
        getPosts, 
        userSignIn, 
        userSignUp 
} from '../controllers/userControllers.mjs';
import { userAuth } from '../middlewares/auth.mjs';

const router = express.Router();

router.post('/signup', userSignUp);
router.post('/signin', userSignIn);
router.post('/post', userAuth, createPost)
router.get('/posts',userAuth, getPosts)

export default router;