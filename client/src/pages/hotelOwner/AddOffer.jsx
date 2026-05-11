// pages/owner/AddOffer.jsx

import React, { useState } from "react";

const AddOffer = () => {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priceOff: "",
    expiryDate: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/offers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        alert("Thêm offer thành công");

        setFormData({
          title: "",
          description: "",
          priceOff: "",
          expiryDate: "",
          image: "",
        });

      } else {
        alert(data.message);
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 w-full">

      <h1 className="text-2xl font-bold mb-6">
        Thêm Offer
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-xl"
      >

        <input
          type="text"
          name="title"
          placeholder="Tiêu đề"
          value={formData.title}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Mô tả"
          value={formData.description}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          type="number"
          name="priceOff"
          placeholder="% giảm giá"
          value={formData.priceOff}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          type="text"
          name="expiryDate"
          placeholder="Ngày hết hạn"
          value={formData.expiryDate}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Link ảnh"
          value={formData.image}
          onChange={handleChange}
          className="border p-3 rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-3 rounded"
        >
          Thêm Offer
        </button>

      </form>
    </div>
  );
};

export default AddOffer;