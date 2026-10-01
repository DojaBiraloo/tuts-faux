'use client'

import { useRouter } from 'next/navigation';
import { createProduct } from '../../../lib/api';
import React, { useState } from 'react'

const CreatePage = () => {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [price, setPrice] = useState('');
    const [department, setDepartment] = useState('');
    const [product, setProduct] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [sucess, setSuccess] = useState(false)

    const router = useRouter();

    const handleProducts = async(e) =>{
      e.preventDefault();
      setLoading(true);
      setError('');

      try{
        await createProduct(productName, productDescription, price, department, product);
        setSuccess(true);
         router.push('/posts');
      }catch(err){
        setError(err);
      }finally{
        setLoading(false)
      }
    }

  

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
  <form
    onSubmit={handleProducts}
    className="w-full max-w-lg bg-white rounded-xl shadow-md p-6 space-y-5"
  >
    <h2 className="text-xl font-semibold text-gray-800">Add Product</h2>

    <div className="space-y-1">
      <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
        Product Name
      </label>
      <input
        id="productName"
        type="text"
        value={productName}
        placeholder="e.g. Wireless Mouse"
        onChange={(e) => setProductName(e.target.value)}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
      />
    </div>

    <div className="space-y-1">
      <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700">
        Description
      </label>
      <input
        id="productDescription"
        type="text"
        value={productDescription}
        placeholder="Short description"
        onChange={(e) => setProductDescription(e.target.value)}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
      />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-1">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">
          Price
        </label>
        <input
          id="price"
          type="number"
          min="0"
          step="0.01"
          value={price}
          placeholder="0.00"
          onChange={(e) => setPrice(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="department" className="block text-sm font-medium text-gray-700">
          Department
        </label>
        <input
          id="department"
          type="text"
          value={department}
          placeholder="e.g. Electronics"
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
      </div>
    </div>

    <div className="space-y-1">
      <label htmlFor="product" className="block text-sm font-medium text-gray-700">
        Product
      </label>
      <input
        id="product"
        type="text"
        value={product}
        placeholder="Product"
        onChange={(e) => setProduct(e.target.value)}
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

export default CreatePage