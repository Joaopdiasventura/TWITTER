import { useEffect, useState } from "react";
import { StyledContainer } from "./Css";
import axios from "axios";
import { Link } from "react-router-dom";

const app = axios.create({
  baseURL: "https://twitter-3y8z.onrender.com",
});

function Profile() {
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState({});

  const loadLikes = async () => {
    const likesData = {};
    const promises = posts.map(post => 
      app.get(`/likes/${post.id}`).then(result => {
        likesData[post.id] = result.data;
      })
    );

    await Promise.all(promises);
    setLikes(likesData);
  };

  const decodeToken = async () => {
    const token = localStorage.getItem("token");
    return app.post("/decode", { token }).then(result => result.data);
  };

  const getProfile = async () => {
    const { email } = await decodeToken();
    const profile = await app.get(`/post/${email}`).then(result => result.data);
    setUser(profile.user.name);
    setPosts(profile.posts);
    await loadLikes();
  };

  useEffect(() => {
    getProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Like = async (postId) => {
    const { email } = await decodeToken();
    await app.post("/like", { post: postId, creator: email });
    await loadLikes();
  };

  const Delete = async (postId) => {
    await app.delete(`/post/${postId}`);
    await getProfile();
  };

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
          <Link to="/post">➕</Link>
        </nav>
        <h1>{user}</h1>
        <div className="posts">
          {posts.map(post => (
            <div key={post.id} className="post">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <small>created at: {formatDate(post.createdat)}</small>
              <button onClick={() => Like(post.id)}>🖤 {likes[post.id] ? likes[post.id].length : 0}</button>
              <button className="delete" onClick={() => Delete(post.id)}>🗑️</button>
            </div>
          ))}
        </div>
      </div>
    </StyledContainer>
  );
}

export default Profile;
