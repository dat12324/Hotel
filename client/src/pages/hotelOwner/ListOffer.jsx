// pages/owner/ListOffer.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ListOffer = () => {

  const navigate = useNavigate();

  const [offers, setOffers] = useState([]);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [deleteModal, setDeleteModal] = useState(false);

  const [selectedId, setSelectedId] = useState(null);

  // =========================
  // FETCH OFFERS
  // =========================

  const fetchOffers = async () => {

    try {

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/offers`
      );

      const data = await res.json();

      setOffers(data);

    } catch (error) {

      console.log(error);

      toast.error("Không thể tải offers");
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  // =========================
  // FILTER SEARCH
  // =========================

  const filteredOffers = offers.filter((offer) =>
    offer.title.toLowerCase().includes(search.toLowerCase())
  );

  // =========================
  // PAGINATION
  // =========================

  const offersPerPage = 5;

  const lastIndex = currentPage * offersPerPage;

  const firstIndex = lastIndex - offersPerPage;

  const currentOffers = filteredOffers.slice(
    firstIndex,
    lastIndex
  );

  const totalPages = Math.ceil(
    filteredOffers.length / offersPerPage
  );

  // =========================
  // DELETE OFFER
  // =========================

  const handleDelete = async (id) => {

    try {

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/offers/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (res.ok) {

        toast.success(data.message);

        fetchOffers();

        setDeleteModal(false);

      } else {

        toast.error(data.message);
      }

    } catch (error) {

      console.log(error);

      toast.error("Xóa thất bại");
    }
  };

  return (

    <div className="p-6 w-full">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

        <h1 className="text-3xl font-bold">
          Danh sách Offer
        </h1>

        <button
          onClick={() => navigate("/owner/add-offer")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          + Thêm Offer
        </button>

      </div>

      {/* SEARCH */}

      <input
        type="text"
        placeholder="Tìm kiếm offer..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 p-3 rounded-xl mb-8 w-full max-w-md outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* LIST */}

      <div className="grid gap-5">

        {currentOffers.map((offer) => (

          <div
            key={offer._id}
            className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5 shadow-sm hover:shadow-lg transition"
          >

            {/* LEFT */}

            <div className="flex flex-col md:flex-row gap-5">

              <img
                src={offer.image}
                alt=""
                className="w-full md:w-52 h-36 object-cover rounded-2xl"
              />

              <div>

                <h2 className="font-bold text-2xl text-gray-800">
                  {offer.title}
                </h2>

                <p className="text-gray-600 mt-2 max-w-2xl leading-7">
                  {offer.description}
                </p>

                <div className="flex gap-4 mt-4 flex-wrap">

                  <p className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
                    {offer.priceOff}% OFF
                  </p>

                  <p className="bg-red-100 text-red-600 px-4 py-2 rounded-full font-semibold">
                    Hết hạn: {offer.expiryDate}
                  </p>

                </div>

              </div>

            </div>

            {/* ACTION */}

            <div className="flex gap-3">

              <button
                onClick={() =>
                  navigate(`/owner/edit-offer/${offer._id}`)
                }
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-xl font-semibold transition"
              >
                Sửa
              </button>

              <button
                onClick={() => {

                  setDeleteModal(true);

                  setSelectedId(offer._id);
                }}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl font-semibold transition"
              >
                Xóa
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* PAGINATION */}

      <div className="flex justify-center gap-3 mt-12 flex-wrap">

        {[...Array(totalPages)].map((_, index) => (

          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`w-11 h-11 rounded-full font-semibold transition ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {index + 1}
          </button>
        ))}

      </div>

      {/* DELETE MODAL */}

      {
        deleteModal && (

          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">

            <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">

              <h2 className="text-3xl font-bold text-gray-800">
                Xóa Offer?
              </h2>

              <p className="text-gray-600 mt-4 leading-7">
                Bạn có chắc chắn muốn xóa offer này?
                Hành động này không thể hoàn tác.
              </p>

              <div className="flex justify-end gap-4 mt-10">

                <button
                  onClick={() => setDeleteModal(false)}
                  className="border border-gray-300 px-5 py-3 rounded-xl hover:bg-gray-100 transition"
                >
                  Hủy
                </button>

                <button
                  onClick={() => handleDelete(selectedId)}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl transition"
                >
                  Xóa
                </button>

              </div>

            </div>

          </div>
        )
      }

    </div>
  );
};

export default ListOffer;