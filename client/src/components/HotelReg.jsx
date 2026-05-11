import React, { useState } from 'react'
import { assets, cities } from '../assets/assets'
import { useAppContext } from '../context/AppContext'
import { toast } from 'react-hot-toast'

const HotelReg = () => {

    const {setShowHotelReg, axios, getToken, setIsOwner} = useAppContext();

    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [contact, setContact] = useState("")
    const [city, setCity] = useState("")

    const onSubmitHandler = async (event) => {
        try {
            event.preventDefault();

            const token = await getToken({ template: 'backend' });
            if (!token) {
                toast.error("Bạn cần đăng nhập để tiếp tục");
                return;
            }

            const {data} = await axios.post(`/api/hotels/`, {name, contact, address, city}, {
                headers: { Authorization: `Bearer ${token}` }
            })

            if(data.success){
                toast.success(data.message);
                setIsOwner(true);
                setShowHotelReg(false); 
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

  return (
    <div onClick={()=> setShowHotelReg(false)} className='fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center
    justify-center bg-black/70'>

        <form onSubmit={onSubmitHandler} onClick={(e)=> e.stopPropagation()} className='flex bg-white rounded-xl max-w-4xl mx-md:mx-2'>
            <img src={assets.regImage} alt="reg-image" 
            className='w-1/2 rounded-xl hidden md:block'/>
            <div className='relative flex flex-col items-center md:w-1/2 p-8 md:p-10'>
                <img src={assets.closeIcon} alt="close-icon"
                className='absolute top-4
                right-4 h-4 w-4 cursor-pointer' onClick={() => setShowHotelReg(false)}/>
                <p className='text-2xl font-semibold mt-6'>
                    Đăng ký khách sạn
                </p>
                {/* Hotel Name */}
                <div className='w-full mt-4'>
                    <label htmlFor="name" className='font-bold text-gray-500'>
                        Tên khách sạn
                    </label>
                    <input id='name' onChange={(e)=> setName(e.target.value)}
                    value={name} type="text" placeholder= "Nhập vào đây" className='border
                    border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500
                    text-sm text-gray-500 font-light' required/>
                </div>
                {/* Phone */}
                <div className='w-full mt-4'>
                    <label htmlFor="contact" className='font-bold text-gray-500'>
                        Số điện thoại
                    </label>
                    <input id='contact' onChange={(e)=> setContact(e.target.value)}
                    value={contact} type="text" placeholder= "Nhập vào đây" className='border
                    border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500
                    text-sm text-gray-500 font-light'required/>
                </div>
                {/* Address */}
                <div className='w-full mt-4'>
                    <label htmlFor="address" className='font-bold text-gray-500'>
                        Địa chỉ
                    </label>
                    <input id='address' onChange={(e)=> setAddress(e.target.value)}
                    value={address} type="text" placeholder= "Nhập vào đây" className='border
                    border-gray-200 rounded w-full px-3 py-2.5 mt-1 outline-indigo-500
                    text-sm text-gray-500 font-light'required/>
                </div>
                {/* Select City Drop Down */}
                <div className='w-full mt-4 max-w-60 mr-auto'>
                    <label htmlFor="city" className='font-bold text-gray-500'>City</label>
                    <select id="city" onChange={(e)=> setCity(e.target.value)}
                    value={city} className='border border-gray-200
                    rounded w-full px-3 py-2.5 mt-1 outline-indigo-500 text-sm font-light' required>
                        <option value="">Select City</option>
                        {cities.map((city)=>(
                            <option key={city} value={city}>{city}</option>
                        ))}
                    </select>
                </div>
                <button className='bg-indigo-500 hover:bg-indigo-700 transition-all
                text-white mr-auto px-6 py-2 rounded cursor-pointer mt-6'>
                    Đăng ký
                </button>
            </div>
        </form>
        
    </div>
  )
}

export default HotelReg