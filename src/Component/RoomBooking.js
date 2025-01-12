import React, { useState, useEffect } from "react";
import GradientText from "./GradientText/Gradient";
import ShinyText from "./ShinyText/ShinyText";

const RoomBooking = () => {
  const [username, setUsername] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [bookedRooms, setBookedRooms] = useState([]);
  const [bookingRequest, setBookingRequest] = useState(0);
  const [bookingResult, setBookingResult] = useState([]);

  const floors = {
    floor1: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110],
    floor2: [201, 202, 203, 204, 205, 206, 207, 208, 209, 210],
    floor3: [301, 302, 303, 304, 305, 306, 307, 308, 309, 310],
    floor4: [401, 402, 403, 404, 405, 406, 407, 408, 409, 410],
    floor5: [501, 502, 503, 504, 505, 506, 507, 508, 509, 510],
    floor6: [601, 602, 603, 604, 605, 606, 607, 608, 609, 610],
    floor7: [701, 702, 703, 704, 705, 706, 707, 708, 709, 710],
    floor8: [801, 802, 803, 804, 805, 806, 807, 808, 809, 810],
    floor9: [901, 902, 903, 904, 905, 906, 907, 908, 909, 910],
    floor10: [1001, 1002, 1003, 1004, 1005, 1006, 1007], // Only 7 rooms
  };

  const handleBooking = () => {
    if (bookingRequest <= 0) {
      alert("Please enter a valid number of rooms to book.");
      return;
    }

    if (bookingRequest > 5) {
      alert("You cannot book more than 5 rooms.");
      return;
    }

    let selectedRooms = [];

    for (let floor in floors) {
      const availableRooms = floors[floor].filter(
        (room) => !bookedRooms.includes(room)
      );

      if (availableRooms.length >= bookingRequest) {
        selectedRooms = availableRooms.slice(0, bookingRequest);
        setBookedRooms([...bookedRooms, ...selectedRooms]);

        break;
      }
    }

    if (selectedRooms.length === 0) {
      let roomsNeeded = bookingRequest;
      let tempRooms = [];
      for (let floor in floors) {
        const availableRooms = floors[floor].filter(
          (room) => !bookedRooms.includes(room)
        );

        if (availableRooms.length > 0) {
          tempRooms = [...tempRooms, ...availableRooms];
          roomsNeeded -= availableRooms.length;
          if (roomsNeeded <= 0) break;
        }
      }

      if (tempRooms.length >= bookingRequest) {
        selectedRooms = tempRooms.slice(0, bookingRequest);
        setBookedRooms([...bookedRooms, ...selectedRooms]);
      } else {
        alert("Not enough rooms available to fulfill your booking request.");
        return;
      }
    }

    setBookingResult(selectedRooms);
  };

  const handleInputChange = (e) => {
    setBookingRequest(Number(e.target.value));
  };

  const generateRandomOccupancy = () => {
    let allRooms = [];
    Object.keys(floors).forEach((floor) => {
      allRooms = [...allRooms, ...floors[floor]];
    });

    let randomBookedRooms = [];
    while (randomBookedRooms.length < 10) {
      const randomRoom = allRooms[Math.floor(Math.random() * allRooms.length)];
      if (!randomBookedRooms.includes(randomRoom)) {
        randomBookedRooms.push(randomRoom);
      }
    }

    setBookedRooms(randomBookedRooms);
  };

  const resetBooking = () => {
    setBookedRooms([]);
    setBookingRequest(0);
    setBookingResult([]);
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 via-white to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-700 text-gray-900 dark:text-gray-100 font-sans">
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4">Enter Your Name</h2>
            <form onSubmit={handleNameSubmit}>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your Name"
                className="w-full px-4 py-2 border rounded-lg mb-4"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {!isModalOpen && (
        <>
          <div className="bg-gradient-to-b from-blue-100 via-white to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-700 text-gray-900 dark:text-gray-100 font-sans">
            <header className="bg-blue-500 dark:bg-gray-800 text-white py-6">
              <div className="container mx-auto px-6 text-center">
                <GradientText
                  colors={[
                    "#f8bbd0",
                    "#c5e1a5",
                    "#b3e5fc",
                    "#ffcc80",
                    "#e1bee7",
                  ]}
                  animationSpeed={6}
                  showBorder={false}
                  className="custom-class"
                >
                  <h1 className="text-3xl font-extrabold">
                    Welcome to the Room Booking System, {username}!
                  </h1>
                </GradientText>

                <p className="mt-2 text-lg">
                  Your hassle-free solution for room reservations
                </p>
              </div>
            </header>
            <main className="container mx-auto px-6 py-12">
              <div className="flex justify-between items-start">
                <section className="w-1/2 ml-4  mt-2 text-left pr-6">
                  <h2 className="text-3xl font-bold mb-6">
                    Effortless Room Management
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-8">
                    Select the number of rooms you want, check availability, and
                    book instantly.
                  </p>
                  <div className="flex justify-start">
                    <input
                      type="number"
                      min="1"
                      value={bookingRequest}
                      onChange={handleInputChange}
                      id="roomsInput"
                      className="w-64 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200 ease-in-out"
                    />

                    <button
                      onClick={handleBooking}
                      id="bookButton"
                      className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
                    >
                      Book Rooms
                    </button>
                  </div>
                  <div className="mt-12 flex justify-start space-x-4">
                    <button
                      onClick={generateRandomOccupancy}
                      id="randomOccupancyButton"
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
                    >
                      Generate Random Occupancy
                    </button>
                    <button
                      onClick={resetBooking}
                      id="resetButton"
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
                    >
                      Reset Booking
                    </button>
                  </div>
                </section>

                <section className="w-1/2 pl-6">
                  {bookingResult.length > 0 && (
                    <div className="text-center p-8 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 shadow-lg">
                      <h2 className="text-2xl font-semibold mb-4">
                        Booking Result
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300">
                        <strong> {username}! Your Booked Room:</strong>{" "}
                        {bookingResult.join(", ")}
                      </p>
                    </div>
                  )}

                  <div className="mt-2">
                    <h2 className="text-2xl font-semibold mb-4">
                      Available Rooms
                    </h2>
                    <div className="flex items-center mb-6">
                      <div className="flex items-center mr-4">
                        <span className="inline-block w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                        <span className="text-gray-700 dark:text-gray-300">
                          Available
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="inline-block w-4 h-4 bg-red-500 rounded-full mr-2"></span>
                        <span className="text-gray-700 dark:text-gray-300">
                          Occupied
                        </span>
                      </div>
                    </div>
                    <div
                      id="availableRooms"
                      className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                    >
                      {Object.keys(floors).map((floor, index) => (
                        <div
                          key={index}
                          className="border-2 border-gray-300 dark:border-gray-600 rounded-lg p-2 mb-4"
                        >
                          <h3 className="font-semibold text-xl mb-3">{`Floor ${
                            index + 1
                          }`}</h3>
                          <div className="grid grid-cols-3 gap-1">
                            {floors[floor].map((room) => (
                              <span
                                key={room}
                                className={`inline-block  text-center rounded-lg  ${
                                  bookedRooms.includes(room)
                                    ? "bg-red-500"
                                    : "bg-green-500"
                                } text-white  `}
                              >
                                {room}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            </main>

            <footer className="bg-blue-500 dark:bg-gray-800 text-white py-6">
              <div className="container mx-auto text-center">
                <p>&copy; 2025 Room Booking System. All Rights Reserved.</p>
              </div>
            </footer>
          </div>
        </>
      )}
    </div>
  );
};

export default RoomBooking;
