import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import  axios from 'axios';

function RegisterPage() {
    
    const [data,setData]=useState({name:'',email:'',password:''})

    //send registration data
    async function registerUser(e){
        e.preventDefault()
        console.log(data);
        try{
            await axios.post('/register',{
                header:{"content-type":"application/json"},
                data
            })
            alert('Regestration succesful. Now you can log in')
        }
        catch(err){
            alert('Regestration failed.Please try again later')
        }
        
    }
    return (
        <div className='mt-4 grow flex items-center justify-around'>
            <div className=' mb-64'>
                <h1 className=' text-4xl text-center mb-4'>Register</h1>
                <form className=' max-w-md mx-auto' onSubmit={registerUser}>
                    <input type="text" placeholder='John Doe' value={data.name} onChange={(e) => { setData({...data,name:e.target.value}) }} />
                    <input type="email" placeholder='your@email.com' value={data.email} onChange={(e) => { setData({...data,email:e.target.value}) }} />
                    <input type="password" placeholder='password' value={data.password} onChange={(e) =>  { setData({...data,password:e.target.value}) }} />
                    <button className='primary'>Register</button>
                    <div className=' text-center py-2 text-gray-500'>Already a member
                        <Link to='/login' className='underline text-blue-600'>
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage