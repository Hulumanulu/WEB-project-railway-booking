import { useNavigate } from "react-router-dom";

export const TrainCard = ({ train }) => {
  const navigate = useNavigate();
  const departureDate = new Date(train.departure);
  const formattedDate = departureDate.toLocaleDateString("uk-UA");
  const formattedTime = departureDate.toLocaleTimeString("uk-UA", { hour: '2-digit', minute: '2-digit' });

  return (
    <div style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '15px',
      padding: '20px',
      margin: '15px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      cursor: 'pointer',
      color: 'white'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.3)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
    }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3 style={{ margin: 0, fontSize: '24px' }}> Поїзд №{train.number}</h3>
        <span style={{ background: 'rgba(255,255,255,0.2)', padding: '5px 10px', borderRadius: '10px' }}>
          {train.price} ₴
        </span>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{formattedTime}</div>
          <div style={{ fontSize: '14px', opacity: 0.9 }}>{train.from}</div>
        </div>
        <div style={{ flex: 1, margin: '0 20px' }}>
          <div style={{ height: '2px', background: 'rgba(255,255,255,0.3)', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '50%', top: '-12px', transform: 'translateX(-50%)', background: '#4a5da3', padding: '0 10px', borderRadius: '10px', fontSize: '12px' }}>
              {train.duration}
            </span>
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
            {new Date(train.arrival).toLocaleTimeString("uk-UA", { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div style={{ fontSize: '14px', opacity: 0.9 }}>{train.to}</div>
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '14px', opacity: 0.9 }}> {formattedDate}</div>
          <div style={{ fontSize: '12px', opacity: 0.7 }}> {train.wagons.length} вагонів</div>
        </div>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/booking/${train.id}`);
          }}
          style={{
            background: 'white',
            color: '#667eea',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '25px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'transform 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Обрати місця →
        </button>
      </div>
    </div>
  );
};