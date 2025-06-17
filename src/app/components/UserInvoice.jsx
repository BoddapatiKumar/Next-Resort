"use client";

import React, { useEffect, useState } from "react";

const UserInvoice = ({ userId }) => {
  const [invoice, setInvoice] = useState({});

  const handleInvoice = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${userId}`);
      const newData = await response.json();
      console.log("Details : ", newData);

      if (response.ok) {
        setInvoice(newData.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleInvoice();
  }, []);

  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const difference = Math.abs(end - start);

    return Math.ceil(difference / (1000 * 60 * 60 * 24));
  };
  return (
    <div
      className="container py-5"
      style={{ background: "linear-gradient(to right, #fceabb, #f8b500)" }}
    >
      <div className="text-center text-dark mb-5">
        <h1 className="fw-bold">Welcome, {invoice.username} 👋</h1>
        <p className="lead">Here's a summary of your bookings</p>
      </div>

      {invoice?.bookings?.length > 0 ? (
        <div className="row g-4 justify-content-center">
          {invoice.bookings.map((item) => {
            const days = calculateDays(item.startDate, item.endDate);
            const totalPrice = (days * item.price)-item.offer;

            return (
              <div key={item._id} className="col-md-6 col-lg-4">
                <div
                  className="card border-0 shadow-lg rounded-4 h-100"
                  style={{ backgroundColor: "#fffef5" }}
                >
                  <div className="card-body">
                    <h5 className="card-title text-primary fw-bold">
                      {item.productName}
                    </h5>
                    <ul className="list-unstyled mt-3 mb-4">
                      <li>
                        <strong>📅 Dates:</strong> {item.startDate} →{" "}
                        {item.endDate}
                      </li>
                      <li>
                        <strong>🎁 Discount:</strong> ₹{item.offer}
                      </li>
                      <li>
                        <strong>⏳ Days:</strong> {days}
                      </li>
                      <li>
                        <strong>💸 Price/Day:</strong> ₹{item.price}
                      </li>
                      <li className="mt-2 fs-5 text-success">
                        <strong>Total:</strong> ₹{totalPrice}
                      </li>
                    </ul>
                  </div>
                  <div className="card-footer bg-transparent border-0 text-center">
                    <button className="btn btn-outline-danger w-75 rounded-pill">
                      🗑 Delete Booking
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="alert alert-warning text-center mt-5 fs-4">
          🚫 No bookings found!
        </div>
      )}
    </div>
  );
};

export default UserInvoice;
