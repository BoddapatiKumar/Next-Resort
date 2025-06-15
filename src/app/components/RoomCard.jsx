"use client";

import Link from "next/link";

const RoomCard = ({ room }) => {
  const { title, price, offer, image, amen } = room;
  return (
    <div className="container mb-4">
      <div className="card p-3 border rounded-3 shadow-sm">
        <div className="row g-3 align-items-center">
          {/* Image Section */}
          <div className="col-md-4">
            <img
              src={image}
              alt={title}
              className="img-fluid rounded"
              style={{ maxHeight: "200px", objectFit: "cover", width: "100%" }}
            />
          </div>

          {/* Text Content */}
          <div className="col-md-5">
            <h5 className="fw-bold mb-2">{title}</h5>
            <h6 className="fw-bold text-danger">Rs. {price}</h6>
            <p className="fw-bold mb-1 mt-2">Amenities</p>
            <div className="text-muted small">
              {amen.filter(Boolean).map((item, index) => (
                <span key={index} className="me-2">
                  *{item}
                </span>
              ))}
            </div>
          </div>

          {/* Details Button  */}
          <div className="col-md-3 text-end p-3">
            <Link href={`/details/${room._id}`}>
              <button className="btn btn-primary px-4">Details</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
