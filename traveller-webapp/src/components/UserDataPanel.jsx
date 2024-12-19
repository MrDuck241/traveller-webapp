import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const UserDataPanel = () => {
    const backendUrl = "http://localhost:80/php/get_user_data.php";
    const backendUrl2 = "http://localhost:80/php/get_user_reservations.php";

    const [userNickname, setUserNickname] = useState(null);
    const [userLogin, setUserLogin] = useState(null);
    const [userPhone, setUserPhone] = useState(null);
    const [userPassword, setUserPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [reservations, setReservations] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();
    const goToHome = () => navigate("/");

    const backToHomeBtn = (onClickHandler) => {
        return (
            <button
                type="button"
                onClick={onClickHandler}
                style={{
                    background: `url('/assets/images/assets/back_arrow_icon.png')`,
                    backgroundSize: "cover",
                }}
                className="h-[50px] w-[50px] shrink-0"
            />
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            const login = localStorage.getItem("login");
            if (!login) {
                setErrorMsg("Brak loginu w pamięci lokalnej.");
                return;
            }
    
            try {
                const [response1, response2] = await Promise.all([
                    fetch(backendUrl, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ login }),
                        credentials: "include",
                    }),
                    fetch(backendUrl2, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ login }),
                        credentials: "include",
                    }),
                ]);
    
                const data1 = await response1.json();
                const data2 = await response2.json();
    
                if (data1.status === "success") {
                    setUserNickname(data1.data.nickname);
                    setUserLogin(data1.data.login);
                    setUserPhone(data1.data.phone);
                    setUserPassword(data1.data.password);
                } else {
                    setErrorMsg("Nie jesteś zalogowany");
                    return;
                }
    
                if (data2.status === "success") {
                    console.log(data2.data);
                    setReservations(data2.data || null);
                } else {
                    setErrorMsg("Nie udało się pobrać danych o rezerwacjach");
                }
            } catch (error) {
                setErrorMsg("Wystąpił błąd serwera");
            }
        };
    
        fetchData();
    }, []);
    
    const reservationBlock = (reservation) => {
        return (
            <div className="h-[60%] w-[300px] bg-slate-300 flex flex-col items-center rounded-[6px]">
                <span>{reservation.hotel_name}</span>
                <span>Data zakwaterowania: {reservation.reservation_date}</span>
                <span>Ilość dni pobytu: {reservation.days}</span>
                <span>Cena pobytu: {reservation.summary_price} zł</span>
                <span>Ilość dorosłych: {reservation.adults}</span>
                <span>Ilość dzieci: {reservation.childs}</span>
                <span>Czy wykupione WiFi {reservation.wifi ? "Tak" : "Nie"}</span>
                <span>Czy wykupione śniadania {reservation.food ? "Tak" : "Nie"}</span>
            </div>
        );
    };    

    return (
        <div className="w-[100vw] h-[100vh] bg-slate-200">
            <nav className="w-[100vw] h-[13vh] bg-slate-300 flex justify-between items-center pl-[25px]">
                <div className="flex items-center gap-[10px]">
                    {backToHomeBtn(goToHome)}
                    <span className="text-[10px] md:text-[16px] lg:text-[22px]">
                        Traveller Home Page
                    </span>
                </div>
                <span className="text-[16px] sm:text-[20px] md:text-[25px] lg:text-[30px] font-semibold italic text-center mr-[30%] lg:mr-[42%]">
                    Dane twojego konta
                </span>
            </nav>
            <main className="w-[100vw] h-[87vh] flex flex-col justify-evenly items-center">
                <div className="w-[80vw] h-[50%] grid grid-cols-2 grid-rows-2 gap-4">
                    <div className="flex flex-col items-center justify-center bg-red-500 text-white rounded-md shadow-custom-hover text-center">
                        {errorMsg ? errorMsg :                         
                        <>
                            <span className="font-bold text-lg">Login</span>
                            <span>{userLogin || "Brak danych"}</span>
                        </>
                        }
                    </div>
                    <div className="flex flex-col items-center justify-center bg-blue-500 text-white rounded-md shadow-custom-hover text-center">
                        {errorMsg ? errorMsg :                         
                        <>
                            <span className="font-bold text-lg">Password</span>
                            <div className="flex items-center">
                                <span>{userPassword ? (showPassword ? userPassword : "**********") : "Brak danych"}</span>
                                {userPassword &&                                 
                                <button 
                                    type="button" 
                                    onClick={() => setShowPassword(!showPassword)} 
                                    className="w-[20px] h-[20px] ml-[10px]"
                                    style={{
                                        backgroundImage: showPassword 
                                            ? 'url(/assets/images/assets/hide_password.png)' 
                                            : 'url(/assets/images/assets/show_password.png)',
                                        backgroundSize: 'cover'
                                    }}
                                >
                                </button>}
                            </div>
                        </>
                        }
                    </div>
                    <div className="flex flex-col items-center justify-center bg-green-500 text-white rounded-md shadow-custom-hover text-center">
                        {errorMsg ? errorMsg :                         
                        <>
                            <span className="font-bold text-lg">Nickname</span>
                            <span>{userNickname || "Brak danych"}</span>
                        </>
                        }
                    </div>
                    <div className="flex flex-col items-center justify-center bg-yellow-500 text-white rounded-md shadow-custom-hover text-center">
                        {errorMsg ? errorMsg :                         
                        <>
                            <span className="font-bold text-lg">Phone Number</span>
                            <span>{userPhone || "Brak danych"}</span>
                        </>
                        }
                    </div>
                </div>
                <div className="w-[80vw] h-[35%] bg-slate-400 rounded-[10px] pl-[30px] pr-[30px] shadow-custom-hover overflow-x-auto flex items-center justify-evenly gap-[20px]">
                    {!reservations ? "Brak rezerwacji do wyświetlenia" : <>
                        {reservations.map((reservation, index) => {
                            return (
                                <div key={index}>
                                    {reservationBlock(reservation)}
                                </div>
                            );
                        })}
                    </>}
                </div>
            </main>
        </div>
    );
};

export default UserDataPanel;
