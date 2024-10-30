import React, { useState } from 'react'
import { useLogin } from '../Hooks/useLogin'
import { Link } from 'react-router-dom'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()
    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)
    }
    
    return (
        <form className='loginForm' onSubmit={handleSubmit}>
            <div className="formContent">
                <h2 className='formHeader'>Login</h2>

                <div>
                    <label htmlFor="email"></label>
                    <input 
                        type="text" 
                        onChange={e => setEmail(e.target.value)}
                        value={email} 
                        placeholder="Email"  
                        required
                    />
                    <i className='bx bx-envelope' ></i>
                </div>

                <div>
                    <label htmlFor="password"></label>
                    <input 
                        type="password" 
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        placeholder='Password'    
                        required
                    /> 
                    <i className='bx bx-lock-alt' ></i>
                </div>

                <button disabled={isLoading} >
                    {!isLoading ? 'Login' : (
                        <svg>
                            <circle cx="10" cy="10" r="10"></circle>
                        </svg>
                    )}
                </button>

                <div className='formFooter'>Dont have an account? <Link to={'/signup'}>Signup</Link> </div>
                {error && <div className='error'>{error}</div>}
            </div>
        </form>
    )
    }

export default Login