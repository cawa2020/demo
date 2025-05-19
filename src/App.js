import "./App.css";
import {
  HashRouter as Router,
  Routes,
  Route,
  useRoutes,
  useNavigate,
} from "react-router";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Header from "./Header";
import Main from "./routes/Main";
import ViewApp from "./routes/ViewApp";
import CreateApp from "./routes/CreateApp";
import Admin from "./routes/Admin";

function App() {
  return (
    <Router>
      <div className="App">
        <Header></Header>
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/app" element={<ViewApp />} />
            <Route path="/create-app" element={<CreateApp />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/" element={<Main />} />
          </Routes>
        </main>
        <footer></footer>
      </div>
    </Router>
  );
}

export default App;
