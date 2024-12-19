import { useNavigate } from 'react-router-dom';
import { UserContext } from "./UserContext";
import { useContext, useEffect } from "react";
import { useState } from 'react';
import './HomeNavTag.scss'

const HomeNavTag = () => {
    const { nickname } = useContext(UserContext);
    const [userNickname, setUserNickname] = useState('');

    useEffect(() => {
        if(nickname == "" || nickname == null || nickname == undefined){
            const storage_nickname = localStorage.getItem("nickname");
            if (!storage_nickname) {
                setUserNickname('');
            }   
            else setUserNickname(storage_nickname);
        }
        else{
            setUserNickname(nickname);
        }
    }, [nickname, userNickname])

    const userLoggedInfo = (username) => {
        return "Zalogowano jako: " + username;
    }

    const navigate = useNavigate();

    const logout = () => {
        localStorage.setItem("currentPage", null);
        setUserNickname("");
        localStorage.setItem("nickname", "");
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

    const goToLogin = () => {
        localStorage.setItem("currentPage", "/");
        navigate('/login');
      };

    const goToAccount = () => {
        navigate('/user_data');
    };

    const goToRegister = () => {
        navigate('/register');
    }

    return (
        <nav className = 'w-[100vw] h-[20vh] pl-[40px] bg-stone-100 rounded-t-none rounded-b-[25px] flex justify-evenly items-center gap-[10%] pt-0'>
            <button style = {{background: `url(assets/images/assets/leaf.png)`, backgroundClip: `text`, backgroundSize: 'cover', flex: '1'}} className = "hotelNameBtn">Traveller</button>
            <img style = {{flex: '1'}} className = 'h-[90%] object-cover' src="assets/images/assets/plane.png" alt='plane img'></img>
            <div style = {{flex: '2'}} className='flex flex-col h-[100%] mr-[20px]'>
                <div className='w-[100%] h-[75%] flex justify-evenly pt-[15px] overflow-x-auto'>
                    {
                        userNickname ? 
                        <button className='h-[53%] w-[25%] bg-gray-700 border-[3px] border-solid border-black text-white text-[6px] md:text-[10px] lg:text-[17px] shadow-[30px] shrink-0 rounded-[6px] hover:shadow-custom-hover transition-shadow duration-300' onClick = {logout}>Wyloguj się</button>  
                        :
                        <button className='h-[53%] w-[25%] bg-gray-700 border-[3px] border-solid border-black text-white text-[6px] md:text-[10px] lg:text-[17px] shadow-[30px] shrink-0 rounded-[6px] hover:shadow-custom-hover transition-shadow duration-300' onClick = {goToLogin}>Zaloguj się</button>
                    }
                    <button className='h-[53%] w-[25%] bg-gray-700 border-[3px] border-solid border-black text-white text-[6px] md:text-[10px] lg:text-[17px] shadow-[30px] shrink-0 rounded-[6px] hover:shadow-custom-hover transition-shadow duration-300' onClick = {goToRegister}>Zajerestruj się</button>
                    <button className='h-[53%] w-[25%] bg-gray-700 border-[3px] border-solid border-black text-white text-[6px] md:text-[10px] lg:text-[17px] shadow-[30px] shrink-0 rounded-[6px] hover:shadow-custom-hover transition-shadow duration-300' onClick = {goToAccount}>Konto</button>
                </div>
                <span className='w-[100%] text-center mb-[10px] text-[10px] md:text-[14px] lg:text-[18px] font-semibold'>{userNickname ? userLoggedInfo(userNickname) : "Nie zalogowano się do konta"}</span>
            </div>
        </nav>
    )
}

export default HomeNavTag;