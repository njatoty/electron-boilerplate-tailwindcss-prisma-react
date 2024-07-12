/* eslint-disable prettier/prettier */
/* eslint-disable import/no-duplicates */
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { ArrowRightStartOnRectangleIcon, CalendarIcon, CircleStackIcon, ClockIcon, Cog6ToothIcon, HomeModernIcon, LockClosedIcon, MapPinIcon, ShoppingBagIcon,  } from '@heroicons/react/24/outline';
import Time from './Time';
import DateComponent from './Date';
import favicon from '../images/favicon.png';
import { getDefaultUser } from '../api/toelectron';


const MainLayout = () => {

    const [user, setUser] = useState<UserType>();

    const init = async () => {
        const defaultUser = await getDefaultUser();
        if (defaultUser) setUser(defaultUser as unknown as UserType);

    }
    useEffect(() => {
        init();
    }, []);
    
    return (
        <div className='w-full flex items-stretch min-h-screen bg-light overflow-x-hidden'>
            <div className="flex flex-col bg-dark text-light w-full max-w-[230px] flex-shrink-0">
                <div className="w-full">
                    <img src={favicon} alt="favicon" />
                </div>
                <div className="flex-grow h-full">
                    <NavLink className='menu-link px-4' to="/main" end>
                        <HomeModernIcon className='icon' />
                        Accueil
                    </NavLink>
                    <NavLink className='menu-link px-4' to="/main/colis" end>
                        <ShoppingBagIcon className='icon' />
                        Gestion colis
                    </NavLink>
                    <NavLink className='menu-link px-4' to="/main/variables" end>
                        <CircleStackIcon className='icon' />
                        Variables
                    </NavLink>
                    <NavLink className='menu-link px-4' to="/main/setting" end>
                        <Cog6ToothIcon className='icon' />
                        Paramètres
                    </NavLink>
                </div>
                <div className="w-full">
                    <div className="grid grid-cols-2 border-t border-light/20 divide-x divide-light/20">
                        <NavLink className='menu-link mini' to="/lock">
                            <LockClosedIcon className='icon' />
                        </NavLink>
                        <NavLink className='menu-link mini' to="/lock">
                            <ArrowRightStartOnRectangleIcon className='icon' />
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className="flex flex-grow">
                <div className="h-full flex flex-col w-full">
                    <div className="w-full bg-gold py-3]">
                        <div className="flex items-stretch justify-between gap-6 text-dark">
                            <div className="grid grid-cols-3 text-white rounded-full text-sm">
                                <div className="flex h-full items-center gap-2 parrallelogram-r bg-white py-1 text-black px-12">
                                    <ClockIcon className='w-7 bg-white text-gold p-1 rounded-full' />
                                    <Time />
                                </div>
                                <div className="flex items-center gap-2 parrallelogram bg-white py-1 text-black px-12 -translate-x-[30px]">
                                    <CalendarIcon className='w-7 bg-white text-gold p-1 rounded-full' />
                                    <DateComponent />
                                </div>
                                <div className="flex items-center gap-2 parrallelogram bg-white py-1 text-black px-12 -translate-x-[60px]">
                                    <MapPinIcon className='w-7 bg-white text-gold p-1 rounded-full' />
                                    <span>{user?.location.name ?? '----'}</span>
                                </div>
                            </div>
                            {/* <div className="flex items-center gap-2 text-white p-2 rounded-full border border-white/30 text-sm">
                            <UserCircleIcon className='w-7' />
                            <span>Admin</span>
                        </div> */}
                        </div>
                    </div>

                    <Outlet />

                </div>
            </div>
        </div>
    )
}

export default MainLayout