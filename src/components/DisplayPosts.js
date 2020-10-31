import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

function DisplayPosts() {

const [posts,setPosts] = useState([]);

useEffect(() =>{
    axios.get('http://localhost:8080/api/posts')
    // axios.get('https://jsonplaceholder.typicode.com/posts')
    .then((result) =>{
        console.log(result)
        // setPosts(result.data)
    })
    .catch(err =>{
        console.log(err)
    })
        
},[])
    return (
        <div className="question-list">

            <div className='row'>

                <div className='card'>
                    <div>
                        <span>Phillip</span>
                        <p>2 days ago</p>
                        <div className='card-body'>
                            <h3>How old are you?</h3>
                            <p>
                                <Link to='#' className='likes'>Likes</Link>
                                <>|</>
                                <Link to='#' className='comment'>Comment</Link>
                            </p>
                        </div>
                    </div>
                    <button>Delete</button>
                </div>
            </div>
            <ul>
                {posts.map(post =>(
                    <li key={post._id}>{post}</li>
                ))}
            </ul>

        </div>
    )
}

export default DisplayPosts
