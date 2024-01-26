import React, { useContext } from 'react'
import { SlMagnifier } from "react-icons/sl";
import { PiListDashes } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';

function Header() {
    //using context value
    const {user} = useContext(UserContext);
  return (
    <div>
        <header className='flex justify-between items-center'>
                <Link to={'/'} className=' flex items-center gap-1'>
                    <img src="https://img.freepik.com/free-vector/branding-identity-corporate-vector-logo-m-design_460848-8466.jpg?size=626&ext=jpg&ga=GA1.1.177842184.1705995886&semt=ais" alt="NA" className=' w-24' />
                    <span className=' text-xl text-amber-500 font-bold'>M-Company</span>
                </Link>
                <div className=' flex border border-gray-300 rounded-full py-2 px-4 justify-evenly w-80 items-center h-10 shadow-md shadow-gray-300'>
                    <div>Anywhere</div>
                    <div>|</div>
                    <div>Any week</div>
                    <div >|</div>
                    <div>Any guests</div>
                    <button className=' bg-primary text-white p-2 rounded-full'>
                        <SlMagnifier />
                    </button>
                </div>
                <Link to={user ? '/account':'/login'} className=' flex border border-gray-300 rounded-full py-2 px-4 justify-evenly items-center h-10 shadow-md shadow-gray-300 w-24 '>
                    <PiListDashes />
                    <div className='bg-gray-500 text-white rounded-full border border-gray p-1'>
                        <FaRegUser />
                    </div>
                    {!!user && (
                        <div>
                            {user.name}
                        </div>
                    )}
                </Link>
            </header>
    </div>
  )
}

export default Header