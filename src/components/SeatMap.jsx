import { useState, useEffect } from "react";
import { BookingService } from "../services/BookingService";
import styles from "./SeatMap.module.css";

export const SeatMap = ({ trainId, wagonId, totalSeats, initiallyBooked }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState(initiallyBooked);

  useEffect(() => {
    // Завантажуємо заброньовані місця з localStorage
    const saved = BookingService.getBookings(trainId, wagonId);
    const booked = saved.flatMap(b => b.seats);
    setBookedSeats([...initiallyBooked, ...booked]);
  }, [trainId, wagonId, initiallyBooked]);

  const toggleSeat = (seatNum) => {
    if (bookedSeats.includes(seatNum)) return; // вже заброньовано

    setSelectedSeats(prev =>
      prev.includes(seatNum)
        ? prev.filter(s => s !== seatNum)
        : [...prev, seatNum]
    );
  };

  const getSeatClass = (seat) => {
    if (selectedSeats.includes(seat)) return styles.selected;
    if (bookedSeats.includes(seat)) return styles.booked;
    return styles.free;
  };

  return (
    <div className={styles.seatGrid}>
      {Array.from({ length: totalSeats }, (_, i) => i + 1).map(seat => (
        <div
          key={seat}
          className={getSeatClass(seat)}
          onClick={() => toggleSeat(seat)}
        >
          {seat}
        </div>
      ))}
    </div>
  );
};