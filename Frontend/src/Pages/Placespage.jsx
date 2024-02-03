import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaPlus } from "react-icons/fa6";
import { FaFileUpload } from "react-icons/fa";
import Perks from './Perks';
import axios from 'axios';


function Placespage() {

  //getting params from redirecting
  const { action } = useParams();

  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [addedPhotos, setAddedPhotos] = useState([])
  const [photoLink, setPhotoLink] = useState('')
  const [perks, setPerks] = useState([])
  const [description, setDescription] = useState('')
  const [extraInfo, setExtraInfo] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [maxGuests, setMaxGuests] = useState(1)

  function inputHeader(text) {
    return (
      <h2 className=' tetx-2xl mt-4'>{text}</h2>
    )
  }

  function inputDescription(text) {
    return (
      <p className=' text-gray-500 text-sm'>{text}</p>
    )
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    )
  }

  async function addPhotoByLink(e) {
    e.preventDefault()
    console.log('lkjhg');
    const { data: fileName } = await axios.post('/upload-by-link', { link: photoLink })
    setAddedPhotos((prev) => {
      return [...prev, fileName];
    })
    setPhotoLink('')
  }

   function uploadPhoto(e) {
    const files = e.target.files;
    const data = new FormData();
    for (let i=0;i<files.length;i++) {
      data.append('photos', files[i]);
    }
   axios.post('/upload', data, {
      headers: { 'Content-type' : 'multipart/form-data' }
    }).then((res) => {
      const { data: fileNames } = res;
      setAddedPhotos((pre) => {
        return [...pre, ...fileNames]; 
      })
    })
  }
  console.log(addedPhotos);
  return (
    <div>
      {action !== 'new ' && (
        <div className=" text-center">
          <Link className='  inline-flex items-center justify-evenly gap-2 bg-primary text-white py-2 m-2 px-8 rounded-full' to={'/account/places/new'}><FaPlus /> Add new Place</Link>
        </div>
      )}
      {
        action === 'new' && (
          <div>
            <form>
              {preInput('Title', 'Title for your place.')}
              <input type="text" placeholder='title, for example: My lovely apt' value={title} onChange={(e) => { setTitle(e.target.value) }} />
              {preInput('Address', 'Address to this place.')}
              <input type="text" placeholder='address' value={address} onChange={(e) => { setAddress(e.target.value) }} />
              {preInput('Photos', 'more= better')}
              <div className=' flex gap-2 '>
                <input type="text" placeholder='Add using a link...' value={photoLink} onChange={(e) => { setPhotoLink(e.target.value) }} />
                <button className=' bg-gray-200 grow px-4 rounded-2xl w-32' onClick={addPhotoByLink}>Add Photo</button>
              </div>
              <div className=' mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                {
                  addedPhotos.length > 0 && addedPhotos.map((data, i) => {
                    return (
                      <div key={i} className=' f-32 flex'>
                        <img  src={'http://localhost:4000/uploads/' + data} className=' rounded-2xl w-full object-cover' alt="NA" />
                      </div>
                    )
                  })
                }
                <label className=' cursor-pointer border bg-transparent rounded-2xl p-8 text-2xl flex items-center justify-evenly text-gray-600'>
                  <input type="file" className='hidden' onChange={uploadPhoto} />
                  <FaFileUpload className=' w-8 h-8' />Upload</label>
              </div>
              {preInput('Description', 'description of the place')}
              <textarea value={description} onChange={(e) => { setDescription(e.target.value) }} />
              {preInput('Perks', 'select all the perks')}
              <div className=' grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2'>
                <Perks selected={perks} onChange={setPerks} />
              </div>
              {preInput('Extra info', 'house rules, etc')}
              <textarea value={extraInfo} onChange={(e) => { setExtraInfo(e.target.value) }} />
              {preInput('Check in&out times', 'add check in and out times, remember to have some time window forr cleaning the room between guests')}
              <div className=' grid sm:grid-cols-3 gap-2'>
                <div>
                  <h3 className=' mt-2 -mb-1'>Check in time</h3>
                  <input type="text" placeholder='14' value={checkIn} onChange={(e) => { setCheckIn(e.target.value) }} />
                </div>
                <div>
                  <h3 className=' mt-2 -mb-1'>Check out time</h3>
                  <input type="text" placeholder='11' value={checkOut} onChange={(e) => { setCheckOut(e.target.value) }} />
                </div>
                <div>
                  <h3 className=' mt-2 -mb-1'>Max number of guests</h3>
                  <input type="number" placeholder='1' value={maxGuests} onChange={(e) => { setMaxGuests(e.target.value) }} />
                </div>
              </div>
              <div>
                <button className='primary my-4'>Save</button>
              </div>
            </form>
          </div>
        )
      }
    </div>
  )
}

export default Placespage