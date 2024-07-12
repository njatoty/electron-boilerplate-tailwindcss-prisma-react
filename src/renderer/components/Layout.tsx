/* eslint-disable prettier/prettier */
import { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { getUsers } from 'renderer/api/toelectron';

const Layout = () => {
  
  useEffect(() => {
    getUsers().then(res => console.log(res))
    .catch(err => console.log(err));
  }, []);
  

  return (
    <div className="w-full bg-red-500">
      <p className="w-full text-2xl text-gold font-bold">Layout</p>
      <Link to="/setup">Setup</Link>
      <Link to="/main">Main</Link>
      {/* To Render all components */}
      <Outlet />
      <span>Copyright 2024</span>
    </div>
  );
};

export default Layout;
