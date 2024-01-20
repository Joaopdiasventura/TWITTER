import { BrowserRouter, Route, Routes } from "react-router-dom";
import Enter from "./pages/enter/Enter";
import Post from "./pages/post/Post";
import Profile from "./pages/profile/Profile";
import AProfile from "./pages/Aprofile/Profile";
import Search from "./pages/search/Search";
import Start from "./pages/start/Start";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/enter" element={<Enter />} />
        <Route path="/post" element={<Post />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/another" element={<AProfile />} />
        <Route path="/search" element={<Search />} />
        <Route path="/start" element={<Start />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;