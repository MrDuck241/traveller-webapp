import { useState, useEffect, useCallback, useRef } from "react";
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ReservationPopup = ({ showReservation, setShowReservation, reservationPopup, hotelName, hotelId }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [childNumber, setChildNumber] = useState(0);
    const [adultNumber, setAdultNumber] = useState(0);
    const [wifiSelected, setWifiSelected] = useState(false);
    const [foodSelected, setFoodSelected] = useState(false);
    const [reservationPrice, setReservationPrice] = useState(0);
    const [dayAmount, setDayAmount] = useState(0);
    const [adultPrice, setAdultPrice] = useState(0);
    const [childPrice, setChildPrice] = useState(0);
    const [responseMessage, setResponseMessage] = useState("");
    const [userNickname, setUserNickname] = useState('');
    const [todayDate, setTodayDate] = useState(null);

    const handleDateChange = (date) => setSelectedDate(date);

    const closePopup = useCallback(() => setShowReservation(false), [setShowReservation]);

    const handleReservation = async () => {
        const formattedDate = format(selectedDate, 'yyyy-MM-dd');
        let login = localStorage.getItem("login");
        const wifi = wifiSelected ? 1 : 0;
        const food = foodSelected ? 1 : 0;   
        

        try {
            const response = await fetch('http://localhost:80/php/save_reservation.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ 
                login, 
                selectedDate: formattedDate, 
                dayAmount, 
                reservationPrice, 
                childNumber, 
                adultNumber, 
                wifi,
                food,
                hotelName, 
                hotelId}),
                credentials: "include"
            });
      
            const data = await response.json();
            if (data.status == "success") {
              setResponseMessage('Pomyślnie zapisano rezerwacje');
            } else if(data.status == "error"){
              setResponseMessage(data.message);
            }
          } catch (error) {
            console.error('Błąd przy połączeniu:', error);
            console.log(error);
            setResponseMessage('Wystąpił błąd serwera');
          }
    }

    useEffect(() => {
        setAdultPrice(localStorage.getItem("adultPrice"));
        setChildPrice(localStorage.getItem("childPrice"));
        let login = localStorage.getItem("login");
        setUserNickname(login);
        const today = new Date();
        setTodayDate(today);
    }, [hotelName])

    useEffect(() => {
        let basePrice = 0;
        basePrice = (childNumber * childPrice * dayAmount) + (adultNumber * adultPrice * dayAmount);
        if (wifiSelected) basePrice += 50;
        if (foodSelected) basePrice += ((adultNumber + childNumber) * 30 * dayAmount);

        setReservationPrice(basePrice); 
    }, [childNumber, adultNumber, wifiSelected, foodSelected, dayAmount, adultPrice, childPrice])

    // Listener kliknięcia poza popup
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (reservationPopup.current && !reservationPopup.current.contains(event.target)) {
                closePopup();
            }
        };

        if (showReservation) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showReservation, closePopup, reservationPopup]);

    return (
        <>
            <div className="w-[100vw] h-[100vh] z-30 backdrop-blur-lg fixed"></div>
            <div
                id="res"
                ref={reservationPopup}
                className="w-[60%] h-[70%] fixed bg-slate-300 z-40 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-custom-hover rounded-[12px] flex flex-col items-center justify-between overflow-y-auto"
            >
                <div className="w-[100%] h-[60px] flex items-center pr-[15px] justify-center">
                    <span className="w-[100%] text-xl italic font-semibold text-center">
                        Zarezerwuj swój pobyt w wybranym hotelu
                    </span>
                    <button
                        onClick={closePopup}
                        type="button"
                        className="h-[40px] w-[40px]"
                    >
                        <img
                            src="/assets/images/assets/close_btn.png"
                            className="w-[100%] h-[100%] object-fill"
                            alt="Zamknij"
                        />
                    </button>
                </div>
                <div className="flex flex-row w-[50%] justify-between mt-[20px]">
                    <span>Wybierz datę rezerwacji</span>
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        minDate={todayDate}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Wybierz datę"
                        className="border-2 border-solid border-black rounded-[6px] text-center"
                    />
                </div>
                <div className="w-[50%] flex justify-between mt-[10px]">
                    Ilość dni pobytu w hotelu
                    <input
                        value={dayAmount}
                        onChange={(e) => {
                            setDayAmount(Number(e.target.value));
                        }}
                        type="number"
                        min={0}
                        max={30}
                        placeholder="Podaj liczbę"
                        className="w-[120px] border-2 border-solid border-black rounded-[6px]"
                    />
                </div>
                <div className="w-[50%] flex justify-between mt-[10px]">
                    <span>Cena za dorosłego: {adultPrice}</span><span>Cena za dziecko: {childPrice}</span>
                </div>
                <div className="w-[50%] flex justify-between mt-[10px]">
                    Ilość dorosłych w pokoju
                    <input
                        value={adultNumber}
                        onChange={(e) => {
                            setAdultNumber(Number(e.target.value));
                        }}
                        type="number"
                        min={0}
                        max={5}
                        placeholder="Podaj liczbę"
                        className="w-[120px] border-2 border-solid border-black rounded-[6px]"
                    />
                </div>
                <div className="w-[50%] flex justify-between mt-[10px]">
                    Ilość dzieci w pokoju
                    <input
                        value={childNumber}
                        onChange={(e) => {
                            setChildNumber(Number(e.target.value));
                           // handlePriceChange();
                        }}
                        type="number"
                        min={0}
                        max={5}
                        placeholder="Podaj liczbę"
                        className="w-[120px] border-2 border-solid border-black rounded-[6px]"
                    />
                </div>
                <div className="w-[50%] flex justify-between mt-[10px]">
                    Czy pokój ma mieć prywatne WiFi (50zł)
                    <input
                        checked={wifiSelected}
                        onChange={(e) => {
                            setWifiSelected(e.target.checked);
                            //handlePriceChange();
                        }}
                        type="checkbox"
                        className="w-[40px]"
                    />
                </div>
                <div className="w-[50%] flex justify-between mt-[10px]">
                    Czy śniadanie hotelowe (30zł za osobę na dzień)
                    <input
                        checked={foodSelected}
                        onChange={(e) => {
                            setFoodSelected(e.target.checked);
                            //handlePriceChange();
                        }}
                        type="checkbox"
                        className="w-[40px]"
                    />
                </div>
                <div className="mt-[15px]">
                    <span>Łączna cena: </span>
                    <span>{reservationPrice.toFixed(2)} zł</span>
                </div>
                <button
                    type="button"
                    onClick={() => handleReservation()}
                    disabled={!userNickname}
                    title={!userNickname ? 'You need to log in' : ''}
                    className={`w-[150px] h-[60px] border-2 border-solid border-black rounded-[8px] mt-[20px] text-white bg-red-600 mb-[10px] 
                        ${!userNickname ? 'cursor-not-allowed opacity-50' : 'cursor-pointer opacity-100'}`}
                >
                    Zarezerwuj
                </button>
                {responseMessage}
            </div>
        </>
    );
};

export default ReservationPopup;
