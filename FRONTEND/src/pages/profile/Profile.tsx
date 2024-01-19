import { useEffect, useState } from "react";
import { StyledContainer } from "./Css";
import axios from "axios";

const app = axios.create({
  baseURL: "https://twitter-3y8z.onrender.com",
});

function Profile() {
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState({});

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
      const token = localStorage.getItem("token");
      const { email } = await app.post("/decode", { token }).then((result) => result.data);
      const profile = await app.get(`/post/${email}`).then((result) => result.data);
      setUser(profile.user.name);
      setPosts(profile.posts);
      loadLikes(profile.posts);
    };

    getProfile();
  }, []);

  const Like = async (post) => {
    const token = localStorage.getItem("token");
    const result = await app.post("/decode", { token }).then((result) => result.data);
    const creator = result.email;
    await app.post("/like", {post, creator}).then(() => {
        loadLikes(posts);
    });
  }

  return (
    <StyledContainer>
      <div className="content">
        <h1>{user}</h1>
        <div className="posts">
          {posts.map((post) => (
            <div key={post.id} className="post">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <small>created at: {post.createdat}</small>
              <button onClick={() => Like(post.id)}>🖤 {likes[post.id] ? likes[post.id].length : 0}</button>
            </div>
          ))}
        </div>
      </div>
    </StyledContainer>
  );
}

export default Profile;
