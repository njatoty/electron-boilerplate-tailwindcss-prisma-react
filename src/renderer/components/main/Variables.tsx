import { CircleStackIcon, MapPinIcon, PhoneIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import React, { FormEvent, useState } from 'react'

const Variables = () => {
    
    const [locations, setLocations] = useState([
        {
            location: "Antananarivo",
            tels: ["+261 38 71 479 08"]
        },
        {
            location: "Ambatolampy",
            tels: [""]
        },
        {
            location: "Antsirabe",
            tels: ["+261 38 06 014 30"]
        }
    ]);

    const [location, setLocation] = useState('')
    const [tels, setTels] = useState('');

    function handleAddLocation(e: FormEvent) {
        e.preventDefault();
        setLocations(prev => [...prev, {location, tels: [tels]}]);
        // reset variables
        setLocation('');
        setTels('');
    }

    return (
        <div className="w-full h-full mx-auto p-5 flex flex-col gap-4">
            <div className='w-full'>
                <h1 className='font-bold flex items-center gap-2 text-lg'>
                    <CircleStackIcon className='w-7' />
                    Variables
                </h1>
            </div>
            <div className="card">
                <h1 className="card-title flex items-center gap-2">
                    <span>Location des bureau</span>
                </h1>
                <form className="w-full max-w-lg" onSubmit={handleAddLocation}>
                    <table className='recent-activity-table text-sm w-full'>
                        <thead>
                            <tr className='border-b border-gray-200'>
                                <th>
                                    <p className="flex items-center gap-2">
                                        <MapPinIcon className='w-4'/>
                                        Location
                                    </p>
                                </th>
                                <th>
                                    <p className="flex items-center gap-2">
                                        <PhoneIcon className='w-4'/>
                                        Numéro téléphones
                                    </p>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                locations.map(item => (
                                    <tr key={item.location} className='border-b border-gray-200'>
                                        <td>{item.location}</td>
                                        <td>{item.tels.map((tel, i) =><span className='text-secondary' key={'t' + i}>{tel}</span>)}</td>
                                    </tr>
                                ))
                            }
                            {
                                <tr>
                                    <td>
                                        <div className="form-group">
                                            <input type="text" placeholder="Nouvelle location" required
                                                value={location} onChange={e => setLocation(e.currentTarget.value)}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-stretch gap-1">
                                            <div className="form-group">
                                                <input type="text" placeholder="Tél" required
                                                    value={tels} onChange={e => setTels(e.currentTarget.value)}
                                                />
                                            </div>
                                            <button className='btn border btn-dark !py-0 px-1' disabled={location.trim().length < 3}>
                                                <PlusCircleIcon className='w-5'/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    )
}

export default Variables