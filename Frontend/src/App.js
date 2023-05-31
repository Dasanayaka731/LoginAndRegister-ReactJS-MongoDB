import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route exact path="/" Component={Login} />
          <Route exact path="/home" Component={Home} />
          <Route exact path="/register" Component={Register} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
