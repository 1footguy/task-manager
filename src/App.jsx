import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import { AuthProvider } from './context/Auth';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

function App() {

  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </>
  )
}

export default App
