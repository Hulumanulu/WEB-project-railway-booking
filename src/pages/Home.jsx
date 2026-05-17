import { TrainList } from "../components/TrainList";

export const Home = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '40px 20px',
        textAlign: 'center',
        color: 'white',
        marginBottom: '30px'
      }}>
        <h1 style={{ fontSize: '48px', margin: 0 }}> Укрзалізниця</h1>
      </div>
      <TrainList />
    </div>
  );
};