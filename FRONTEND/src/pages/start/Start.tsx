import { useEffect, useState } from "react";
import { StyledContainer } from "./Css";
import { Link } from "react-router-dom";
import axios from "axios";

const app = axios.create({
  baseURL: "https://twitter-3y8z.onrender.com",
});

function Start() {
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState({});

  const getAllposts = async () => {
    const posts = await app.get("/").then((result) => result.data);

    for (let i = 0; i < posts.length; i++) {
      posts[i].creator = await app
        .get(`/post/${posts[i].creator}`)
        .then((result) => result.data.user.name);
    }

    setPosts(posts);
    loadLikes();
  };

  useEffect(() => {
    getAllposts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formatTwoDigits = (num) => String(num).padStart(2, "0");

    return `${formatTwoDigits(day)}/${formatTwoDigits(month)}/${year}`;
  };

  const loadLikes = async () => {
    const likesData = {};
    const promises = posts.map((post) =>
      app.get(`/likes/${post.id}`).then((result) => {
        likesData[post.id] = result.data;
      })
    );

    await Promise.all(promises);
    setLikes(likesData);
  };

  const Like = async (postId) => {
    const { email } = await decodeToken();
    await app.post("/like", { post: postId, creator: email });
    await loadLikes();
  };

  const decodeToken = async () => {
    const token = localStorage.getItem("token");
    return app.post("/decode", { token }).then((result) => result.data);
  };

  return (
    <StyledContainer>
      <div className="content">
        <nav>
          <Link to="/enter">🌐</Link>
          <Link to="/search">🔬</Link>
          <Link to="/profile">⚪</Link>
          <Link to="/post">➕</Link>
        </nav>
        <h1>POSTS:</h1>
        <div className="posts">
          {posts.map((post) => (
            <div key={post.id} className="post">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <small>By: {post.creator}</small>
              <small>created at: {formatDate(post.createdat)}</small>
              <button onClick={() => Like(post.id)}>
                🖤 {likes[post.id] ? likes[post.id].length : 0}
              </button>
            </div>
          ))}
        </div>
      </div>
    </StyledContainer>
  );
}

export default Start;