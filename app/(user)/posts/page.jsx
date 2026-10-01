'use client'

import { useRouter } from 'next/navigation';
import { getProducts, deleteProduct } from '../../lib/api';
import React, { useState, useEffect } from 'react'

const PostPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState(null); //Add a state to track which product is being deleted, next to your other useState calls:
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState('none');
  const [department, setDepartment] = useState('all'); // Add a state for department filter


  const router = useRouter();

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data.result ?? []);
      } catch (err) {
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gray-50'>
        {/* <div className='h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-green-500' /> */}
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

  if (products.length === 0) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gray-50'>
        <p className='text-gray-500'>No products found.</p>
      </div>
    );
  }

  const handleClick = () => {
    router.push("/posts/create-products");
  }

  const handleEditbutton = (id) => {
    router.push(`posts/edit-products/${id}/`)
  }
  const handleDeleteButton = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    setDeletingId(id); // Set the deletingId to the product being deleted

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((item) => item.id !== id));

    } catch (err) {
      setError(err.message || 'Failed to delete product');
    } finally {
      setDeletingId(null); // Reset the deletingId after deletion attempt
    }
  }

  const departments = [...new Set(products.map((item) => item.department).filter(Boolean))]; // Get unique departments from products
  const filteredProducts = products.filter((item) => {
    const matchesSearch = item.productName?.toLowerCase().includes(search.toLowerCase());
    const matchesDepartment = department === 'all' || item.department === department;
    return matchesSearch && matchesDepartment;
  })//For Searching Products by name, you can filter the products based on the search state. This will create a new array of products that match the search query.

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (order === 'asc') return Number(a.price) - Number(b.price);
    if (order === 'desc') return Number(b.price) - Number(a.price);
    return 0;
  })

  // console.log(products.map((p) => [p.price, typeof p.price, Number(p.price)]));
  return (
    <div className='min-h-screen bg-gray-50 px-4 py-10'>
      <div className='relative flex-1 '>

        <input type='text' placeholder='Search products...' value={search} className="border border-black mb-4 p-2" onChange={(e) => setSearch(e.target.value)} />
        <select value={order} onChange={(e) => setOrder(e.target.value)} className="border border-black mb-4 p-2 ml-4">
          <option value="none">Sort by Price</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className='rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200'
        >
          <option value='all'>All departments</option>
          {departments.map((dep) => (
            <option key={dep} value={dep}>{dep}</option>
          ))}
        </select>

      </div>

      <div className='mx-auto max-w-6xl'>
        <button onClick={handleClick} className='border bg-green-400 text-white w-xs p-4'>Add new Products</button>
        <div className='mb-8'>
          <h1 className='text-3xl font-semibold text-gray-900'>Products</h1>
          <p className='mt-1 text-sm text-gray-500'>{products.length} items available</p>
        </div>

        <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {sortedProducts.map((item, index) => (
            <div
              key={item.id ?? index}
              className='flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg'
            >
              <span className='w-fit rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700'>
                {item.department}
              </span>

              <h2 className='mt-4 text-lg font-semibold text-gray-900'>
                {item.productName}
              </h2>

              <p className='mt-2 flex-1 text-sm leading-relaxed text-gray-500'>
                {item.productDescription}
              </p>

              <div className='mt-6 flex items-center justify-between border-t border-gray-100 pt-4'>
                <span className='text-xl font-bold text-gray-900'>${item.price}</span>
                <span className='text-xs text-gray-400'>{item.product}</span>
              </div>
              <button
                type="button"
                onClick={() => handleEditbutton(item.id)}
                className="inline-flex items-center mb-4 justify-center rounded-md bg-yellow-400 px-5 py-2 text-sm font-medium text-gray-900 shadow-sm transition hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Edit
              </button>

              <button
                type="button"
                disabled={deletingId === item.id}
                onClick={() => handleDeleteButton(item.id)}
                className="inline-flex items-center justify-center rounded-md bg-red-400 px-5 py-2 text-sm font-medium text-gray-900 shadow-sm transition hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Delete
              </button>
            </div>
          ))}


        </div>
      </div>
    </div>
  );
};

export default PostPage