import React, { useEffect, useState } from 'react'

const Time = () => {

    const [time, setTime] = useState('--:--:--');

    useEffect(() => {
        const timerId = setInterval(() => {
            const date = new Date();
            let hh = date.getHours().toString().padStart(2, '0');
            let mm = date.getMinutes().toString().padStart(2, '0');
            let ss = date.getSeconds().toString().padStart(2, '0');
            setTime([hh, mm, ss].join(':'));
        }, 1000);

        return () => {
            clearInterval(timerId);
        }
    }, []);


    return (
        <span>{time}</span>
    )
}

export default Time