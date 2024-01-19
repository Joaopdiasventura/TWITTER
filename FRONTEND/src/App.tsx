import { BrowserRouter, Route, Routes } from "react-router-dom";
import Enter from "./pages/enter/Enter";
import Post from "./pages/post/Post";
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/enter" element={<Enter />} />
        <Route path="/post" element={<Post />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;