import { useState } from "react";
import { TrainCard } from "./TrainCard";
import { trains } from "../data/trains";

export const TrainList = () => {
  const [search, setSearch] = useState("");
  const [filterBy, setFilterBy] = useState("all");

  const filteredTrains = trains.filter((train) => {
    const matchesSearch = train.number.includes(search) ||
      train.route.toLowerCase().includes(search.toLowerCase()) ||
      train.from.toLowerCase().includes(search.toLowerCase()) ||
      train.to.toLowerCase().includes(search.toLowerCase());
    
    if (filterBy === "all") return matchesSearch;
    if (filterBy === "kyiv") return train.from === "Київ" && matchesSearch;
    if (filterBy === "lviv") return train.from === "Львів" && matchesSearch;
    if (filterBy === "dnipro") return train.from === "Дніпро" && matchesSearch;
    if (filterBy === "kharkiv") return train.from === "Харків" && matchesSearch;
    return matchesSearch;
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div style={{
        background: 'white',
        borderRadius: '15px',
        padding: '20px',
        marginBottom: '30px',
        boxShadow: '0 5px 20px rgba(54, 225, 57, 0.1)'
      }}>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="🔍 Пошук за номером або маршрутом..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              padding: '12px 20px',
              border: '2px solid #e0e0e0',
              borderRadius: '25px',
              fontSize: '16px',
              outline: 'none',
              transition: 'border-color 0.3s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
          />
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            style={{
              padding: '12px 20px',
              border: '2px solid #e0e0e0',
              borderRadius: '25px',
              fontSize: '16px',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="all">Всі напрямки</option>
            <option value="kyiv">З Києва</option>
            <option value="lviv">Зі Львова</option>
            <option value="dnipro">З Дніпра</option>
            <option value="kharkiv">З Харкова</option>
          </select>
        </div>
      </div>
      
      <div style={{ display: 'grid', gap: '20px' }}>
        {filteredTrains.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px', fontSize: '18px', color: '#666' }}>
             Поїздів не знайдено
          </div>
        ) : (
          filteredTrains.map((train) => (
            <TrainCard key={train.id} train={train} />
          ))
        )}
      </div>
    </div>
  );
};