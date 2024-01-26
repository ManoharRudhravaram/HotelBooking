import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../Context/UserContext';

function LoginPage() {
    let [loginData, setLoginData] = useState({ email: '', password: '' })
    const [redirect, setRedirect] = useState(false);
    const { setUser } = useContext(UserContext);

    async function handleLoginSubmit(e) {
        e.preventDefault()
        try {
            const {data} = await axios.post('/login',
                {
                    header: { "content-type": "application/json" },
                    loginData
                })
                setUser(data);
            alert('login succcesful');

            setRedirect(true);
        }
        catch (err) {
            alert('login failed')
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }
    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className=' mb-64'>
                <h1 className=' text-4xl text-center mb-4'>Login</h1>
                <form className=' max-w-md mx-auto p-1' onSubmit={handleLoginSubmit}>
                    <input type="email" placeholder='your@email.com' value={loginData.email} onChange={(e) => { setLoginData({ ...loginData, email: e.target.value }) }} />
                    <input type="password" placeholder='password' value={loginData.password} onChange={(e) => { setLoginData({ ...loginData, password: e.target.value }) }} />
                    <button className='primary'>Login</button>
                    <div className=' text-center py-2 text-gray-500'>Don't have an account yet?
                        <Link to='/register' className='underline text-blue-600'>
                            Register now
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage