import HomeMainTag from './HomeMainTag'
import HomeNavTag from './HomeNavTag'
import HomeFooterTag from './HomeFooterTag'

import background from '../assets/images/backgrounds/background3.jpg'
import { useEffect } from 'react'

const Home = () => {

    useEffect(() => {
        localStorage.setItem("hotelName", "");
    })

    return (
        <div className = 'w-[100vw] h-[100vh] overflow-x-hidden' style = {{background: `url(${background})`, backgroundSize: 'cover'}}>
            <HomeNavTag/>
            <HomeMainTag/>
            <HomeFooterTag/>
        </div>
    )
}

export default Home;