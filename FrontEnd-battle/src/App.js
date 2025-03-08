import "./App.css";
import { useEffect } from "react";
import Body from "./components/Body";
import ChallangeEditor from "./components/ChallangeEditor";
import Explore from "./components/Explore";
import IDE from "./components/IDE";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import LocomotiveScroll from "locomotive-scroll";
import Quiz from "./components/Quiz";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Nextpage from "./components/Nextpage";
function App() {
  useEffect(() => {
    /* eslint-disable */
    const scroll = new LocomotiveScroll({
      smooth: true,
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="main">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/IDE" element={<IDE />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="//explore/editor" element={<ChallangeEditor />} />
          <Route path="/HTMLquiz" element={<Quiz />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/nextpage" element={<Nextpage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
