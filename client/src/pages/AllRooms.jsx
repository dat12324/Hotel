import React, { useState, useMemo } from 'react'
import { assets, facilityIcons } from '../assets/assets'
import { useSearchParams } from 'react-router-dom'
import StarRating from '../components/StarRating';
import { useAppContext } from '../context/AppContext'

const CheckBox = ({label, value = label, selected = false, onChange = () => { }})=>{
    return (
        <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
            <input type="checkbox" checked={selected} onChange={(e)=> 
            onChange(e.target.checked, value)}/>
            <span className='font-light select-none'>{label}</span>
        </label>
    )
}

const RadioButton = ({label, selected = false, onChange = () => { }})=>{
    return (
        <label className='flex gap-3 items-center cursor-pointer mt-2 text-sm'>
            <input type="radio" name='sortOption' checked={selected} onChange={(e)=> 
            onChange(label)}/>
            <span className='font-light select-none'>{label}</span>
        </label>
    )
}

const AllRooms = () => {

    const [searchParams, setSearchParams] = useSearchParams({});
    const {rooms, navigate} = useAppContext();

    const[openFilters, setOpenFilters] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState({
        roomType: [],
        priceRange: [],
    });
    const [selectedSort, setSelectedSort] = useState('');

    const roomTypes = [
        { label: "1 Giường", value: "Single Bed" },
        { label: "2 Giường", value: "Double Bed" },
        { label: "Phòng Sang Trọng", value: "Luxury Room" },
        { label: "Phòng Gia Đình", value: "Family Suite" }
    ];

    const priceRanges = [
        '0 - 500.000',
        '500.000 - 1.000.000',
        '1.000.000 - 2.000.000',
        '2.000.000 - 3.000.000',
    ];

    const sortOptions = [
        "Giá tăng dần",
        "Giá giảm dần",
        "Mới Nhất",
    ];

    // Handle changes for filters and sorting

    const handleFilterChange = (checked, value, type) => {
        setSelectedFilters((prevFilters) => {
            const prevArray = prevFilters[type] || [];
            return {
                ...prevFilters,
                [type]: checked ? [...prevArray, value] : prevArray.filter(item => item !== value)
            };
        });
    }

    const handleSortChange = (sortOption) => {
        setSelectedSort(sortOption);
    }

    // Function to check if a room matches the selected room types

    const matchesRoomType = (room) => {
        return selectedFilters.roomType.length === 0 || selectedFilters.roomType.includes(room.roomType);
    }

    // Function to check if a room matches the selected price ranges

    const matchesPriceRange = (room) => {
        return selectedFilters.priceRange.length === 0 || selectedFilters.priceRange.some((range) => {
            const [min, max] = range.split(' to ').map(Number);
            return room.pricePerNight >= min && room.pricePerNight <= max;
        });
    }

    // Function to sort rooms based on selected sort option
    const sortRooms = (a, b)=>{
        if(selectedSort === "Giá tăng dần"){
            return a.pricePerNight - b.pricePerNight;
        }
        if(selectedSort === "Giá giảm dần"){
            return b.pricePerNight - a.pricePerNight;
        }
        if(selectedSort === "Mới Nhất"){
            return new Date(b.createdAt) - new Date(a.createdAt);
        }
        return 0;
    }

    //  Filter Destination
    const filterDestination = (room) => {
        const destination = searchParams.get('destination');
        if(!destination){
            return true;
        }
        return room.hotel.city.toLowerCase().includes(destination.toLowerCase());
    }

    // Filter and sort rooms based on the selected filters and sort option
    const filteredRooms = useMemo(()=>{
        return rooms.filter((room) => matchesRoomType(room) 
        && matchesPriceRange(room) && filterDestination(room)).sort(sortRooms);

    }, [rooms, selectedFilters, selectedSort, searchParams]);


    // Clear all filters
    const clearFilters = () => {
        setSelectedFilters({
            roomType: [],
            priceRange: [],
        });
        setSelectedSort('');
        setSearchParams({});
    }


  return (
    <div className='flex flex-col-reverse lg:flex-row items-start
    justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24
    xl:px-32'>
        <div className='flex flex-col items-start text-left'>
            <h1 className='font-lora text-4xl md:text-[40px]'>Phòng khách sạn</h1>
            <p className='text-sm md:text-base text-gray-500/90 mt-2
            max-w-174'>Tận dụng các ưu đãi có thời hạn và gói dịch vụ đặc biệt của chúng tôi 
            để làm cho kỳ nghỉ của bạn thêm trọn vẹn và đọng lại những kỷ niệm khó quên.</p>
        

        {filteredRooms.map((room)=>(
            <div key={room._id} className='flex flex-col md:flex-row items-start py-10 gap-6
            border-b border-gray-300 last:pb-30 last:border-0'>
                <img onClick={()=> {navigate(`/rooms/${room._id}`); scrollTo(0,0)}}
                src={room.images[0]} alt="hotel-img" 
                title='Xem thông tin phòng'
                className='max-h-65 md:w-1/2 rounded-xl shadow-lg object-cover
                cursor-pointer'/>
                <div className='md:w-1/2 flex flex-col gap-2'>
                    <p className='text-gray-500'>{room.hotel.city}</p>
                    <p onClick={()=> {navigate(`/rooms/${room._id}`); scrollTo(0,0)}} 
                    className='text-gray-800 text-3xl font-lora
                    cursor-pointer'>{room.hotel.name}</p>
                    <div className='flex items-center'>
                        <StarRating/>
                        <p className='ml-2'>200+ reviews</p>
                    </div>
                    <div className='flex items-center gap-1 text-gray-500 mt-2
                    text-sm'>
                        <img src={assets.locationIcon} alt="location-icon" />
                        <span>{room.hotel.address}</span>
                    </div>
                    {/*  Room Amenities */}
                    <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                        {room.amenities.map((item, index)=>(
                            <div key={index} className='flex items-center gap-2
                            px-3 py-2 rounded-lg bg-gray-100'>
                                <img src={facilityIcons[item]} alt={item}
                                className='w-5 h-5' />
                                <p className='text-xs'>{item}</p>
                            </div>
                        ))}
                    </div>
                    {/* Room Price per Night */}
                    <p className='text-xl font-bold text-gray-700'>{room.pricePerNight}đ /đêm</p>
                </div>
            </div>
        ))}

        </div>
        {/* Filters */}
        <div className='bg-white w-80 border border-gray-300 text-gray-600
        max-lg:mb-8 min-lg:mt-16'>

            <div className={`flex items-center justify-between px-5 py-2.5
                min-lg:border-b border-gray-300 ${openFilters && 'border-b'}`}>
                <p className='text-base font-bold text-gray-800'>FILTERS</p>
                <div className='text-xs cursor-pointer'>
                    <span onClick={()=> setOpenFilters(!openFilters)} 
                    className='lg:hidden'>
                        {openFilters ? 'Ẩn' : 'Hiện'}</span>
                    <span className='hidden lg:block' onClick={clearFilters}>XÓA</span>
                </div>
            </div>

            <div className={`${openFilters ? 'h-auto' : 'h-0 lg:h-auto'}
            overflow-hidden transition-all duration-700`}>
                <div className='px-5 pt-5'>
                    <p className='font-bold text-gray-800 pb-2'>
                        Filters hay dùng
                    </p>
                    {roomTypes.map((room, index)=>(
                        <CheckBox key={index} label={room.label} value={room.value} selected={selectedFilters.roomType.includes(room.value)}
                        onChange={(checked)=>handleFilterChange(checked, room.value, 'roomType')}/>
                    ))}
                </div>
                <div className='px-5 pt-5'>
                    <p className='font-bold text-gray-800 pb-2'>
                        Khoảng giá
                    </p>
                    {priceRanges.map((range, index)=>(
                        <CheckBox key={index} label={`${range}đ`} selected={selectedFilters.priceRange.includes(range)}
                        onChange={(checked)=>handleFilterChange(checked, range, 'priceRange')}/>
                    ))}
                </div>
                <div className='px-5 pt-5 pb-7'>
                    <p className='font-bold text-gray-800 pb-2'>
                        Sắp xếp
                    </p>
                    {sortOptions.map((option, index)=>(
                        <RadioButton key={index} label={option} selected={selectedSort
                        === option}
                        onChange={()=>handleSortChange(option)
                        }/>
                    ))}
                </div>

            </div>

        </div>
    </div>
  )
}

export default AllRooms