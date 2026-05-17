const STORAGE_KEY = "railway_bookings";

export const BookingService = {
 
  getBookings(trainId, wagonId) {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const key = `${trainId}-${wagonId}`;
    return all[key] || [];
  },


  getBookedSeats(trainId, wagonId) {
    const bookings = this.getBookings(trainId, wagonId);
    return bookings.flatMap(booking => booking.seats);
  },

 
  saveBooking(trainId, wagonId, seats, userData) {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const key = `${trainId}-${wagonId}`;
    const existing = all[key] || [];
    
    const newBooking = {
      id: Date.now(),
      seats: seats,
      user: userData,
      date: new Date().toISOString(),
      trainId: trainId,
      wagonId: wagonId
    };
    
    all[key] = [...existing, newBooking];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    
   
    window.dispatchEvent(new Event('bookingChanged'));
    
    return newBooking;
  },

  getUserBookings(email) {
    const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const allBookings = [];
    
    Object.values(all).forEach(bookings => {
      bookings.forEach(booking => {
        if (booking.user.email === email) {
          allBookings.push(booking);
        }
      });
    });
    
    return allBookings;
  }
};