import { HomeModernIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { getColis } from '../../api/toelectron';

const Dashboard = () => {

    const [colis, setColis] = useState<Colis[]>([]);

    async function init() {
        const allColis = await getColis();
        if (allColis) setColis(allColis as unknown as Colis[]);
    }

    useEffect(() => {
        init();
    }, []);
    
    return (
        <div className="w-full h-full mx-auto p-5 flex flex-col gap-4">
            <div className='w-full'>
                <h1 className='font-bold flex items-center gap-2 text-lg'>
                    <HomeModernIcon className='w-7' />
                    Acceuil
                </h1>
            </div>
            <div className="grid grid-cols-3 gap-4">
                <div className="card">
                    <h2 className='text-lg text-gold'>Total Colis</h2>
                    <span className='text-xl font-bold'>{colis.length}</span>
                </div>
                <div className="card">
                    <h2 className='text-lg text-gold'>Total Colis</h2>
                    <span className='text-xl font-bold'>200</span>
                </div>
                <div className="card">
                    <h2 className='text-lg text-gold'>Total Colis</h2>
                    <span className='text-xl font-bold'>200</span>
                </div>
            </div>
            <div className="grid grid-cols-1 card">
                <h2 className='card-title'>Activité récente</h2>
                <div className="w-full">
                    <table className='w-full text-sm recent-activity-table'>
                        <thead>
                            <tr>
                                <th>N°</th>
                                <th>Colis</th>
                                <th>Destination</th>
                                <th>Voiture</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                colis.slice(0, 4).map(col => (
                                    <tr key={col.id} className='border-b border-light'>
                                        <td>{(col.id!).toString().padStart(6, "0")}</td>
                                        <td>{col.name}</td>
                                        <td>{col.from?.name} - {col.to?.name}</td>
                                        <td>{col.car}</td>
                                        <td>{new Date(col.date).toLocaleDateString('fr')}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <div className="w-full flex py-3">
                        <NavLink to="/main/colis" className="mx-auto text-warning text-xs hover:underline">Voir tous</NavLink>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3">
                <div className="col-span-2 card">
                    <h2 className="card-title">Actions</h2>
                    <div className="flex gap-2">
                        <button className='px-2 py-1 hover:text-white border border-gold text-gold hover:bg-gradient-to-br hover:from-warning hover:to-gold text-sm rounded-sm flex items-center gap-2'>
                            <PlusCircleIcon className='w-6' />
                            Créer un nouvel envoi
                        </button>
                        <button className='px-2 py-1 hover:text-white border border-gold text-gold hover:bg-gradient-to-br hover:from-warning hover:to-gold text-sm rounded-sm flex items-center gap-2'>
                            <PlusCircleIcon className='w-6' />
                            Créer un nouvel utilisateur
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard