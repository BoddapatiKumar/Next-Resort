"use client";

import { useEffect, useState } from "react";
import RoomCard from "./RoomCard";

const ProductCollection = () => {
  const [collections, setCollections] = useState([]);

  const fetchCollections = async () => {
    const response = await fetch("http://localhost:3000/api/admin/add-product");
    const newData = await response.json();
    console.log(newData);
    setCollections(newData.data);
  };

  useEffect(() => {
    fetchCollections();
  }, []);
  return (
    <div className="container mt-4">
      <h2 className="text-center fw-bold mb-4">Select your Stay</h2>
      {collections.map((room) => (
        <RoomCard key={room._id} room={room} />
      ))}
    </div>
  );
};

export default ProductCollection;
