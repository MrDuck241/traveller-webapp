import { UserProvider } from "./components/UserContext";
import { HotelProvider } from "./components/HotelContext";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Hotel from './components/Hotel'
import Login from './components/Login'
import Register from './components/Register'
import UserDataPanel from './components/UserDataPanel'
import './App.css'

function App() {
  return (
    <HotelProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route path = "/" element = {<Home/>} />
            <Route path = "/see_hotel" element = {<Hotel/>} />
            <Route path = "/login" element = {<Login/>} />
            <Route path = "register" element = {<Register/>} />
            <Route path = "/user_data" element = {<UserDataPanel/>} />
          </Routes>
        </Router>
      </UserProvider>
    </HotelProvider>
  )
}

export default App
