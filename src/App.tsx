import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./api/auth";
import Navbar from "./components/Navbar/navbar";
import Home from "./pages/Home";
import Search from "./pages/Search";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
