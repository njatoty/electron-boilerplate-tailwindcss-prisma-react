/* eslint-disable prettier/prettier */
import React, { FormEvent, useState } from 'react'
import { KeyIcon, UserIcon, ArrowRightIcon, CogIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion';

const Login = () => {

    const [isLoading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setLoading(true);

        console.log({ username, password })

        setLoading(false);
    }
    

    return (
        <div className="w-full flex min-h-screen bg-light">
            <motion.div className="m-auto max-w-sm w-full login-container"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1}}
                transition={{ duration: 0.5, ease: 'circInOut' }}
            >
                <h2 className="text-center text-lg text-secondary font-normal mb-2 p-1">
                    Authentification requise.
                </h2>
                <form className="flex flex-col p-3" onSubmit={handleSubmit}>
                    <div className="login-form-group mb-3">
                        <UserIcon className='icon' />
                        <input type="text" placeholder="Nom d'utilisateur" className="login-input"
                            value={username}
                            onChange={e => setUsername(e.currentTarget.value)}
                        />
                    </div>
                    <div className="login-form-group mb-2">
                        <KeyIcon className='icon' />
                        <input type="password" placeholder="Mot de passe" className="login-input"
                            value={password}
                            onChange={e => setPassword(e.currentTarget.value)}
                        />
                    </div>
                    <div className="w-full mt-2">
                        <button type='submit' className="login-button text-lg" disabled={isLoading}>
                            { isLoading ? 'Connexion' : 'Se connecter'}
                            { isLoading ? <CogIcon className='icon animate-spin' /> : <ArrowRightIcon className='icon' />}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}

export default Login