import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from "./Components/Footer/Footer";
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/UNAUTHENTICATION/Home/Home';
import Login from "./Components/UNAUTHENTICATION/Login/Login";
import Register from "./Components/UNAUTHENTICATION/Register/Register";
import Hr_Login from "./Components/UNAUTHENTICATION/Hr_Login/Hr_Login";
import Contact from "./Components/UNAUTHENTICATION/Contact/Contact";
import Password_Reset from "./Components/UNAUTHENTICATION/Password_Reset/Password_Reset";
import Reset_Password from "./Components/UNAUTHENTICATION/Reset_Password/Reset_Password";
import Auth_Home from "./Components/AUTHENTICATION/Auth_Home/Auth_Home";

const App = () => {

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/hr_login' element={<Hr_Login />}></Route>
          <Route path='/password_reset' element={<Password_Reset />}></Route>
          <Route path='/reset_password' element={<Reset_Password />}></Route>
          <Route path='/auth_home' element={<Auth_Home />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </HelmetProvider>
  )
}

export default App;