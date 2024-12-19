import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();

    const backToHome = () => {
        navigate('/');
    }

    const [login, setLogin] = useState('');
    const [phone, setPhone] = useState('');
    const [nick, setNick] = useState('');
    const [password, setPassword] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const onSubmitForm = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:80/php/register.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ login: login, password: password, nick: nick, phone: phone }),
            });
      
            const data = await response.json();
            if (data.status == 'success') {
              setResponseMessage(data.message);
              backToHome();
            } else {
              setResponseMessage(data.message);
            }
          } catch (error) {
            console.error('Błąd przy połączeniu:', error);
            setResponseMessage('Wystąpił błąd serwera');
          }
    }

    return (
        <form onSubmit={(event) => onSubmitForm(event)}>
        <main style = {{background: `url(assets/images/backgrounds/background4.jpg)`, backgroundSize: 'cover'}} className='h-[100vh] w-[100vw]'>
            <div className="absolute w-[40%] h-[60%] backdrop-blur-[8px] left-1/2 top-1/2  transform -translate-x-1/2 -translate-y-1/2 rounded-[20px] border-[4px] border-solid border-transparent flex flex-col items-center justify-between shadow-custom-hover">
                <span className="text-[10px] sm:text-[15px] md:text-[20px] lg:text-[30px] italic text-center mt-[10px]">Stwórz swoje konto</span>
                <input value = {login} onChange = {(e) => setLogin(e.target.value)} type = "email" placeholder="Enter email" className="w-[70%] h-[10%] bg-transparent outline-none text-[7px] sm:text-[8px] md:text-[11px] lg:text-[15px] placeholder-black border-solid border-b-2 border-black"></input>
                <input value = {phone}  onChange = {(e) => setPhone(e.target.value)} type = "number" placeholder="Enter phone number" className="w-[70%] h-[10%] bg-transparent outline-none text-[7px] sm:text-[8px] md:text-[11px] lg:text-[15px] placeholder-black border-solid border-b-2 border-black"></input>
                <input value = {nick}  onChange = {(e) => setNick(e.target.value)} type = "text" placeholder="Enter nick" className="w-[70%] h-[10%] bg-transparent outline-none text-[7px] sm:text-[8px] md:text-[11px] lg:text-[15px] placeholder-black border-solid border-b-2 border-black"></input>
                <input value = {password}  onChange = {(e) => setPassword(e.target.value)} type = "password" placeholder="Enter password" className="w-[70%] h-[10%] bg-transparent outline-none text-[7px] sm:text-[8px] md:text-[11px] lg:text-[15px] placeholder-black border-solid border-b-2 border-black"></input>
                <button type = "submit" className="w-[30%] h-[12%] bg-green-500 border-2 text-[7px] sm:text-[8px] md:text-[11px] lg:text-[15px] border-solid border-transparent rounded-[10px] mb-[40px] mt-[20px] hover:bg-green-900 hover:text-white hover:shadow-custom-hover transition-shadow duration-300">Stwórz konto</button>       
                <span>{responseMessage}</span>            
            </div>
        </main>
    </form>
    )
}

export default Register;