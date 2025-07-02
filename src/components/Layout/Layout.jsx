// src/components/Layout/Layout.jsx (updated)
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import  Footer  from './Footer';

 const Layout = () => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1 p-6">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;