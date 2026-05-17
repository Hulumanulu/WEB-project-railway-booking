export const WagonSelector = ({ wagons, selectedWagonId, onSelect }) => {
  return (
    <div className="wagon-selector">
      {wagons.map(wagon => (
        <button
          key={wagon.id}
          className={selectedWagonId === wagon.id ? "active" : ""}
          onClick={() => onSelect(wagon.id)}
        >
          {wagon.type} (місць: {wagon.seats})
        </button>
      ))}
    </div>
  );
};