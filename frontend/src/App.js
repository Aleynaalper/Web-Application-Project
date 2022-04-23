import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import User from './components/User/User';
import Authentication from './components/Authentication/Authentication';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import Profile from './components/Profile/Profile';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route exact path="/" element={<Login/>}></Route>
          {/* <Route exact path="/users/:userId" element={<User/>}></Route> */}
          <Route exact path="/auth"  element={localStorage.getItem("currentUser") != null ?<Navigate to="/"/> : <Authentication/>}> </Route>
          <Route exact path="/home" element={<Home/>}></Route>
          <Route exact path="/register" element={<Register/>}></Route>
          <Route exact path="/users/:userId" element={<Profile/>}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
