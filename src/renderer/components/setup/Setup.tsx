import { ArrowLeftIcon, ArrowRightIcon, CogIcon, KeyIcon, MapPinIcon, UserIcon } from '@heroicons/react/24/outline'
import React, { FormEvent, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';
import 'swiper/css';
import { createUser, getDefaultUser, getLocations } from '../../api/toelectron';
import { Navigate } from 'react-router-dom'
import Loading from '../Loading';
import SelectInputLocation from '../SelectInputLocation';

// dans ce setup, on va demander l'utilisateur de remplir quelques informations
/**
 * 1 - Nom de l'utilisateur
 * 2 - Location
 * 3 - Mot de passe (optionnel)
 */
const Setup = () => {
    const [username, setUsername] = useState('');
    const [location, setLocation] = useState(''); // Id from db
    const [locations, setLocations] = useState<Location[]>([]); // Id from db
    const [password, setPassword] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [isChecking, setChecking] = useState(true);
    // state for checking if a default user has been created
    const [isSet, setIsSet] = useState(false);

    useEffect(() => {
        // check if default has already been created
        getDefaultUser().then(defaultUser => {
            // if (defaultUser) setIsSet(true);
            console.log(defaultUser);
    
            if (!defaultUser) {
                // hide loading and show the step forms
                setChecking(false);
            } else {
                setChecking(false);
                // redirect if found
                setIsSet(true);
            }
        }).catch(err => console.log(err));

        // get locations
        getLocations().then((allLocations) => {
            setLocations(allLocations as unknown as Location[]);
        });

    }, []);


    const [swiper, setSwiper] = useState<SwiperType>();

    function handleSubmitUsername(e: FormEvent) {
        e.preventDefault();
        setLoading(false);
        swiper?.slideNext();
    }

    // submit location form
    function handleSubmitLocation(e: FormEvent) {
        e.preventDefault();
        swiper?.slideNext();
    }

    // submit password form
    async function handleSubmitPassword(e: FormEvent) {
        e.preventDefault();
        if (password === confirmPwd) {
            const newUser = {
                name: username,
                password: password,
                locationId: location,
                default: true
            };

            const createdUser = await createUser(newUser);

            console.log("created user", createdUser);

            if (createUser !== null) {
                // redirect to main
                setIsSet(true);
            }
        }
    }
    
    if (isSet) return <Navigate to={'/main'} />

    if (isChecking) return <Loading />

    return (
        <div className="w-full flex min-h-screen bg-light setup-container">
            <Swiper
                initialSlide={0}
                className='self-strech m-auto !overflow-y-visible'
                allowTouchMove={false}
                onInit={(swp) => setSwiper(swp)}
            >
                {/* Slider for username */}
                <SwiperSlide>
                    <div className="min-h-screen flex">
                        <div className="m-auto max-w-sm ">
                            <h2 className="setup-title">
                                Veuillez entrer votre nom.
                            </h2>

                            <form className="flex flex-col p-3" onSubmit={handleSubmitUsername}>
                                <div className="login-form-group mb-3">
                                    <UserIcon className='icon' />
                                    <input type="text" placeholder="Votre nom" className="login-input"
                                        value={username}
                                        onChange={e => setUsername(e.currentTarget.value)}
                                        required
                                    />
                                </div>
                                <div className="w-full mt-2">
                                    <button type='submit' className="login-button text-lg" disabled={isLoading}>
                                        {isLoading ? 'Validation' : 'Suivant'}
                                        {isLoading ? <CogIcon className='icon animate-spin' /> : <ArrowRightIcon className='icon' />}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slider for Location */}
                <SwiperSlide>
                    <div className="min-h-screen flex">
                        <div className="m-auto max-w-sm">
                            <h2 className="setup-title">
                                Veuillez choisir votre location.
                            </h2>

                            <form className="flex flex-col p-3" onSubmit={handleSubmitLocation}>
                                <SelectInputLocation id="location" data={locations} onChange={val => setLocation(val)} />
                                <div className="w-full mt-2 grid grid-cols-2 gap-2">
                                    <button type='button' className="login-button btn-gray text-lg" onClick={() => swiper?.slidePrev()}>
                                        <ArrowLeftIcon className='icon' />
                                        Précédent
                                    </button>
                                    <button type='submit' className="login-button text-lg" disabled={isLoading}>
                                        {isLoading ? 'Validation' : 'Suivant'}
                                        {isLoading ? <CogIcon className='icon animate-spin' /> : <ArrowRightIcon className='icon' />}
                                    </button>

                                </div>
                            </form>
                        </div>
                    </div>
                </SwiperSlide>

                {/* Slider for mot de passe*/}
                <SwiperSlide>
                    <div className="min-h-screen flex">
                        <div className="m-auto max-w-sm">
                            <h2 className="setup-title">
                                Définissez votre mot de passe.
                            </h2>

                            <form className="flex flex-col p-3" onSubmit={handleSubmitPassword}>
                                <div className="login-form-group mb-2">
                                    <KeyIcon className='icon' />
                                    <input type="password" placeholder="Mot de passe" className="login-input"
                                        value={password}
                                        onChange={e => setPassword(e.currentTarget.value)}
                                        required
                                    />
                                </div>
                                <div className="login-form-group mb-2">
                                    <KeyIcon className='icon' />
                                    <input type="password" placeholder="Repétez le Mot de passe" className="login-input"
                                        value={confirmPwd}
                                        onChange={e => setConfirmPwd(e.currentTarget.value)}
                                        required
                                    />
                                </div>
                                <span className='my-2 text-gold text-xs text-center'>{(password !== confirmPwd) ? 'Les mots de passe ne se conforment pas!' : ''}</span>
                                <div className="w-full mt-2">
                                    <button type='submit' className="login-button text-lg" disabled={isLoading}>
                                        {isLoading ? 'Validation' : 'Suivant'}
                                        {isLoading ? <CogIcon className='icon animate-spin' /> : <ArrowRightIcon className='icon' />}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default Setup