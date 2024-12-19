import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useContext, useEffect, useState } from "react";

const NavBtn = ({ text, onClickEvent }) => {
    return (
        <button
            onClick={onClickEvent}
            className="w-[90px] h-[45px] bg-gray-400 font-semibold border-2 border-solid border-transparent rounded-[30px]"
        >
            {text}
        </button>
    );
};

const BackToHomeBtn = ({ onClickEvent }) => {
    return (
        <button
            type="button"
            onClick={onClickEvent}
            style={{
                background: `url('/assets/images/assets/back_arrow_icon.png')`,
                backgroundSize: "cover",
            }}
            className="h-[50px] w-[50px] shrink-0"
        />
    );
};

const HotelNav = () => {

    const [userNickname, setUserNickname] = useState('');
    const { nickname } = useContext(UserContext);

    useEffect(() => {
        localStorage.setItem("currentPage", "/see_hotel");
    }, [])

    useEffect(() => {
        if (!nickname) {
            const storage_nickname = localStorage.getItem("nickname");
            setUserNickname(storage_nickname || '');
        } else {
            setUserNickname(nickname);
        }
    }, [nickname]);

    const navigate = useNavigate();
    const goToLogin = () => {
        localStorage.setItem("currentPage", "/see_hotel");
        navigate("/login");
    }
    const goToHome = () => navigate("/");
    const goToAccount = () => navigate('/user_data');

    const logout = () => {
        setUserNickname("");
        localStorage.setItem("nickname", "");
        localStorage.setItem("currentPage", null);
        localStorage.setItem("login", "");
        localStorage.setItem("adultPrice", null);
        localStorage.setItem("childPrice", null);
        fetch('http://localhost:80/php/logout.php', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },

            body: JSON.stringify({}), 
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            if(data.status == 'success'){
                alert("Wylogowano się z konta pomyślnie");
            }
            else 
                alert("Wystąpił błąd podczas wylogowywania");
        })
        .catch(error => {
            console.error('Błąd:', error); 
        });
        
    }

    return (
        <nav className="h-[80px] bg-gray-200 border-2 border-solid shadow-custom-hover flex justify-between">
            <div className="ml-[10%] flex items-center gap-[15px] mr-[10px]">
                <BackToHomeBtn onClickEvent={goToHome} />
                <span className="text-[10px] md:text-[16px] lg:text-[22px]">Traveller Strona Główna</span>
            </div>
            <div className="flex items-center gap-[10px] sm:gap-[15px] md:gap-[20px] lg:gap-[25px] mr-[10%]">
                {   
                    userNickname ? 
                    <NavBtn text="Wyloguj sie" onClickEvent={logout} />
                    :                   
                    <NavBtn text="Zalgouj sie" onClickEvent={goToLogin} />
                }
                <NavBtn text="Konto" onClickEvent={goToAccount} />
            </div>
        </nav>
    );
};

export default HotelNav;
