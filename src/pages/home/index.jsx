import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts?_limit=10") 
      .then((res) => (setPosts(res.data), console.log(res.data)));
      
  }, []);

  return (
    <>
    <div>
      <h2>Lista de posts</h2>
      <ul>
            {posts.map((posts) => (
              <li key={posts.id}>
                <Link to= {`/detalhes/${posts.id}`}>{posts.title}</Link>
              </li>
          ))}
      </ul>
    </div>
    </>
  )
} 