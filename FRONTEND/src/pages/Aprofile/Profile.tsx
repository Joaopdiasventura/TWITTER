import { useEffect, useState } from "react";
import { StyledContainer } from "./Css";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const app = axios.create({
  baseURL: "https://twitter-3y8z.onrender.com",
});

function AProfile() {
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState({});
  const navigate = useNavigate();

  const loadLikes = async (posts) => {
    const likesData = {};
    for (const post of posts) {
      const postLikes = (await app.get(`/likes/${post.id}`).then((result) => result.data));
      likesData[post.id] = postLikes;
    }
    setLikes(likesData);
  };

  useEffect(() => {
    const getProfile = async () => {
      const email = localStorage.getItem("oemail");
      if (!email) {
        navigate("/search");
        return;
      }
      const profile = await app.get(`/post/${email}`).then((result) => result.data);
      setUser(profile.user.name);
      setPosts(profile.posts);
      loadLikes(profile.posts);
      setTimeout(() => {
        localStorage.removeItem("oemail")
      }, 500);
    };

    getProfile();
  }, [navigate]);

  const Like = async (post) => {
    const token = localStorage.getItem("token");
    const result = await app.post("/decode", { token }).then((result) => result.data);
    const creator = result.email;
    await app.post("/like", {post, creator}).then(() => {
        loadLikes(posts);
    });
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
  
    const formatTwoDigits = (num) => String(num).padStart(2, '0');
  
    return `${formatTwoDigits(day)}/${formatTwoDigits(month)}/${year}`;
  };

  return (
    <StyledContainer>
      <div className="content">
      <nav>
          <Link to="/start">🏠</Link>
          <Link to="/enter">🌐</Link>
          <Link to="/search">🔬</Link>
          <Link to="/profile">⚪</Link>
          <Link to="/post">➕</Link>
        </nav>
        <h1>{user}</h1>
        <div className="posts">
          {posts.map((post) => (
            <div key={post.id} className="post">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <small>created at: {formatDate(post.createdat)}</small>
              <button onClick={() => Like(post.id)}>🖤 {likes[post.id] ? likes[post.id].length : 0}</button>
            </div>
          ))}
        </div>
      </div>
    </StyledContainer>
  );
}

export default AProfile;
