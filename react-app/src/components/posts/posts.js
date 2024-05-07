import { Fragment, useEffect, useState } from "react";
import PostCard from "../../post-card/post-card";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Posts () {

    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate()

    const userAuthToken = localStorage.getItem('user_auth_token')
    // fetching the token from the local storage



    async function fetchData () {
        try {
            const postData = await axios.get(
                'http://localhost:8000/posts', 
                {
                    headers : {
                        user_auth_token : userAuthToken
                    }
                }
            )
            setPosts(postData?.data?.data)
            setIsLoading(false)
        }
        catch(error){
            console.error(error);
        }
    }



    useEffect(() => {

        //HOW TO AVAID USER TO GO TO THE POSTS PAGE MANUALLY WITH SIGN UP/ SIGN IN
        // checking if the token is present or not 
        // we will only have the token when user has signup/signin succcessfully
        /// if no token means user is manually changing the url to come to this page

        if(!userAuthToken){
            // if no token will not let him access the page 
            // we will send the user to sigup/signin screen
            navigate('/')
            return
        }

        // making api call to fetch the data if user has the token
        fetchData()

    },[])




    if(isLoading) {
        return (
            <div className="flex items-center justify-center h-screen" >
                Loading ... 
            </div>
        )
    }

    return (
        <div 
        className="flex flex-wrap gap-16 justify-center p-12"
        >
            {
                posts.map(postData => (
                    <PostCard data = {postData}/>
                ))
            }
        

        </div>
    )
}