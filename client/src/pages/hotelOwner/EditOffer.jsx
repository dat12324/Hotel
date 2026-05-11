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

  // FETCH

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

  // SEARCH

  const filteredOffers = offers.filter((offer) =>
    offer.title.toLowerCase().includes(search.toLowerCase())
  );

  // PAGINATION

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

  // DELETE

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

        toast.success("Xóa thành công");

        fetchOffers();

        setDeleteModal(false);

      } else {

        toast.error(data.message);
      }

    } catch (error) {

      console.log(error);

      toast.error("Lỗi xóa offer");
    }
  };

  return (

    <div className="p-6 w-full">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Danh sách Offer
        </h1>

        <button
          onClick={() => navigate("/owner/add-offer")}
          className="bg-blue-600 text-white px-5 py-3 rounded-xl"
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
        className="border p-3 rounded-xl mb-8 w-full max-w-md"
      />

      {/* LIST */}

      <div className="grid gap-5">

        {currentOffers.map((offer) => (

          <div
            key={offer._id}
            className="border rounded-2xl p-5 flex justify-between items-center"
          >

            <div className="flex gap-5">

              <img
                src={offer.image}
                alt=""
                className="w-52 h-32 object-cover rounded-xl"
              />

              <div>

                <h2 className="text-2xl font-bold">
                  {offer.title}
                </h2>

                <p className="mt-2 text-gray-600">
                  {offer.description}
                </p>

                <div className="flex gap-3 mt-4">

                  <p className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                    {offer.priceOff}% OFF
                  </p>

                  <p className="bg-red-100 text-red-600 px-4 py-2 rounded-full">
                    {offer.expiryDate}
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
                className="bg-yellow-500 text-white px-5 py-3 rounded-xl"
              >
                Sửa
              </button>

              <button
                onClick={() => {

                  setDeleteModal(true);

                  setSelectedId(offer._id);
                }}
                className="bg-red-600 text-white px-5 py-3 rounded-xl"
              >
                Xóa
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* PAGINATION */}

      <div className="flex justify-center gap-3 mt-10">

        {[...Array(totalPages)].map((_, index) => (

          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`w-10 h-10 rounded-full ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}

      </div>

      {/* MODAL */}

      {
        deleteModal && (

          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-white p-8 rounded-2xl w-[400px]">

              <h2 className="text-2xl font-bold">
                Xóa Offer?
              </h2>

              <p className="text-gray-600 mt-3">
                Bạn có chắc muốn xóa offer này?
              </p>

              <div className="flex justify-end gap-4 mt-8">

                <button
                  onClick={() => setDeleteModal(false)}
                  className="px-5 py-2 border rounded-xl"
                >
                  Hủy
                </button>

                <button
                  onClick={() => handleDelete(selectedId)}
                  className="bg-red-600 text-white px-5 py-2 rounded-xl"
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