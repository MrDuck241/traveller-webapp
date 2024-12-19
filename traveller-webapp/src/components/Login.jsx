import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const Login = () => {
    const { setNickname } = useContext(UserContext);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [redirectTo, setRedirectTo] = useState("/");
    const navigate = useNavigate();

    const backToHome = () => {
        navigate('/');
    }

    useEffect(() => {
      const page = localStorage.getItem("currentPage") || "/";
      console.log(page);
      setRedirectTo(page);
    }, [])

    const onSubmitForm = async (event) => {
        event.preventDefault();
        console.log("Form complete");
        
        try {
            const response = await fetch('http://localhost:80/php/login.php', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ login, password }),
              credentials: "include"
            });
      
            const data = await response.json();
            if (data.success) {
              setResponseMessage('Zalogowano pomyślnie');
              setNickname(data.nickname);
              localStorage.setItem("nickname", data.nickname);
              localStorage.setItem("login", data.login);
              console.log(redirectTo);
              navigate(redirectTo);
            } else {
              setResponseMessage('Nieprawidłowy login lub hasło');
            }
          } catch (error) {
            console.error('Błąd przy połączeniu:', error);
            setResponseMessage('Wystąpił błąd serwera');
          }
    }

    return (
        <>
            <form onSubmit={(event) => onSubmitForm(event)}>
                <main style = {{background: `url(assets/images/backgrounds/background4.jpg)`, backgroundSize: 'cover'}} className='h-[100vh] w-[100vw]'>
                    <div className="w-[25vw] h-[65vh] backdrop-blur-[7px] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-[20px] border-[4px] border-solid border-transparent flex flex-col items-center justify-between shadow-custom-hover">
                        <h3 className="w-[100%] text-[10px] sm:text-[15px] md:text-[20px] lg:text-[30px] mt-[40px] text-center italic">Zaloguj się do konta</h3>
                        <div className="w-[80%] h-[30%] mb-[40px] flex flex-col items-center">
                            <input value = {login} onChange = {(e) => setLogin(e.target.value)} type = "email" placeholder = "login" className="w-[80%] h-[50%] bg-transparent outline-none text-[15px] placeholder-black border-solid border-b-2 border-black"></input>
                            <input value = {password} onChange = {(e) => setPassword(e.target.value)} type = "password" placeholder="password" className="w-[80%] h-[50%] bg-transparent outline-none text-[15px] placeholder-black border-solid border-b-2 border-black"></input>
                        </div>
                        <button type='submit' className="w-[60%] h-[10%] mb-[60px] bg-green-500 text-[18px] rounded-[10px] hover:bg-green-900 hover:text-white hover:shadow-custom-hover transition-shadow duration-300">Zaloguj sie</button>
                        <span className="text-white mb-[35px]">{responseMessage || "  "}</span>                    
                    </div>
                </main>
            </form>
        </>
    )
}

export default Login;