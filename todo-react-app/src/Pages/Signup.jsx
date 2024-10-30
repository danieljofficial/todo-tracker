import React, { useState } from 'react'
import { useSignup } from '../Hooks/useSignup'
import { Link } from 'react-router-dom'

function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')
    const {signup, isLoading, error} = useSignup()
    const handleSubmit = async (e) => {
        e.preventDefault()
       await signup(userName, email, password)
    }
    
    return (
        <form className='signupForm' onSubmit={handleSubmit}>
            <div className="formContent">
                <h2 className='formHeader'>Signup</h2>

                <div>
                    <label htmlFor="name"></label>
                    <input 
                        type="text" 
                        onChange={e => setUserName(e.target.value)}
                        value={userName}
                        placeholder="Username"  
                        required
                    />
                    <i className='bx bx-user'></i>
                </div>

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
                        placeholder="Password"  
                        required
                    />
                    <i className='bx bx-lock-alt' ></i>
                </div>
                
                <button disabled={isLoading} >
                    {!isLoading ? 'Signup' : (
                        <svg>
                            <circle cx="10" cy="10" r="10"></circle>
                        </svg>
                    )}
                </button>

                <div className='formFooter'>Have an account? <Link to={'/login'}>Login</Link> </div>
                {error && <div className='error'>{error}</div>}
            </div>
        </form>
    )
    }

export default Signup