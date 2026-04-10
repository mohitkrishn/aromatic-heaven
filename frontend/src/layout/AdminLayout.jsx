import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
    Home, Users, Sparkles, PlusCircle,
    Edit, LogOut, Menu, X
} from 'lucide-react';
import brandLogo from "../assets/images/LOGO_BRAND@PNG_.png";
import { useAuthStore } from '../stores/admin/auth.admin';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // NavLink styling logic
    const navLinkClass = ({ isActive }) =>
        `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
            ? 'bg-zinc-800 text-amber-500 font-semibold border-l-4 border-amber-500'
            : 'text-gray-400 hover:bg-zinc-900 hover:text-white'
        }`;

    //logout from auth admin store
    const adminLogout = useAuthStore(state => state.logout);

    const admin = useAuthStore(state => state.user);

    const handleLogout = async () => {
        try {
            const response = await adminLogout();

            if (response?.success) {
                // Redirect to the login page or perform any other desired action
                window.location.href = '/admin/login';
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    }

    return (
        <div className="flex h-screen bg-[#242424] text-white font-sans overflow-hidden">

            {/* Mobile Sidebar Overlay Button */}
            {!isSidebarOpen && (
                <button onClick={() => setIsSidebarOpen(true)} className="md:hidden fixed top-4 left-4 z-50 text-white bg-black/50 p-2 rounded-lg">
                    <Menu size={28} />
                </button>
            )}

            {/* --- SIDEBAR --- */}
            <aside className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-black transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 flex flex-col`}>
                <div className="p-6 flex justify-between items-center">
                    <div className='w-full space-x-1.5 space-y-2.5'>
                        <img
                            src={brandLogo}
                            alt="logo"
                            className='w-full object-cover object-center'
                        />
                    </div>
                    <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4 overflow-y-auto">
                    {/* Use NavLink for routing */}
                    <NavLink to="/admin/dashboard" className={navLinkClass}>
                        <Home size={20} /> Dashboard
                    </NavLink>
                    <NavLink to="/admin/customers" className={navLinkClass}>
                        <Users size={20} /> Customers
                    </NavLink>
                    <NavLink to="/admin/services" className={navLinkClass}>
                        <Sparkles size={20} /> Services
                    </NavLink>
                    <NavLink to="/admin/add-service" className={navLinkClass}>
                        <PlusCircle size={20} /> Add Service
                    </NavLink>
                    <NavLink to="/admin/edit-service" className={navLinkClass}>
                        <Edit size={20} /> Edit Service
                    </NavLink>
                    {/* <NavLink to="/admin/total-bookings" className={navLinkClass}>
                        <CalendarDays size={20} /> Total Bookings
                    </NavLink> */}
                </nav>

                <div className="p-4 border-t border-zinc-800">
                    {
                        admin && <button
                            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                            onClick={handleLogout}
                        >
                            <LogOut size={20} />
                            Logout
                        </button>
                    }

                </div>
            </aside>

            {/* --- MAIN CONTENT AREA (Dynamic) --- */}
            <main className="flex-1 flex flex-col h-full overflow-hidden w-full relative">
                {/* Yahan par children routes render honge */}
                <Outlet />
            </main>

        </div>
    );
};

export default AdminLayout;