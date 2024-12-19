import { createContext, useState } from "react";

export const HotelContext = createContext();

export const HotelProvider = ({ children }) => {
  const [hotelName, setHotelName] = useState("");

  return (
    <HotelContext.Provider value={{ hotelName, setHotelName }}>
      {children}
    </HotelContext.Provider>
  );
};
