import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import Home from "./views/Home/Home";
import Sidebar from './components/Sidebar/Sidebar'
import Profile from "./views/Profile/Profile";

function App() {
  const [Token, setToken] = useLocalStorage("token", "");
  if (Token === "") {
    return (
      <div className="App">
        <Routes>
          <Route path='/' exact element={<Navigate to='/Login' />} />
          <Route path='/Login' exact element={<Login />} />
          <Route path='/Register' exact element={<Register />} />
        </Routes>
      </div>
    );
  } else {
    return <div className="App">
      <Sidebar />
      <Routes>
        <Route path='/' exact element={<Navigate to='/Home' />} />
        <Route path='/Home' exact element={<Home />} />
        <Route path='/Register' exact element={<Register />} />
        <Route path='/Profile' exact element={<Profile />} />
      </Routes>
    </div>;
  }
}

export default App;
