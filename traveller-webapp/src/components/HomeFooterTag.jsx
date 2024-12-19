import footerImg from '../assets/images/assets/wood_footer.png'

import './HomeFooter.scss'

const HomeFooterTag = () => {
    return (
        <footer style = {{background: `url(${footerImg})`, backgroundSize: 'cover'}} className='w-[100vw] h-[11vh] flex justify-evenly items-center text-white text-[18px]'>
            <div className='fotter_text'>Traveller sp. z.o.o</div>
            <div className='fotter_text'>+48 856 922 812</div>
            <div className='fotter_text'>siedziba: ul. Karmelowa 23 Warszawa</div>
            <div className='fotter_text'>traveller@gmail.com</div>
        </footer>
    )
}

export default HomeFooterTag;