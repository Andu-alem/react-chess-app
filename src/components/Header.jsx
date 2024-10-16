import { useState } from 'react';
import Bar3CenterLeftIcon from '@heroicons/react/24/solid/Bars3CenterLeftIcon'
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon'
import SettingsBar from './SettingsBar';

const Header = ({ menuClicked, setMenuClicked, settingBarProps }) => {

    return (
        <header className="flex justify-around shadow-sm shadow-zinc-600 p-1 bg-gradient-to-r from-zinc-700 pl-[15px]">
            <h2 className="w-10/12 text-[34px] font-bold italic bg-gradient-to-r from-amber-500 via-white to-white inline-block text-transparent bg-clip-text">ChessZone</h2> 
            <div className="w-2/12 pt-2 sm:hidden" onClick={ () => setMenuClicked(!menuClicked) }>
                <Bar3CenterLeftIcon className={`${menuClicked ? 'hidden':'block'} w-[42px] h-[42px] rotate-180 text-white hover:text-amber-500`} />
                <XMarkIcon className={`${!menuClicked ? 'hidden':'block'} w-[42px] h-[42px] text-white hover:text-amber-400`} />
            </div>

            <div className={`${menuClicked ? 'fixed':'hidden'} sm:hidden top-14 right-1 h-[90vh] overflow-auto scrollbar-hide bg-black w-[70vw] opacity-[0.9] tracking-wide`}>
                <SettingsBar { ...settingBarProps } setMenuClicked={setMenuClicked} />
            </div>
        </header>
    )
}

export default Header