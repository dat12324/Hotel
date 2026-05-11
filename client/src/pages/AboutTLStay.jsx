// pages/AboutTLStay.jsx

import React from "react";

const AboutTLStay = () => {

  return (

    <div className="bg-gray-50 min-h-screen pt-28 pb-20">

      {/* HERO */}

      <div className="relative h-[420px] overflow-hidden">

        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
          alt="TL Stay"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">

          <p className="text-blue-300 uppercase tracking-[6px] text-sm mb-4">
            Welcome To
          </p>

          <h1 className="text-5xl md:text-7xl font-bold text-white">
            TL-Stay
          </h1>

          <p className="text-white/90 mt-6 max-w-2xl text-lg leading-8">
            Nền tảng đặt phòng khách sạn hiện đại dành cho mọi hành trình.
          </p>

        </div>

      </div>

      {/* CONTENT */}

      <div className="max-w-6xl mx-auto px-6 md:px-10 mt-20">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* IMAGE */}

          <div>

            <img
              src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
              alt="Hotel"
              className="rounded-3xl shadow-2xl"
            />

          </div>

          {/* TEXT */}

          <div>

            <p className="text-blue-600 font-semibold uppercase tracking-[4px] mb-4">
              Về chúng tôi
            </p>

            <h2 className="text-4xl font-bold text-gray-800 leading-tight">
              Trải nghiệm lưu trú hiện đại cùng TL-Stay
            </h2>

            <p className="text-gray-600 leading-8 mt-6">
              TL-Stay là nền tảng đặt phòng khách sạn hiện đại được xây dựng
              với mục tiêu mang đến cho khách hàng trải nghiệm lưu trú tiện lợi,
              nhanh chóng và đáng tin cậy.
            </p>

            <p className="text-gray-600 leading-8 mt-4">
              Với giao diện thân thiện, hệ thống tìm kiếm thông minh cùng hàng
              loạt khách sạn, resort và homestay chất lượng, TL-Stay giúp người
              dùng dễ dàng tìm kiếm và đặt phòng chỉ trong vài thao tác đơn giản.
            </p>

            <p className="text-gray-600 leading-8 mt-4">
              Không chỉ dừng lại ở việc đặt phòng, TL-Stay còn mang đến nhiều
              voucher hấp dẫn, chương trình ưu đãi độc quyền và trải nghiệm du
              lịch trọn vẹn cho khách hàng.
            </p>

          </div>

        </div>

        {/* FEATURES */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">

          <div className="bg-white p-8 rounded-3xl shadow-md hover:shadow-2xl transition">

            <div className="text-5xl mb-5">
              🏨
            </div>

            <h3 className="text-2xl font-bold text-gray-800">
              Hệ thống khách sạn đa dạng
            </h3>

            <p className="text-gray-600 mt-4 leading-7">
              Kết nối với nhiều khách sạn, resort và homestay chất lượng trên
              toàn quốc.
            </p>

          </div>

          <div className="bg-white p-8 rounded-3xl shadow-md hover:shadow-2xl transition">

            <div className="text-5xl mb-5">
              🎁
            </div>

            <h3 className="text-2xl font-bold text-gray-800">
              Ưu đãi độc quyền
            </h3>

            <p className="text-gray-600 mt-4 leading-7">
              Hàng loạt voucher giảm giá và chương trình khuyến mãi hấp dẫn dành
              riêng cho khách hàng thân thiết.
            </p>

          </div>

          <div className="bg-white p-8 rounded-3xl shadow-md hover:shadow-2xl transition">

            <div className="text-5xl mb-5">
              ⚡
            </div>

            <h3 className="text-2xl font-bold text-gray-800">
              Đặt phòng nhanh chóng
            </h3>

            <p className="text-gray-600 mt-4 leading-7">
              Giao diện hiện đại, tối ưu trên mọi thiết bị giúp người dùng dễ
              dàng thao tác và đặt phòng.
            </p>

          </div>

        </div>

        {/* BOTTOM */}

        <div className="mt-24 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[40px] p-12 text-center text-white shadow-2xl">

          <h2 className="text-4xl font-bold">
            TL-Stay — Đồng hành cùng mọi chuyến đi
          </h2>

          <p className="max-w-3xl mx-auto mt-6 text-lg leading-8 text-white/90">
            Chúng tôi không chỉ cung cấp nơi lưu trú, mà còn mang đến trải
            nghiệm nghỉ dưỡng hiện đại, tiện nghi và đáng nhớ cho mọi khách
            hàng.
          </p>

          <button className="mt-10 bg-white text-blue-700 px-8 py-4 rounded-full font-bold hover:scale-105 transition">
            Khám phá ngay
          </button>

        </div>

      </div>

    </div>
  );
};

export default AboutTLStay;