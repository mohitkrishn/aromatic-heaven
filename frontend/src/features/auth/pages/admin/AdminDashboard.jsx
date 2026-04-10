import { useState, useEffect } from 'react';
import { Search, XCircle, CalendarDays, Clock, MapPin, IndianRupee } from 'lucide-react';
import { useBookingsStore } from '../../../../stores/admin/bookings.store';

const AdminDashboard = () => {

    //current date to set default value
    const today = new Date().toLocaleDateString();

    // Search & Filter States
    const [searchInput, setSearchInput] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [sortDate, setSortDate] = useState('');
    const [sortStatus, setSortStatus] = useState('');

    // Modal State
    const [selectedBooking, setSelectedBooking] = useState(null);

    // --- 1. Debouncing Logic ---
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchInput);
        }, 500);
        return () => clearTimeout(timer);
    }, [searchInput]);

    // use the admin store to get the order details
    const allBookings = useBookingsStore((state) => state.allBookings);
    // Get the store instance only once
    useEffect(() => {
        // Call getAllBookings only once on mount
        // Use the store directly to avoid unstable function reference
        useBookingsStore.getState().getAllBookings();
    }, []);

    function convertDate(date) {
        return new Date(date).toLocaleDateString();
    }


    // --- 2. Filtering Logic ---
    let filteredBookings = Array.isArray(allBookings) ? allBookings.filter(booking => {
        // console.log(new Date(booking.createdAt).toLocaleDateString());
        const searchLower = debouncedSearch.toLowerCase();
        const matchesSearch = booking.user.name.toLowerCase().includes(searchLower) || booking.mobile.includes(debouncedSearch);
        const matchesStatus = sortStatus ? booking.status === sortStatus : true;
        const matchesDate = convertDate(sortDate) ? convertDate(booking.createdAt) === convertDate(sortDate) : true;

        return matchesSearch && matchesStatus && matchesDate;
    }) : [];

    // --- 3. Modal Close Handler ---
    const handleBackdropClick = (e) => {
        if (e.target.id === 'modal-backdrop') {
            setSelectedBooking(null);
        }
    };

    return (
        <div className="flex-1 flex flex-col p-4 md:p-8 overflow-hidden w-full h-full bg-[#1e1e1e]">

            {/* Top Bar: Search & Filters */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-8 w-full max-w-6xl mx-auto pl-12 md:pl-0">

                {/* Optimized Search Bar */}
                <div className="relative w-full xl:w-1/2">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by customer name or phone number..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="w-full bg-zinc-800 text-white pl-12 pr-4 py-3.5 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500/50 border border-zinc-700 placeholder-gray-500 transition-all shadow-lg"
                    />
                </div>

                {/* Sorting Select Options */}
                <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-sm whitespace-nowrap">Sort by Date:</span>
                        {/* <select
                            value={sortDate}
                            onChange={(e) => setSortDate(e.target.value)}
                            className="bg-zinc-800 text-white px-3 py-2 rounded-lg border border-zinc-700 outline-none focus:border-amber-500 text-sm cursor-pointer"
                        >
                            <option value="">All Dates</option>
                            <option value="2026-03-16">Today (16 Mar)</option>
                            <option value="2026-03-17">Tomorrow (17 Mar)</option>
                            <option value="2026-03-15">Yesterday</option>
                        </select> */}
                        <input
                            type="date"
                            value={sortDate}
                            min={today}
                            onChange={(e) => setSortDate((e.target.value))}
                            placeholder="Select Date"
                            className="bg-zinc-800 text-white px-3 py-2 rounded-lg border border-zinc-700 outline-none focus:border-amber-500 text-sm cursor-pointer"
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-sm whitespace-nowrap">Sort by Status:</span>
                        <select
                            value={sortStatus}
                            onChange={(e) => setSortStatus(e.target.value)}
                            className="bg-zinc-800 text-white px-3 py-2 rounded-lg border border-zinc-700 outline-none focus:border-amber-500 text-sm cursor-pointer"
                        >
                            <option value="">All Status</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Table Section */}
            <div className="flex-1 overflow-auto max-w-6xl mx-auto w-full">
                <h3 className="text-xl font-semibold mb-6 text-gray-200 border-b border-zinc-700 pb-2 inline-block">Recent Bookings</h3>

                <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl">
                    <table className="w-full text-left border-collapse min-w-200">
                        <thead>
                            <tr className="border-b border-zinc-800 text-gray-400 text-sm uppercase tracking-wider bg-zinc-900">
                                <th className="px-6 py-4 font-medium">Customer</th>
                                <th className="px-6 py-4 font-medium">Service Name</th>
                                <th className="px-6 py-4 font-medium">Date</th>
                                <th className="px-6 py-4 font-medium">Mobile</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/50">
                            {filteredBookings.map((booking) => (
                                <tr
                                    key={booking.id}
                                    onClick={() => setSelectedBooking(booking)}
                                    className="hover:bg-zinc-800/80 transition-colors cursor-pointer group"
                                >
                                    <td className="px-6 py-5 text-gray-200 font-medium group-hover:text-amber-400 transition-colors">{booking.user.name}</td>
                                    <td className="px-6 py-5 text-gray-400 truncate max-w-50">{booking.service.name}</td>
                                    <td className="px-6 py-5 text-gray-400">{convertDate(booking.createdAt)}</td>
                                    <td className="px-6 py-5 text-gray-400">{booking.mobile}</td>
                                    <td className="px-6 py-5">
                                        <span className={`px-3 py-1 text-xs rounded-full font-semibold uppercase tracking-wider border ${booking.status === 'confirmed' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                            booking.status === 'completed' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                booking.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                                    'bg-red-500/10 text-red-400 border-red-500/20'
                                            }`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredBookings.length === 0 && (
                        <div className="p-10 text-center text-gray-500">No bookings found matching your search.</div>
                    )}
                </div>
            </div>

            {/* --- OVERLAY MODAL FOR BOOKING DETAILS --- */}
            {selectedBooking && (
                <div
                    id="modal-backdrop"
                    onClick={handleBackdropClick}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity"
                >
                    <div className="bg-[#1e1e1e] border border-zinc-700 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-6 border-b border-zinc-800 bg-zinc-900/50">
                            <h3 className="text-xl font-bold text-white">Booking Details</h3>
                            <button onClick={() => setSelectedBooking(null)} className="text-gray-400 hover:text-red-400 transition-colors">
                                <XCircle size={24} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-6">
                            <div>
                                <p className="text-xs text-amber-500 uppercase tracking-widest font-bold mb-1">Service Selected</p>
                                <p className="text-lg text-white font-medium">{selectedBooking?.service?.name}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Customer Name</p>
                                    <p className="text-gray-200">{selectedBooking.user?.name}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Contact No.</p>
                                    <p className="text-gray-200">{selectedBooking?.mobile}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 bg-zinc-900 p-4 rounded-xl border border-zinc-800">
                                <div className="flex items-center gap-2 text-gray-300 w-1/2 border-r border-zinc-700">
                                    <CalendarDays size={18} className="text-amber-500" />
                                    <span>{selectedBooking && convertDate(selectedBooking.createdAt)}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-300 pl-2">
                                    <Clock size={18} className="text-amber-500" />
                                    <span>{selectedBooking && new Date(selectedBooking.createdAt).toLocaleTimeString()}</span>
                                </div>
                            </div>

                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1"><MapPin size={12} /> Address</p>
                                <p className="text-gray-300 text-sm leading-relaxed">{selectedBooking?.address}</p>
                            </div>

                            <div className="flex justify-between items-end pt-4 border-t border-zinc-800">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Amount</p>
                                    <p className="text-2xl text-white font-bold flex items-center"><IndianRupee size={20} />{selectedBooking?.service?.price}</p>
                                </div>
                                <span className={`px-4 py-1.5 text-sm rounded-full font-bold uppercase tracking-wider border ${selectedBooking?.status === 'confirmed' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                    selectedBooking?.status === 'completed' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                        selectedBooking?.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                            'bg-red-500/10 text-red-400 border-red-500/20'
                                    }`}>
                                    {selectedBooking?.status}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default AdminDashboard;