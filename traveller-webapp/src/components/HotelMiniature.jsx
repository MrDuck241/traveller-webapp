import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HotelContext } from './HotelContext';
import { useContext } from "react";

import './HomeMainStyle.scss'

const HotelMiniature = ({ show, hotelData }) => {
    if (!hotelData) return null;

    const {setHotelName} = useContext(HotelContext);
    const hotelImgsPath = "assets/images/hotel_images/";
    const [hotelImgPath, setHotelImgPath] = useState('');

    const setHotelImg = (img) => {
        let path = hotelImgsPath + img;
        setHotelImgPath(path);
    };
    const navigate = useNavigate();
    const goToSubsite = () => {
        navigate('/see_hotel');
    }

    useEffect(() => {
        if (hotelData && hotelData.img) {
            setHotelImg(hotelData.img);
        }

        setHotelName(hotelData.name);
    }, [hotelData]);

    return (
        <div id="hotelMiniature" style={{borderImage: `url(assets/images/assets/wood_frame.png) 15% round`}}>
            {show && (
                <>
                    <div
                        style={{ background: 'rgba(206, 169, 99, 0.743)', fontFamily: `Georgia, 'Times New Roman', Times, serif` }}
                        className='w-[90%] h-[10%] text-[8px] sm:text-[10px] md:text-[15px] xl:text-[20px] border-2 border-solid border-black rounded-[8px] text-center'
                    >
                        {hotelData.name}
                    </div>
                    <div className='w-[100%] h-[85%] flex flex-row justify-evenly items-center'>
                        <div className='w-[57%] h-[90%] border-2 border-solid border-black rounded-[10px] bg-transparent'>
                            <img src={hotelImgPath} className = 'w-[100%] h-[100%] object-fill rounded-[10px]' alt={hotelData.name} />
                        </div>
                        <div
                            style={{ background: 'rgba(191, 133, 133, 0.696)' }}
                            className='w-[33%] h-[90%] border-2 border-solid border-black rounded-[8px] bg-green-500 relative flex flex-col items-center justify-between'>
                                <div>
                                    <div className='w-[100%] text-[6px] sm:text-[8px] md:text-[12px] lg:text-[15px] mt-[10px] text-center'>Średnia cena dla dorosłego: {hotelData.adult_price}</div>
                                    <div className='w-[100%] text-[6px] sm:text-[8px] md:text-[12px] lg:text-[15px] mt-[10px] text-center'>Średnia cena dla dziecka: {hotelData.kid_price}</div>
                                </div>
                                <button onClick = {() => goToSubsite()} className='w-[60%] h-[18%] mb-[30px] bg-gray-400 text-[6px] sm:text-[8px] md:text-[12px] lg:text-[15px] mt-[10px] hover:bg-gray-700 hover:text-white text-center border-2 border-solid border-black rounded-[5px] hover:shadow-custom-hover transition-shadow duration-300'>Więcej o hotelu</button>
                            </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default HotelMiniature;
