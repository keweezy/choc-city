import {
  BrowserRouter as Router,
  Route,
  Routes,
  Redirect,
} from "react-router-dom";
import Albums from "./Pages/Homepage/Albums/Albums";
import HomePage from "./Pages/Homepage/HomePage";

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/albums/:id" exact element={<Albums />} />
      </Routes>
    </Router>
  );
};

export default Root;
