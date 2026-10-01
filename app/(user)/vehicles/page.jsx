'use client'

import { useRouter } from 'next/navigation';
import { getVehicles, deleteVehicle } from '../../lib/api';
import { useState, useEffect } from 'react'

import React from 'react'

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(null);
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState('none');



  const router = useRouter();

  useEffect(() =>{
    async function fetchVehicles(){
      try{
        const data = await getVehicles();
        setVehicles(data.result ?? []);
      }catch(err){
        setError(err.message || 'Failed to load vehicles');
      }finally{
        setLoading(false);
      }
    }
    fetchVehicles();
  },[])

  const handleEditButton = (id) =>{
    router.push(`/vehicles/edit-vehicles/${id}`);
  }

  

  const handleAddVehicle = () =>{
    router.push("/vehicles/create-vehicles");
  }

  const handleDeleteButton = async(id) =>{
    setDeleting(id);

    try{
      await deleteVehicle(id);
      setVehicles((prev) => prev.filter((item) => item.id !==id));
    }catch(err){
      setError(err.message || 'Failed to delete vehicle');
    }finally{
      setDeleting(null);
    }
  }


    if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gray-50'>
        <div className='h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-green-500' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gray-50 px-4'>
        <p className='rounded-lg bg-red-50 px-6 py-4 text-sm text-red-600'>{error}</p>
      </div>
    );
  }

  if (vehicles.length === 0) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gray-50'>
        <p className='text-gray-500'>No vehicles found.</p>
      </div>
    );
  }

  const filteredVehicles = vehicles.filter((item) =>
  item.vehicle.toLowerCase().includes(search.toLowerCase()))

  const sortedVehicles = [...filteredVehicles].sort((a,b) =>{
    if(order ==="asc") return Number(a.price) - Number(b.price);
    if(order ==="desc") return Number(b.price) - Number(a.price);
    return 0;
  })


  return (
    <div>
      <div className='relative flex-1'>

      <input type='text' placeholder='Search products...' value={search} className="border border-black" onChange={(e) => setSearch(e.target.value)} />
      <select
  value={order}
  onChange={(e) => setOrder(e.target.value)}
  className='rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200'
>
  <option value='none'>Sort by price</option>
  <option value='asc'>Price: Low to High</option>
  <option value='desc'>Price: High to Low</option>
</select>

  </div>
      <button onClick={handleAddVehicle} className="inline-flex items-center justify-center rounded-md bg-blue-500 px-5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60">
        Add Vehicle
      </button>
       <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {filteredVehicles.map((item, index) => (
            <div
              key={item.id ?? index}
              className='flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg'
            >
              <span className='w-fit rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700'>
                {item.vin}
              </span>

              <h2 className='mt-4 text-lg font-semibold text-gray-900'>
                {item.vehicle}
              </h2>

              <p className='mt-2 flex-1 text-sm leading-relaxed text-gray-500'>
                {item.type}
              </p>

              <div className='mt-6 flex items-center justify-between border-t border-gray-100 pt-4'>
                <span className='text-xl font-bold text-gray-900'>{item.color}</span>
                <span className='text-xs text-gray-400'>{item.model}</span>
              </div>
              <button
                type="button"
                onClick={() => handleEditButton(item.id)}
                className="inline-flex items-center mb-4 justify-center rounded-md bg-yellow-400 px-5 py-2 text-sm font-medium text-gray-900 shadow-sm transition hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Edit
              </button>

               <button
                type="button"
                  disabled={deleting === item.id}
                onClick={() => handleDeleteButton(item.id)}
                className="inline-flex items-center justify-center rounded-md bg-red-400 px-5 py-2 text-sm font-medium text-gray-900 shadow-sm transition hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Delete
              </button>
            </div>
          ))}


        </div>
    </div>
  )
}

export default VehiclesPage