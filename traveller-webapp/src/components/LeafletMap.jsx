import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { Icon, divIcon, point } from "leaflet";

const LeafletMap = ({ changeHotelData }) => {
  const backendUrl = 'http://localhost:80/php/get_hotels.php';

  const [hotels, setHotels] = useState([]); // State to store data of hotels
  const [loading, setLoading] = useState(true); // State to track loading data
  const [error, setError] = useState(null); // State to store errors

  const customIcon = new Icon({
    iconUrl: "assets/images/assets/map_point.png",
    iconSize: [38, 38] // size of the icon
  });

  // Getting data from backend
  useEffect(() => {
    fetch(backendUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error during loading data');
        }
        return response.json();
      })
      .then((data) => {
        setHotels(data.data); // Saving hotels data to state variable
        setLoading(false); // Turning off loading state
      })
      .catch((err) => {
        setError(err.message); // Saving error in state
        setLoading(false); // Turning off loading state
      });
  }, []); // Empty array means, that effect will start only once during mounting component

  // Error handling lub loading
  if (loading) return <div>Ładowanie danych...</div>;
  if (error) return <div>Błąd: {error}</div>;

  return (
    <MapContainer
    className='rounded-[12px]'
      center={[49.296911, 19.950474]}
      zoom={14}
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        maxZoom={19}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {hotels.map((hotel) => (
        <Marker key={hotel.id} position={hotel.coords} eventHandlers={{click: () => changeHotelData(true, hotel)}} icon={customIcon}>
          <Popup>
            <div>
              <h3>{hotel.name}</h3>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LeafletMap;
