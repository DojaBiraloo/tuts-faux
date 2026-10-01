'use client'

import React, { useEffect } from 'react'
import { useState } from 'react'
import { editVehicles, getVehicle } from '../../../../lib/api';
import { useParams, useRouter } from 'next/navigation';

const EditVehiclePage = () => {
    const [vehicle, setVehicle] = useState('');
    const [color, setColor] = useState('');
    const [model, setModel] = useState('');
    const [type, setType] = useState('');
    const [vin, setVin] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    // const [success, setSuccess] = useState(false);

    const { id } = useParams();
    const router = useRouter();

    useEffect(() =>{
        getVehicle(id)
        .then((data) =>{
              const result = data.result ?? data;
      const item = Array.isArray(result) ? result[0] : result; //Array ma halnu parxa result lie
            // console.log(item)
            setVehicle(item.vehicle ?? '');
            setColor(item.color ?? '');
            setModel(item.model ?? '');
            setType(item.type ?? '');
            setVin(item.vin ?? '');
        }).catch((err) =>{
            setError(err.message || 'Failed to fetch vehicle data');
        })
    },[id]);

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setLoading(true);
        setError('');

        try{
         
             await editVehicles(id, {vehicle, vin, color, model, type})
            // setSuccess(true);
            router.push('/vehicles');
        }catch(err){
            setError('Failed to edit vehicle. Please try again.');
        }finally{
            setLoading(false);
        }
    }
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
  <form
    onSubmit={handleSubmit}
    className="w-full max-w-lg bg-white rounded-xl shadow-md p-6 space-y-5"
  >
    <h2 className="text-xl font-semibold text-gray-800">Edit Vehicle</h2>

    <div className="space-y-1">
      <label htmlFor="vehicle" className="block text-sm font-medium text-gray-700">
        Vehicle Name
      </label>
      <input
        id="vehicle"
        type="text"
        value={vehicle}
        // placeholder="e.g. MClaren"
        onChange={(e) => setVehicle(e.target.value)}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
      />
    </div>

    <div className="space-y-1">
      <label htmlFor="color" className="block text-sm font-medium text-gray-700">
        Color
      </label>
      <input
        id="color"
        type="text"
        value={color}
        placeholder="e.g. Red"
        onChange={(e) => setColor(e.target.value)}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
      />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-1">
        <label htmlFor="model" className="block text-sm font-medium text-gray-700">
          Model
        </label>
        <input
          id="model"
          type="text"
          value={model}
          placeholder="e.g. Sedan"
          onChange={(e) => setModel(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
          Type
        </label>
        <input
          id="type"
          type="text"
          value={type}
          placeholder="e.g. Electronics"
          onChange={(e) => setType(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
      </div>
    </div>

    <div className="space-y-1">
      <label htmlFor="vin" className="block text-sm font-medium text-gray-700">
        Vin
      </label>
      <input
        id="vin"
        type="text"
        value={vin}
        placeholder="e.g. ABC123"
        onChange={(e) => setVin(e.target.value)}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
      />
    </div>

    {error && (
      <p className="rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-600">
        {error}
      </p>
    )}

    <button
      type="submit"
      disabled={loading}
      className="w-full rounded-md bg-green-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? "Submitting..." : "Submit"}
    </button>
  </form>
</div>
  )
}

export default EditVehiclePage