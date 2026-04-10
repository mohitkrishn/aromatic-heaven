import React, { useState, useEffect } from 'react';
import {
    Search, XCircle, User, Mail, Phone, MapPin,
    CalendarDays, Activity, ChevronLeft, ChevronRight, IndianRupee
} from 'lucide-react';

// --- Extensive Mock Data for Pagination Testing ---
const generateMockCustomers = () => {
    const customers = [];
    const names = ["Shalu Raj", "Sikha Bharti", "Saloni Raj", "Amit Kumar", "Priya Singh", "Rahul Verma", "Neha Sharma", "Vikash Gupta", "Pooja Patel", "Rohan Das", "Anjali Kumari", "Deepak Yadav", "Kavita Mishra", "Sanjay Tiwari", "Riya Jain"];

    for (let i = 0; i < 15; i++) {
        customers.push({
            id: i + 1,
            name: names[i],
            email: `${names[i].split(' ')[0].toLowerCase()}@example.com`,
            mobile: `+91 98765${43210 + i}`,
            address: `${10 + i}, Aromatic Street, Patna, Bihar`,
            joinDate: `2025-0${(i % 9) + 1}-15`,
            totalBookings: Math.floor(Math.random() * 10) + 1,
            lifetimeSpend: (Math.floor(Math.random() * 50) + 10) * 100,
            status: i % 5 === 0 ? 'inactive' : 'active'
        });
    }
    return customers;
};

const mockCustomers = generateMockCustomers();

const Customer = () => {
    // --- States ---
    const [searchInput, setSearchInput] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    // Pagination States
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // --- 1. Debouncing Logic ---
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchInput);
            setCurrentPage(1); // Reset to page 1 jab bhi search query badle
        }, 500);
        return () => clearTimeout(timer);
    }, [searchInput]);

    // --- 2. Filtering Logic ---
    const filteredCustomers = mockCustomers.filter(customer => {
        const searchLower = debouncedSearch.toLowerCase();
        return (
            customer.name.toLowerCase().includes(searchLower) ||
            customer.mobile.includes(debouncedSearch) ||
            customer.email.toLowerCase().includes(searchLower)
        );
    });

    // --- 3. Pagination Logic (Math) ---
    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCustomers = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    // --- 4. Modal Close Handler ---
    const handleBackdropClick = (e) => {
        if (e.target.id === 'modal-backdrop') {
            setSelectedCustomer(null);
        }
    };

    return (
        <div className="flex-1 flex flex-col p-4 md:p-8 overflow-hidden w-full h-full bg-[#1e1e1e]">

            {/* Top Bar: Title & Search */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-8 w-full max-w-7xl mx-auto">
                <div>
                    <h2 className="text-2xl font-bold text-white">Registered Customers</h2>
                    <p className="text-gray-400 text-sm mt-1">Manage and view your client base</p>
                </div>

                {/* Optimized Search Bar */}
                <div className="relative w-full xl:w-1/3">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by name, email or phone..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="w-full bg-zinc-800 text-white pl-12 pr-4 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500/50 border border-zinc-700 placeholder-gray-500 transition-all shadow-lg"
                    />
                </div>
            </div>

            {/* Table Section */}
            <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full bg-zinc-900/50 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl">

                <div className="overflow-x-auto flex-1">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className="border-b border-zinc-800 text-gray-400 text-xs uppercase tracking-widest bg-zinc-900">
                                <th className="px-6 py-5 font-semibold">Customer Details</th>
                                <th className="px-6 py-5 font-semibold">Contact Info</th>
                                <th className="px-6 py-5 font-semibold text-center">Total Bookings</th>
                                <th className="px-6 py-5 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/50">
                            {currentCustomers.map((customer) => (
                                <tr
                                    key={customer.id}
                                    onClick={() => setSelectedCustomer(customer)}
                                    className="hover:bg-zinc-800/80 transition-colors cursor-pointer group"
                                >
                                    {/* Name & Date */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold text-lg">
                                                {customer.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-gray-200 font-semibold group-hover:text-amber-400 transition-colors">{customer.name}</p>
                                                <p className="text-xs text-gray-500 mt-0.5">Joined: {new Date(customer.joinDate).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Contact */}
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <p className="text-sm text-gray-300 flex items-center gap-2"><Mail size={14} className="text-gray-500" /> {customer.email}</p>
                                            <p className="text-sm text-gray-300 flex items-center gap-2"><Phone size={14} className="text-gray-500" /> {customer.mobile}</p>
                                        </div>
                                    </td>

                                    {/* Stats */}
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-zinc-800 text-white font-bold border border-zinc-700">
                                            {customer.totalBookings}
                                        </span>
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 text-xs rounded-full font-bold uppercase tracking-wider border ${customer.status === 'active' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
                                            }`}>
                                            {customer.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Empty State */}
                    {filteredCustomers.length === 0 && (
                        <div className="p-16 flex flex-col items-center justify-center text-gray-500">
                            <User size={48} className="mb-4 text-zinc-700" />
                            <p className="text-lg font-medium text-gray-400">No customers found</p>
                            <p className="text-sm">Try adjusting your search query.</p>
                        </div>
                    )}
                </div>

                {/* --- UX Optimized Pagination Footer --- */}
                {filteredCustomers.length > 0 && (
                    <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-900 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <span className="text-sm text-gray-400">
                            Showing <span className="font-semibold text-white">{indexOfFirstItem + 1}</span> to <span className="font-semibold text-white">{Math.min(indexOfLastItem, filteredCustomers.length)}</span> of <span className="font-semibold text-white">{filteredCustomers.length}</span> entries
                        </span>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg bg-zinc-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700 transition-colors border border-zinc-700"
                            >
                                <ChevronLeft size={20} />
                            </button>

                            <div className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-sm font-semibold text-white">
                                Page {currentPage} of {totalPages || 1}
                            </div>

                            <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages || totalPages === 0}
                                className="p-2 rounded-lg bg-zinc-800 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-700 transition-colors border border-zinc-700"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* --- OVERLAY MODAL FOR CUSTOMER DETAILS --- */}
            {selectedCustomer && (
                <div
                    id="modal-backdrop"
                    onClick={handleBackdropClick}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity"
                >
                    <div className="bg-[#1e1e1e] border border-zinc-700 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">

                        {/* Modal Header Profile Style */}
                        <div className="relative p-6 border-b border-zinc-800 bg-zinc-900/80">
                            <button onClick={() => setSelectedCustomer(null)} className="absolute top-6 right-6 text-gray-400 hover:text-red-400 transition-colors z-10">
                                <XCircle size={24} />
                            </button>

                            <div className="flex items-center gap-4 mt-2">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-2xl font-black text-white shadow-lg">
                                    {selectedCustomer.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white leading-tight">{selectedCustomer.name}</h3>
                                    <span className={`inline-block mt-1 px-2.5 py-0.5 text-[10px] rounded-md font-bold uppercase tracking-wider border ${selectedCustomer.status === 'active' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
                                        }`}>
                                        {selectedCustomer.status} Account
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-6">

                            {/* Contact Information Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/50 hover:border-zinc-700 transition-colors">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1.5"><Mail size={12} /> Email Address</p>
                                    <p className="text-gray-200 text-sm font-medium">{selectedCustomer.email}</p>
                                </div>
                                <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/50 hover:border-zinc-700 transition-colors">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1.5"><Phone size={12} /> Mobile No.</p>
                                    <p className="text-gray-200 text-sm font-medium">{selectedCustomer.mobile}</p>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/50">
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1.5"><MapPin size={12} /> Registered Address</p>
                                <p className="text-gray-300 text-sm leading-relaxed">{selectedCustomer.address}</p>
                            </div>

                            {/* Account Stats */}
                            <div className="flex gap-4">
                                <div className="flex-1 bg-gradient-to-br from-zinc-900 to-black p-4 rounded-xl border border-zinc-800 relative overflow-hidden">
                                    <Activity size={40} className="absolute -right-2 -bottom-2 text-zinc-800" />
                                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Total Bookings</p>
                                    <p className="text-3xl text-white font-black">{selectedCustomer.totalBookings}</p>
                                </div>
                                <div className="flex-1 bg-gradient-to-br from-amber-500/10 to-transparent p-4 rounded-xl border border-amber-500/20 relative overflow-hidden">
                                    <IndianRupee size={40} className="absolute -right-2 -bottom-2 text-amber-500/10" />
                                    <p className="text-xs text-amber-500/80 uppercase tracking-wider mb-1">Lifetime Value</p>
                                    <p className="text-3xl text-amber-500 font-black">₹{selectedCustomer.lifetimeSpend}</p>
                                </div>
                            </div>

                            {/* Registration Date */}
                            <div className="text-center pt-2">
                                <p className="text-xs text-gray-500 flex items-center justify-center gap-1.5">
                                    <CalendarDays size={14} /> Member since {new Date(selectedCustomer.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Customer;