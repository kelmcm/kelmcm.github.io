import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import CV from "./pages/CV";
import NotFound from "./pages/NotFound";
import "./App.css";

const SITE = {
  name: "Kelly McManus",
  domain: "kellymcmanus.ca",
  email: "kmcmanus1939@comcast.net",
  github: "https://github.com/kelmcm",
  linkedin: "https://www.linkedin.com/in/kellymcm/",
  resume: `${process.env.PUBLIC_URL}/CV.pdf`
};

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home site={SITE} />} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/blogs/:slug" element={<BlogDetail />} />
            <Route path="/cv" element={<CV resumeUrl={SITE.resume} />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
