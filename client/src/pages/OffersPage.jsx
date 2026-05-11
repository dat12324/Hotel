import React, { useEffect, useState } from 'react'

const OffersPage = () => {

  const [offers, setOffers] = useState([])

  useEffect(() => {

    const fetchOffers = async () => {

      try {

        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/offers`
        )

        const data = await res.json()

        setOffers(data)

      } catch (error) {

        console.log(error)
      }
    }

    fetchOffers()

  }, [])

  return (

    <div className='px-6 md:px-16 lg:px-24 py-16 min-h-screen bg-gray-50'>

      <h1 className='text-4xl font-bold mb-10'>
        Tất cả ưu đãi
      </h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>

        {offers.map((item) => (

          <div
            key={item._id}
            className='bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition'
          >

            <div className='relative h-64'>

              <img
                src={item.image}
                alt={item.title}
                className='w-full h-full object-cover'
              />

              <div className='absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm'>
                {item.priceOff}% OFF
              </div>

            </div>

            <div className='p-6'>

              <h2 className='text-2xl font-bold mb-2'>
                {item.title}
              </h2>

              <p className='text-gray-600'>
                {item.description}
              </p>

              <p className='text-sm text-gray-500 mt-4'>
                Hết hạn: {item.expiryDate}
              </p>

              <button className='mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition'>
                Nhận ưu đãi
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}

export default OffersPage