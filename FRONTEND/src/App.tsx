import { BrowserRouter, Route, Routes } from "react-router-dom";
import Enter from "./pages/enter/Enter";
import Post from "./pages/post/Post";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/enter" element={<Enter />} />
        <Route path="/post" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;