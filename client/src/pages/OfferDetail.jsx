// pages/OfferDetail.jsx

import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OfferDetail = () => {

  const navigate = useNavigate();

  const { state } = useLocation();

  const offer = state?.offer;

  if (!offer) {
    return (
      <div className="h-screen flex items-center justify-center">
        Không tìm thấy ưu đãi
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gray-100 pt-32 px-4 md:px-10">

      {/* BACKGROUND TOP */}

      <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-r from-sky-600 to-cyan-400 h-[260px] flex items-center justify-center">

        {/* CONFETTI */}

        <div className="absolute inset-0 opacity-20">

          <div className="absolute top-10 left-20 w-6 h-6 bg-yellow-300 rotate-12"></div>

          <div className="absolute top-20 right-32 w-5 h-5 bg-pink-400 rotate-45"></div>

          <div className="absolute bottom-10 left-1/3 w-4 h-4 bg-blue-300 rotate-12"></div>

          <div className="absolute top-1/2 right-1/4 w-3 h-8 bg-yellow-200 rotate-45"></div>

        </div>

        {/* VOUCHER */}

        <div className="relative z-10 bg-white/30 backdrop-blur-lg border border-white/40 rounded-2xl overflow-hidden shadow-2xl max-w-5xl w-full flex flex-col md:flex-row">

          {/* LEFT IMAGE */}

          <div className="md:w-1/3 h-[250px]">

            <img
              src={offer.image}
              alt={offer.title}
              className="w-full h-full object-cover"
            />

          </div>

          {/* CENTER */}

          <div className="flex-1 p-8 text-white flex flex-col justify-center">

            <p className="text-sm uppercase tracking-widest mb-2">
              ƯU ĐÃI ĐỘC QUYỀN
            </p>

            <h1 className="text-4xl font-bold leading-tight">
              {offer.title}
            </h1>

            <p className="mt-4 text-lg text-white/90">
              {offer.description}
            </p>

            <p className="mt-6 text-sm text-white/80">
              Hạn sử dụng: {offer.expiryDate}
            </p>

          </div>

          {/* RIGHT */}

          <div className="bg-white flex flex-col items-center justify-center px-10 py-8 md:w-[260px] relative">

            {/* DASH LINE */}

            <div className="absolute left-0 top-0 bottom-0 border-l-2 border-dashed border-gray-300"></div>

            <p className="text-blue-700 font-bold text-xl uppercase tracking-wide">
              DEAL
            </p>

            <p className="text-blue-700 font-bold text-xl uppercase tracking-wide mb-4">
              HOT
            </p>

            <div className="flex items-end">

              <span className="text-7xl font-extrabold text-blue-700 leading-none">
                {offer.priceOff}
              </span>

              <span className="text-4xl font-bold text-blue-700 mb-2">
                %
              </span>

            </div>

            <p className="text-gray-500 mt-3">
              Giảm giá cực sốc
            </p>

            <button className="mt-8 bg-blue-600 hover:bg-blue-700 transition text-white px-8 py-3 rounded-full font-semibold shadow-lg">
              Nhận Voucher
            </button>

          </div>

        </div>

      </div>

      {/* DETAIL */}

      <div className="max-w-5xl mx-auto mt-12 bg-white rounded-3xl shadow-md p-8">

        <h2 className="text-2xl font-bold mb-5">
          Thông tin ưu đãi
        </h2>

        <div className="space-y-4 text-gray-700 leading-8">

          <p>
            Voucher này áp dụng cho toàn bộ hệ thống khách sạn của chúng tôi.
          </p>

          <p>
            Khách hàng có thể sử dụng voucher trong thời gian diễn ra sự kiện.
          </p>

          <p>
            Voucher không áp dụng đồng thời với các chương trình khác.
          </p>

          <p>
            Vui lòng xuất trình voucher tại quầy lễ tân khi check-in.
          </p>

        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-10 border border-gray-300 hover:bg-gray-100 transition px-6 py-3 rounded-xl"
        >
          Quay lại
        </button>

      </div>

    </div>
  );
};

export default OfferDetail;