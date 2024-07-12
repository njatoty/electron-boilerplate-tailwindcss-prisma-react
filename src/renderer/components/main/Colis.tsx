import { ShoppingBagIcon, PhoneIcon, PlusCircleIcon, MagnifyingGlassIcon, MinusCircleIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import AddColisForm from '../AddColisForm'
import { AnimatePresence, motion } from 'framer-motion'
import ColisTable from '../ColisTable'
import EditColisForm from '../EditColisForm'
import { getColis, updateColis } from '../../api/toelectron'

const variants = {
    show: {
        opacity: 1, height: 'auto'
    },
    hide: {
        opacity: 0, height: 0
    }
}

const Colis = () => {

    const [isAdding, setAdding] = useState(false);
    const [isEditing, setEditing] = useState(false);
    const [dataToEdit, setDataToEdit] = useState<Colis>();
    const [colis, setColis] = useState<Colis[]>([]);

    async function init() {
        const allColis = await getColis();
        setColis(allColis as unknown as Colis[]);
    }

    useEffect(() => {
        init();
    }, []);
    

    function handleOpenEdit(data: Colis) {
        setEditing(false);
        setTimeout(() => {
            setEditing(true);
        }, 10);
        setDataToEdit(data);
        setAdding(false);
    }

    function cancelEdit() {
        setDataToEdit(undefined);
        setEditing(false);
    }


    async function handleAddColis(data: Colis) {
        setColis(prev => [data, ...prev ]);
        setAdding(false);
        return true;
    }
    
    async function handleUpdateColis(updated: Colis) {
        setColis(prev => prev.map(c => c.id === updated.id ? updated : c));
        setEditing(false);
        setDataToEdit(undefined);
    }

    return (
        <div className="w-full h-full mx-auto p-5 flex flex-col gap-4">
            <div className='w-full'>
                <h1 className='font-bold flex items-center gap-2 text-lg'>
                    <ShoppingBagIcon className='w-7' />
                    Colis
                </h1>
            </div>
                
            <div className="w-full flex items-center justify-between bg-white card !p-3">
                <div className="w-full flex-col gap-2 bg-white card !p-3">
                    <div className="w-full flex items-center justify-between">
                        {
                            isAdding ? 
                            <button className='btn btn-gold-outline btn-sm' onClick={() => setAdding(false)}>
                                <MinusCircleIcon className='icon'/>
                                Fermer
                            </button> :
                            <button className='btn btn-gold-outline btn-sm' onClick={() => setAdding(true)}>
                                <PlusCircleIcon className='icon'/>
                                Insérer
                            </button>
                        }
                        <div className="flex items-center">
                        </div>
                    </div>
                    {/* Form */}
                    <motion.div className='overflow-hidden'
                        variants={variants}
                        initial='hide'
                        animate={isAdding ? 'show' : 'hide'}
                    >
                        <AddColisForm onCancel={(val) => setAdding(val)} trigger={isAdding}  onSubmit={handleAddColis}/>
                    </motion.div>
                    
                    <AnimatePresence>
                    {
                        isEditing && 
                        <motion.div className='overflow-hidden'
                            variants={variants}
                            initial='hide'
                            animate='show'
                            exit='hide'
                        >
                            <EditColisForm  onCancel={cancelEdit} data={dataToEdit} onSubmit={handleUpdateColis}/>
                        </motion.div>
                    }
                    </AnimatePresence>
                </div>
            </div>

            <div className="card">
                <h1 className="card-title">Liste d'enregistrements</h1>
                <div className="w-full">
                    <ColisTable onEdit={handleOpenEdit} data={colis}/>
                </div>
            </div>
        </div>
    )
}

export default Colis