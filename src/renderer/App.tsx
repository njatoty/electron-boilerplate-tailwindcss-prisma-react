import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/main.css';
import Login from './components/Login';
import Setup from './components/setup/Setup';
import MainLayout from './components/MainLayout';
import Colis from './components/main/Colis';
import Setting from './components/main/Setting';
import Variables from './components/main/Variables';
import Dashboard from './components/main/Dashboard';
import Layout from './components/Layout';
import MenuBarTop from './components/MenuBarTop';

export default function App() {
  return (

    <>
    <MenuBarTop />
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}></Route>

        <Route path='/login' element={<Login />} />
        <Route path='/setup' element={<Setup />} />

        <Route path='/main' element={<MainLayout />}>
          <Route path='/main' element={<Dashboard />} />
          <Route path='/main/colis' element={<Colis />} />
          <Route path='/main/setting' element={<Setting />} />
          <Route path='/main/variables' element={<Variables />} />
        </Route>
        
      </Routes>
    </Router>
    </>
  );
}
