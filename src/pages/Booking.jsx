import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import '/ReactToastify.css';
import { trains } from "../data/trains";
import { BookingService } from "../services/BookingService";

export const Booking = () => {
  const { trainId } = useParams();
  const navigate = useNavigate();
  const train = trains.find(t => t.id === parseInt(trainId));
  const [selectedWagonId, setSelectedWagonId] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState({});
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (train && train.wagons.length > 0 && !selectedWagonId) {
      setSelectedWagonId(train.wagons[0].id);
    }
  }, [train, selectedWagonId]);

  // Завантажуємо заброньовані місця при зміні вагона
  useEffect(() => {
    if (trainId && selectedWagonId) {
      const booked = BookingService.getBookedSeats(trainId, selectedWagonId);
      setBookedSeats(prev => ({ ...prev, [selectedWagonId]: booked }));
    }
  }, [trainId, selectedWagonId]);

  // Слухаємо зміни бронювань
  useEffect(() => {
    const handleBookingChange = () => {
      if (trainId && selectedWagonId) {
        const booked = BookingService.getBookedSeats(trainId, selectedWagonId);
        setBookedSeats(prev => ({ ...prev, [selectedWagonId]: booked }));
      }
    };
    
    window.addEventListener('bookingChanged', handleBookingChange);
    return () => window.removeEventListener('bookingChanged', handleBookingChange);
  }, [trainId, selectedWagonId]);

  if (!train) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h2>Поїзд не знайдено</h2>
        <button onClick={() => navigate('/')} style={{
          background: '#667eea',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer'
        }}>Повернутися</button>
      </div>
    );
  }

  const currentWagon = train.wagons.find(w => w.id === selectedWagonId);
  const currentBookedSeats = bookedSeats[selectedWagonId] || [];

  const toggleSeat = (seatNum) => {
    if (currentBookedSeats.includes(seatNum)) {
      toast.error("Це місце вже заброньоване!");
      return;
    }
    
    setSelectedSeats(prev =>
      prev.includes(seatNum) ? prev.filter(s => s !== seatNum) : [...prev, seatNum]
    );
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Ім'я обов'язкове";
    if (!formData.phone.match(/^\+?[\d\s-]{10,}$/)) errors.phone = "Введіть коректний телефон";
    if (!formData.email.match(/^\S+@\S+\.\S+$/)) errors.email = "Введіть коректний email";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleBookingSubmit = () => {
    if (selectedSeats.length === 0) {
      toast.error("Виберіть хоча б одне місце");
      return;
    }
    
    if (!validateForm()) {
      toast.error("Заповніть всі поля правильно");
      return;
    }
    
    BookingService.saveBooking(trainId, selectedWagonId, selectedSeats, formData);
    
    toast.success(`✅ Місця ${selectedSeats.join(", ")} успішно заброньовано!`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
    
    // Оновлюємо список заброньованих місць
    const updatedBooked = BookingService.getBookedSeats(trainId, selectedWagonId);
    setBookedSeats(prev => ({ ...prev, [selectedWagonId]: updatedBooked }));
    setSelectedSeats([]);
    setFormData({ name: "", phone: "", email: "" });
    
    // Показуємо повідомлення про успішне бронювання
    setTimeout(() => {
      toast.info(`✨ Ви забронювали ${selectedSeats.length} місць. Дякуємо!`);
    }, 1000);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <ToastContainer />
      
      <button
        onClick={() => navigate('/')}
        style={{
          background: '#667eea',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '10px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        ← Назад до списку
      </button>
      
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '15px',
        padding: '30px',
        marginBottom: '30px',
        color: 'white'
      }}>
        <h1 style={{ margin: 0 }}> Поїзд {train.number}</h1>
        <h2 style={{ margin: '10px 0 0 0' }}>{train.route}</h2>
        <p> {new Date(train.departure).toLocaleString("uk-UA")}</p>
        <p> Вартість одного місця: {train.price} ₴</p>
        {selectedSeats.length > 0 && (
          <p> Загальна вартість: {selectedSeats.length * train.price} ₴</p>
        )}
      </div>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ flex: 2 }}>
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '20px',
            boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
          }}>
            <h3>Виберіть вагон:</h3>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
              {train.wagons.map(wagon => (
                <button
                  key={wagon.id}
                  onClick={() => {
                    setSelectedWagonId(wagon.id);
                    setSelectedSeats([]);
                  }}
                  style={{
                    background: selectedWagonId === wagon.id ? '#667eea' : '#e0e0e0',
                    color: selectedWagonId === wagon.id ? 'white' : '#333',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {wagon.type} ({wagon.seats} місць)
                </button>
              ))}
            </div>
            
            <h3>Схема місць:</h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(8, 1fr)',
              gap: '10px',
              marginBottom: '20px'
            }}>
              {currentWagon && Array.from({ length: currentWagon.seats }, (_, i) => i + 1).map(seat => {
                const isBooked = currentBookedSeats.includes(seat);
                const isSelected = selectedSeats.includes(seat);
                
                return (
                  <div
                    key={seat}
                    onClick={() => toggleSeat(seat)}
                    style={{
                      padding: '10px',
                      textAlign: 'center',
                      borderRadius: '8px',
                      cursor: isBooked ? 'not-allowed' : 'pointer',
                      background: isBooked ? '#f44336' : isSelected ? '#4caf50' : '#e0e0e0',
                      color: isBooked || isSelected ? 'white' : '#333',
                      fontWeight: 'bold',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {seat}
                  </div>
                );
              })}
            </div>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
             
              <span>🟢 Вибране</span>
              <span>🔴 Заброньоване</span>
            </div>
          </div>
        </div>
        
        <div style={{ flex: 1 }}>
          <div style={{
            background: 'white',
            borderRadius: '15px',
            padding: '20px',
            boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
          }}>
            <h3>Дані пасажира:</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input
                type="text"
                placeholder="Ім'я та прізвище"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{ padding: '10px', border: '2px solid #e0e0e0', borderRadius: '10px', fontSize: '16px' }}
              />
              {formErrors.name && <span style={{ color: 'red', fontSize: '12px' }}>{formErrors.name}</span>}
              
              <input
                type="tel"
                placeholder="Телефон"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                style={{ padding: '10px', border: '2px solid #e0e0e0', borderRadius: '10px', fontSize: '16px' }}
              />
              {formErrors.phone && <span style={{ color: 'red', fontSize: '12px' }}>{formErrors.phone}</span>}
              
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{ padding: '10px', border: '2px solid #e0e0e0', borderRadius: '10px', fontSize: '16px' }}
              />
              {formErrors.email && <span style={{ color: 'red', fontSize: '12px' }}>{formErrors.email}</span>}
              
              <button
                onClick={handleBookingSubmit}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '15px',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  marginTop: '10px'
                }}
              >
                Забронювати {selectedSeats.length} місць
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};