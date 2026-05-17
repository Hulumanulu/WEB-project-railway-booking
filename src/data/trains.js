export const trains = [
  {
    id: 1,
    number: "743К",
    route: "Київ → Львів",
    from: "Київ",
    to: "Львів",
    departure: "2025-05-20T08:30:00",
    arrival: "2025-05-20T13:50:00",
    duration: "5 год 20 хв",
    price: 450,
    wagons: [
      { id: 1, type: "Купе", seats: 36, bookedSeats: [] },
      { id: 2, type: "Плацкарт", seats: 54, bookedSeats: [] },
      { id: 3, type: "Люкс", seats: 18, bookedSeats: [] }
    ]
  },
  {
    id: 2,
    number: "105Л",
    route: "Харків → Одеса",
    from: "Харків",
    to: "Одеса",
    departure: "2025-05-20T10:15:00",
    arrival: "2025-05-20T18:25:00",
    duration: "8 год 10 хв",
    price: 580,
    wagons: [
      { id: 1, type: "Купе", seats: 36, bookedSeats: [] },
      { id: 2, type: "Плацкарт", seats: 54, bookedSeats: [] }
    ]
  },
  {
    id: 3,
    number: "026К",
    route: "Київ → Харків",
    from: "Київ",
    to: "Харків",
    departure: "2025-05-20T07:00:00",
    arrival: "2025-05-20T13:30:00",
    duration: "6 год 30 хв",
    price: 520,
    wagons: [
      { id: 1, type: "Купе", seats: 36, bookedSeats: [] },
      { id: 2, type: "Плацкарт", seats: 54, bookedSeats: [] }
    ]
  },
  {
    id: 4,
    number: "012Л",
    route: "Львів → Одеса",
    from: "Львів",
    to: "Одеса",
    departure: "2025-05-20T09:45:00",
    arrival: "2025-05-20T18:15:00",
    duration: "8 год 30 хв",
    price: 620,
    wagons: [
      { id: 1, type: "Купе", seats: 36, bookedSeats: [] },
      { id: 2, type: "Люкс", seats: 18, bookedSeats: [] }
    ]
  },
  {
    id: 5,
    number: "089Д",
    route: "Дніпро → Львів",
    from: "Дніпро",
    to: "Львів",
    departure: "2025-05-20T14:20:00",
    arrival: "2025-05-20T22:50:00",
    duration: "8 год 30 хв",
    price: 490,
    wagons: [
      { id: 1, type: "Плацкарт", seats: 54, bookedSeats: [] },
      { id: 2, type: "Купе", seats: 36, bookedSeats: [] }
    ]
  },
  {
    id: 6,
    number: "038К",
    route: "Київ → Івано-Франківськ",
    from: "Київ",
    to: "Івано-Франківськ",
    departure: "2025-05-20T06:30:00",
    arrival: "2025-05-20T12:45:00",
    duration: "6 год 15 хв",
    price: 470,
    wagons: [
      { id: 1, type: "Купе", seats: 36, bookedSeats: [] },
      { id: 2, type: "Плацкарт", seats: 54, bookedSeats: [] }
    ]
  },
  {
    id: 7,
    number: "007Ч",
    route: "Чернівці → Київ",
    from: "Чернівці",
    to: "Київ",
    departure: "2025-05-20T15:10:00",
    arrival: "2025-05-20T21:40:00",
    duration: "6 год 30 хв",
    price: 510,
    wagons: [
      { id: 1, type: "Купе", seats: 36, bookedSeats: [] },
      { id: 2, type: "Люкс", seats: 18, bookedSeats: [] }
    ]
  },
  {
    id: 8,
    number: "056З",
    route: "Запоріжжя → Львів",
    from: "Запоріжжя",
    to: "Львів",
    departure: "2025-05-20T11:00:00",
    arrival: "2025-05-20T20:30:00",
    duration: "9 год 30 хв",
    price: 650,
    wagons: [
      { id: 1, type: "Плацкарт", seats: 54, bookedSeats: [] },
      { id: 2, type: "Купе", seats: 36, bookedSeats: [] }
    ]
  }
];