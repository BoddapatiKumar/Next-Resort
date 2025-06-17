"use client";

import CalenderComponent from "@/app/components/CalenderComponent";
import UserNavigation from "@/app/components/UserNavigation";
import { bookingAction } from "@/app/serverActions/BookingAction";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const DynamicProduct = () => {
  const [record, setRecord] = useState({});
  const [selectedDates, setSelectedDates] = useState(null);

  const params = useParams();
  const { id } = params;
  console.log("Dynamic id", id);

  const fetchSingleRecord = async () => {
    const response = await fetch(
      `http://localhost:3000/api/admin/product/${id}`
    );
    const newData = await response.json();
    console.log("record deatils: ", newData);
    setRecord(newData.data);
  };

  const handleBook = async () => {
    if (!selectedDates) {
      alert("Dates not selected");
      return;
    }

    const bookingDetails = { record, selectedDates };

    console.log("record details :", record);
    try {
      await bookingAction(bookingDetails);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleRecord();
  }, []);

  if (!record || Object.keys(record).length === 0) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: "4rem", height: "4rem" }} 
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  const handleSelectedDates = (dates) => {
    setSelectedDates(dates);
    console.log("selected dates : ", dates);
  };

  return (
    <div>
      <UserNavigation />
      <CalenderComponent onDatesSelect={handleSelectedDates} />
      <div
        className="d-flex p-5 m-2 bg-amber-100 min-vh-100"
        style={{ gap: "20px" }}
      >
        <div style={{ flex: "0 0 auto" }}>
          <img
            src={record.image}
            alt="Resort"
            width={800}
            height={600}
            className="img-fluid rounded"
            style={{ objectFit: "cover" }}
          />
        </div>

        <div
          className="d-flex flex-column justify-content-start"
          style={{ flex: "1", overflowWrap: "break-word" }}
        >
          <h1 className="mb-3">{record.title}</h1>
          <h3 className="text-danger mb-2">Rs.{record.price}</h3>
          <h4>Description:</h4>
          <p>{record.description}</p>
          <h4>Amenities:</h4>
          <div className="d-flex flex-wrap">
            {record?.amen?.map((amen, index) => (
              <span
                key={index}
                className="badge bg-secondary text-light me-2 mb-2"
              >
                *{amen}
              </span>
            ))}
          </div>
          <h4 className="mt-3">Offer:</h4>
          <div className="d-inline-block px-3 py-2 bg-warning bg-gradient text-danger fw-semibold rounded-pill shadow-sm w-45">
            🎁Discount {record.offer}
          </div>
          <div className="d-flex justify-content-center gap-3 mt-5">
            <button
              className="btn btn-success w-40"
              onClick={() => handleBook()}
            >
              Book Now
            </button>
            <Link href="/" className="btn btn-danger w-40">
              Go Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicProduct;
