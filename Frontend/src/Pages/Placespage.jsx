import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaPlus } from "react-icons/fa6";
import { FaFileUpload } from "react-icons/fa";

function Placespage() {

  //getting params from redirecting
  const { action } = useParams();
  return (
    <div>
      {action !== 'new ' && (
        <div className=" text-center">
          <Link className='  inline-flex items-center justify-evenly gap-2 bg-primary text-white py-2 m-2 px-8 rounded-full' to={'/account/places/new'}><FaPlus /> Add new Place</Link>
        </div>
      )}
      {
        action === 'new' && <form>
          <h2 className=' tetx-2xl mt-4'>Title</h2>
          <p className=' text-gray-500 text-sm'>Title for your place.</p>
          <input type="text" placeholder='title, for example: My lovely apt' />
          <h2 className=' text-2xl mt-4'>Address</h2>
          <p className=' text-gray-500 text-sm'>Address to this place.</p>
          <input type="text" placeholder='address' />
          <h2 className=' text-2xl mt-4'>Photos</h2>
          <p className=' text-gray-500 text-sm'>more= better</p>
          <div className=' flex gap-2 '>
            <input type="text" placeholder='Add using a link...'/>
            <button className=' bg-gray-200 grow px-4 rounded-2xl w-32'>Add Photo</button>
          </div>
          <div className=' mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
          <button className=' border bg-transparent rounded-2xl p-8 text-2xl flex items-center justify-evenly text-gray-600'><FaFileUpload className=' w-8 h-8'/>Upload</button>
          </div>
          <h2 className=' text-2xl mt-4'>Description</h2>
          <p className=' text-gray-500 text-sm'>description of the place</p>
          <textarea name="" id="" cols="30" rows="10"></textarea>
        </form>
      }
    </div>
  )
}

export default Placespage