import { MinusIcon, Square2StackIcon, WindowIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react';

const MenuBarTop = () => {

    const ipc = window.electron.ipcRenderer;
    const [isMaximised, setIsMaximised] = useState(false);

    async function handleMaximize() {
        const maximised = ipc.sendSync('app:maximize');
        console.log(maximised)
        setIsMaximised(maximised);
    }

    function handleMinimize() {
        ipc.send('app:minimize');
    }

    function handleClose() {
        console.log('close')
        ipc.send('app:close');
    }

    return (
        <div className='top-bar-menu'>
            <div className="icon">
                <img src="./images/favicon.png" alt="" width={20}  />
            </div>
            <div className="controls flex items-start">
                <button
                    onClick={handleMinimize}
                >
                    <MinusIcon width={20} />
                </button>
                {
                    isMaximised ?
                    <button
                        onClick={handleMaximize}
                    >
                        <Square2StackIcon width={20} />
                    </button>
                    :
                    <button
                        onClick={handleMaximize}
                    >
                        <WindowIcon width={20} />
                    </button>

                }
                <button className='p-1 hover:bg-indigo-600 text-gray-500 hover:text-white'
                    onClick={handleClose}
                    title='Fermer'
                >
                    <XMarkIcon width={20} />
                </button>
            </div>
        </div>
    )
}

export default MenuBarTop