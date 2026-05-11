import React from 'react'
import HotelCard from './HotelCard'
import Title from './Title'
import { useEffect, useState } from 'react'
import {useAppContext} from '../context/AppContext'

const RecommendedHotels = () => {
    const {rooms, searchedCities} = useAppContext();
    const [recommended, setRecommended] = useState([]);

    const filterHotels = ()=>{
        // If user has no recent searched cities, show a fallback of first 4 rooms
        if (!searchedCities || searchedCities.length === 0) {
            setRecommended(rooms.slice(0, 4));
            return;
        }

        const filteredHotels = rooms.slice().filter(room => searchedCities.includes(room.hotel.city));
        setRecommended(filteredHotels);
    }


    useEffect(()=>{
        filterHotels();
    }, [rooms, searchedCities])
    

  return recommended.length > 0 && (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50
    py-20'>

        <Title title='Khách sạn đề xuất' subTitle='Khám phá bộ sưu tập những khách sạn được tuyển chọn kỹ lưỡng trên khắp thế giới, 
        nơi mang đến trải nghiệm xa hoa và đáng nhớ bậc nhất.' />

        <div className='flex flex-wrap items-center justify-center gap-6 mt-20'>
            {recommended.slice(0, 4).map((room, index)=>(
                <HotelCard key={room._id} room={room} index={index} />   
            ))}
        </div>

    </div>
  )
}

export default RecommendedHotels