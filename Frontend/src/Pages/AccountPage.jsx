import React, { useContext, useState } from 'react'
import { UserContext } from '../Context/UserContext'
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Placespage from './Placespage';
import { FaUser } from "react-icons/fa";
import { PiListDashes } from "react-icons/pi";
import { FaBuilding } from "react-icons/fa";

function Account() {
  const [redirect,setRedirect]=useState(null);  //to redirect to main page
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams(); //to get dynamic path 

  //initial set to profile path
  if (subpage === undefined) {
    subpage = 'profile'
  }

  //logout function and redirecting to mian page
  async function logout(){
    await axios.post('/logout')
    setRedirect('/')
    setUser(null) 
  }

  //loading 
  if (!ready) {
    return 'Loading ... '
  }

  //redirect to login if user is not login
  if (ready && !user && !redirect) {
    return <Navigate to={'/login'}/>
  }

  //to set styling according to selection
  function linkClasses(type = null) {
    let classes = ' inline-flex items-center gap-1 py-2 px-6 rounded-full';
    if (type === subpage) {
      classes += ' bg-primary text-white rounded-full'
    }
    else{
      classes+= 'bg-gray-200'
    }
    return classes;
  }

  if(redirect){
    return <Navigate to={redirect}/>
  }
  return ( 
    <div>
      <nav className='w-full flex justify-center gap-2 mt-8'>
        <Link to={'/account/profile'} className={linkClasses('profile')}><FaUser />My Profile
        </Link>
        <Link to={'/account/bookings'} className={linkClasses('bookings')}><PiListDashes/>My Bookings
        </Link>
        <Link to={'/account/places'} className={linkClasses('places')}> <FaBuilding />My accomodations
        </Link>
      </nav>
      {subpage==='profile' && (
        <div className=' text-center max-w-lg mx-auto'>
          Logged in as {user.name}({user.email}) <br />
          <button className=' primary max-w-sm mt-2' onClick={logout}>Logout</button>
        </div>
      )}
      {subpage ==='places' && (
        <Placespage/>
      )}
    </div>
  )
}

export default Account