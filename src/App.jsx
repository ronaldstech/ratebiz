import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import MyBusinesses from './pages/MyBusinesses'
import BusinessDetails from './pages/BusinessDetails'
import './App.css'

function App() {
    const location = useLocation();
    const isAuthPage = ['/login', '/signup'].includes(location.pathname);

    return (
        <div className="app-container">
            {!isAuthPage && <Navbar />}
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/my-businesses" element={<MyBusinesses />} />
                    <Route path="/business/:id" element={<BusinessDetails />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
            {!isAuthPage && <Footer />}
        </div>
    )
}

export default App
