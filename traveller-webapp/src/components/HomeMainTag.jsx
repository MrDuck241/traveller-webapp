import { useState } from 'react';
import LeafletMap from './LeafletMap';
import HotelMiniature from './HotelMiniature';

import './HomeMainStyle.scss'

const HomeMainTag = () => {
    const [hotelMiniatureData, setHotelMiniatureData] = useState(null);
    const [showHotelMiniature, setShowHotelMiniature] = useState(false);

    const showHotel = (show, data) => {
        setShowHotelMiniature(show);
        setHotelMiniatureData(data);
    }

    return (
        <main className='main_container'>
            <div className='main_box'>
                <HotelMiniature show={showHotelMiniature} hotelData={hotelMiniatureData}/>
                <div id="map">
                    <LeafletMap changeHotelData={showHotel}/>
                </div>
            </div>
        </main>
    );
};

export default HomeMainTag;
