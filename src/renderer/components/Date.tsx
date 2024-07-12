/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-shadow */
import React, { useEffect, useState } from 'react';

const DateComponent = () => {
  const [date, setDate] = useState('--/--/--');

  useEffect(() => {
    const timerId = setInterval(() => {
      const date = new Date();
      const dd = date.getDay().toString().padStart(2, '0');
      const mm = (date.getMonth() + 1).toString().padStart(2, '0');
      const yyyy = date.getFullYear().toString().padStart(2, '0');
      setDate([dd, mm, yyyy].join('/'));
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return <span>{date}</span>;
};

export default DateComponent;
