"use client"

import { useRouter } from 'next/navigation'
import React from 'react'

const HomePage = () => {
  const router = useRouter();

  const handleClick = () =>{
    router.push("/posts")
  }

  const handleClickVehicle = () =>{
    router.push("/vehicles")
  }
  return (
    <div>This is the homepage
      <button className='border-2 bg-green-400 p-4' onClick={handleClick}>Go to posts</button>
         <button className='border-2 bg-green-400 p-4' onClick={handleClickVehicle}>Go to vehicles</button>

    </div>
  )
}

export default HomePage