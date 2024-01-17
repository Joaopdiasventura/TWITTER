import { BrowserRouter, Route, Routes } from "react-router-dom";
import Enter from "./pages/enter/Enter";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/enter" element={<Enter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;