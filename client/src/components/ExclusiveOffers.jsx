import React, { useEffect, useState } from 'react'
import Title from './Title'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'


const ExclusiveOffers = () => {

  const [offers, setOffers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {

    const fetchOffers = async () => {

      try {

        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/offers`
        )

        if (!res.ok) {
          throw new Error('Không thể tải ưu đãi')
        }

        const data = await res.json()

        setOffers(data)

      } catch (err) {

        setError(err.message)

      } finally {

        setLoading(false)
      }
    }

    fetchOffers()

  }, [])

  if (loading) {
    return (
      <p className="text-center mt-20 font-medium">
        Đang tải ưu đãi...
      </p>
    )
  }

  if (error) {
    return (
      <p className="text-center mt-20 text-red-500">
        {error}
      </p>
    )
  }

  return (

    <div className='px-6 md:px-16 lg:px-24 xl:px-32 py-20'>

      {/* HEADER */}

      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6'>

        <Title
          align='left'
          title='Ưu đãi độc quyền'
          subTitle='Khám phá những voucher hấp dẫn và ưu đãi giới hạn dành riêng cho bạn.'
        />

        <button
          onClick={() => navigate("/offers")}
          className='group flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-800 transition'
        >
          Xem thêm ưu đãi

          <img
            src={assets.arrowIcon}
            alt=""
            className='group-hover:translate-x-1 transition-all'
          />
        </button>
      </div>

      {/* OFFER LIST */}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-14'>

        {offers.slice(0, 3).map((item) => (

          <div
            key={item._id}
            className='relative rounded-3xl overflow-hidden shadow-lg group h-[420px]'
          >

            {/* BACKGROUND IMAGE */}

            <img
              src={item.image}
              alt={item.title}
              className='absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-500'
            />

            {/* OVERLAY */}

            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent'></div>

            {/* DISCOUNT */}

            <div className='absolute top-5 left-5 bg-white text-blue-600 px-4 py-2 rounded-full text-sm font-bold shadow'>
              {item.priceOff}% OFF
            </div>

            {/* CONTENT */}

            <div className='absolute bottom-0 p-6 text-white w-full'>

              <h2 className='text-2xl font-bold mb-2'>
                {item.title}
              </h2>

              <p className='text-sm text-gray-200 line-clamp-2'>
                {item.description}
              </p>

              <p className='text-xs text-gray-300 mt-4'>
                Hết hạn: {item.expiryDate}
              </p>

              <button
                onClick={() =>
                  navigate(`/offer/${item._id}`, {
                    state: { offer: item },
                  })
                }
                className='mt-5 flex items-center gap-2 bg-white text-black px-5 py-2 rounded-full font-semibold hover:bg-gray-200 transition'
              >
                Xem ưu đãi

                <img
                  src={assets.arrowIcon}
                  alt=""
                  className='w-4'
                />
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  )
}

export default ExclusiveOffers