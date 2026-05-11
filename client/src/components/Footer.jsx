import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='bg-[#F6F9FC] text-gray-500/80 pt-8 px-6 md:px-16 lg:px-24 xl:px-32'>
            <div className='flex flex-wrap justify-between gap-12 md:gap-6'>
                <div className='max-w-80'>
                    <img src={assets.logo} alt="logo" className='mn-4 h-8 md:h-9 invert opacity-80'/>
                    <p className='text-sm'>
                        Khám phá những điểm lưu trú tuyệt vời nhất thế giới —
                         từ các khách sạn boutique tinh tế đến biệt thự sang trọng và những hòn đảo riêng tư đẳng cấp.
                    </p>
                    <div className='flex items-center gap-3 mt-4'>
                        <img src={assets.instagramIcon} alt="insstagram-icon" 
                        className='w-6'/>
                        <img src={assets.facebookIcon} alt="facebook-icon" 
                        className='w-6'/>
                        <img src={assets.twitterIcon} alt="twitter-icon" 
                        className='w-6'/>
                        <img src={assets.linkendinIcon} alt="linkedin-icon" 
                        className='w-6'/>
                    </div>
                </div>

                <div>
                    <p className='font-lora text-lg text-gray-800'>COMPANY</p>
                    <ul className='mt-3 flex flex-col gap-2 text-sm'>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Press</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Partners</a></li>
                    </ul>
                </div>

                <div>
                    <p className='font-lora text-lg text-gray-800'>SUPPORT</p>
                    <ul className='mt-3 flex flex-col gap-2 text-sm'>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Safety Information</a></li>
                        <li><a href="#">Cancellation Options</a></li>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Accessibility</a></li>
                    </ul>
                </div>
            </div>
            <hr className='border-gray-300 mt-8' />
            <div className='flex flex-col md:flex-row gap-2 items-center justify-between py-5'>
                <p>© {new Date().getFullYear()} ThangLongStay. All rights reserved.</p>
                <ul className='flex items-center gap-4'>
                    <li><a href="#">Privacy</a></li>
                    <li><a href="#">Terms</a></li>
                    <li><a href="#">Sitemap</a></li>
                </ul>
            </div>
        </div>
  )
}

export default Footer