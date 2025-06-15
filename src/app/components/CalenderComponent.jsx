import { useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

const CalenderComponent = () => {
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [showCalender, setShowCalender] = useState(false);
  const [selectedDates, setSelectedDates] = useState(null);

  const handleSelectedDates = () => {
    const startDate = date[0]?.startDate.toLocaleDateString();
    const endDate = date[0]?.endDate.toLocaleDateString();
    const bookingDtaes = { startDate, endDate };
    console.log("Booking dates : ", bookingDtaes);
    setSelectedDates(`Selected Dates : ${startDate} - ${endDate}`);
  };

  const currDate=new Date().toDateString();
  const nextDate=new Date();
  nextDate.setDate(nextDate.getDate()+1);
  const formattedDate=nextDate.toDateString();

  return (
    <div className="position-relative d-flex justify-content-center mt-4">
      <div
        className="d-flex align-items-center gap-3 px-4 py-2 bg-white border rounded shadow-lg"
        style={{ cursor: "pointer", zIndex: 2 }}
        onClick={() => setShowCalender(!showCalender)}
      >
        <span className="text-primary fw-semibold">
          {selectedDates
            ? selectedDates
            : `${currDate} - ${formattedDate}`}
        </span>
        <button
          className="btn btn-warning fw-semibold"
          onClick={handleSelectedDates}
        >
          Select Dates
        </button>
      </div>

      {showCalender && (
        <div
          className="position-absolute start-50 translate-middle-x mt-2"
          style={{ top: "100%", zIndex: 1 }}
        >
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setDate([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={date}
          />
        </div>
      )}
    </div>
  );
};

export default CalenderComponent;
