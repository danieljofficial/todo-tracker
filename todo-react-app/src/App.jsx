import { useState, useContext } from 'react'
import { ThemeContext } from './Context/ThemeContext'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import './App.css'
import List from './Components/List';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { Link } from 'react-router-dom';
import { useLogout } from './Hooks/useLogout';
import { useAuthContext } from './Hooks/useAuthContext';


function App() {
    const [theme, setTheme] = useState(true)
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const toggleTheme = () => {
        setTheme(!theme)
    }
    const handleLogout = () => {
        logout()
    }
    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            <BrowserRouter>
            <div className="mainBody" id={theme ? "dark" : "light"}>
                <nav className="navbar">
                    <div className="auth">
                        {user && ( 
                            <div className='loggedIn'>
                                <span>{user.userName}</span>
                                <button className="logoutButton" onClick={handleLogout}>Logout</button>
                            </div>
                        )}

                        {!user && (
                            <div className='loggedOut'>
                                <div className='loginLink'>
                                    <Link to="/login">Login</Link>
                                </div>

                                <div to='signupLink'>
                                    <Link to="/signup">Signup</Link>
                                </div>
                            </div>
                        )}              
                    </div>    
                    <section>
                       <div className="todo">
                            <Link to='/'>TODO</Link>
                        </div>
                        <button className="toggleTheme" onClick={toggleTheme}>
                            <img src={theme ? "../src/assets/icon-sun.svg" : "../src/assets/icon-moon.svg"} alt={theme ? "light-mode" : "dark-mode"} id='toggleLight' />
                        </button> 
                    </section>      
                </nav>
                <Routes>
                    <Route 
                        path="/"
                        element={user ? <List /> : <Navigate to='/login'/>}
                    />
                    <Route 
                        path="/login"
                        element={!user ? <Login /> : <Navigate to='/'/>}
                    />
                    <Route 
                        path="/signup"
                        element={!user ? <Signup /> : <Navigate to='/'/>}
                    />
                </Routes>
            </div>
            </BrowserRouter>
        </ThemeContext.Provider>
    )
}

export default App
