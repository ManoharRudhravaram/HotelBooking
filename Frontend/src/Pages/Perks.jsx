import React from 'react'
import { FaWifi } from "react-icons/fa";
import { FaCar } from "react-icons/fa";
import { PiTelevision } from "react-icons/pi";
import { MdOutlinePets } from "react-icons/md";
import { GiCryptEntrance } from "react-icons/gi";
import { FaRadio } from "react-icons/fa6";

function Perks({selected,onChange}) {
  function handleCbClick(e){
    const {checked,name}=e.target;
    if(checked){
      onChange([...selected,name])
    }
    else{
      onChange([...selected.filter(selectedName=>selectedName!==name)])
    }
  }

  return (
    <>
         <label className=' border p-4 flex rounded-2xl items-center  gap-1 pointer'>
                  <input type="checkbox" name="Wifi"  onChange={handleCbClick}/>
                  <FaWifi />
                  <span>Wifi</span>
                </label>
                <label className=' border p-4 flex rounded-2xl items-center  gap-1 pointer'>
                  <input type="checkbox" name="Parking"  onChange={handleCbClick}/>
                  <FaCar />
                  <span>Free Parking Spot</span>
                </label>
                <label className=' border p-4 flex rounded-2xl items-center  gap-1 pointer'>
                  <input type="checkbox" name="TV"  onChange={handleCbClick}/>
                  <PiTelevision />
                  <span>TV</span>
                </label>
                <label className=' border p-4 flex rounded-2xl items-center  gap-1 pointer'>
                  <input type="checkbox" name="Radio"  onChange={handleCbClick}/>
                  <FaRadio />
                  <span>Radio</span>
                </label>
                <label className=' border p-4 flex rounded-2xl items-center  gap-1 pointer'>
                  <input type="checkbox" name="Pets"  onChange={handleCbClick}/>
                  <MdOutlinePets />
                  <span>Pets</span> 
                </label>
                <label className=' border p-4 flex rounded-2xl items-center gap-1 pointer'>
                  <input type="checkbox" name="Entrance" onChange={handleCbClick} />
                  <GiCryptEntrance />
                  <span>Private Entrance</span>
                </label>
    </>
  )
}

export default Perks