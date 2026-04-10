import { useState, useEffect, useMemo } from 'react';
import {
    Search, CalendarDays, Clock, MapPin,
    XCircle, Filter, Download, ChevronLeft, ChevronRight,
    TrendingUp, Activity, CheckCircle2
} from 'lucide-react';
import { useMyBookingStore } from '../../../../stores/myBookings.store';

// --- Mock Data (Extended for Pagination & Stats) ---
const mockBookings = Array.from({ length: 35 }, (_, i) => {
    const statuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    const services = ['Full Body Tightening Massage', 'Happy Feet Relaxation Therapy', 'Aromatic Skin Glow Treatment', 'Deep Tissue Massage'];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const price = Math.floor(Math.random() * 3000) + 1000;

    return {
        id: `BK-${2000 + i}`,
        customer: `Customer ${i + 1}`,
        mobile: `+91 98765${Math.floor(10000 + Math.random() * 90000)}`,
        service: services[i % services.length],
        date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
        time: ['10:30 AM', '12:00 PM', '02:00 PM', '04:30 PM'][i % 4],
        status: status,
        price: price,
        address: "Boring Road, Patna, Bihar"
    };
});

// Adding some fixed data for demo
mockBookings[0].customer = "Shalu Raj"; mockBookings[0].status = "completed"; mockBookings[0].price = 2999;
mockBookings[1].customer = "Sikha Bharti"; mockBookings[1].status = "pending"; mockBookings[1].price = 1499;

const TotalBookings = () => {
    // States
    const [searchInput, setSearchInput] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const itemsPerPage = 10;

    //total bookings from myBookings store
    const myBookings = useMyBookingStore(state => state.myBookings);

    useEffect(() => {
        // Call getAllBookings only once on mount
        useMyBookingStore.getState().getAllBookings();
    }, []);

    // --- 1. Debouncing ---
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchInput);
            setCurrentPage(1); // Reset page on search
        }, 500);
        return () => clearTimeout(timer);
    }, [searchInput]);

    // --- 2. Filtering & Optimization (useMemo) ---
    const filteredBookings = useMemo(() => {
        return mockBookings.filter(booking => {
            const searchLower = debouncedSearch.toLowerCase();
            const matchesSearch = booking.customer.toLowerCase().includes(searchLower) ||
                booking.service.toLowerCase().includes(searchLower) ||
                booking.id.toLowerCase().includes(searchLower);
            const matchesStatus = statusFilter === 'all' ? true : booking.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [debouncedSearch, statusFilter]);

    // --- 3. Stats Calculation (useMemo) ---
    const { totalRevenue, totalBookingsCount, pendingCount } = useMemo(() => {
        let revenue = 0;
        let pending = 0;
        mockBookings.forEach(b => {
            if (b.status === 'completed' || b.status === 'confirmed') revenue += b.price;
            if (b.status === 'pending') pending += 1;
        });
        return {
            totalRevenue: revenue,
            totalBookingsCount: mockBookings.length,
            pendingCount: pending
        };
    }, []); // Calculates once based on initial data (in real app, add dependency on fetched data)

    // --- 4. Pagination ---
    const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentBookings = filteredBookings.slice(startIndex, startIndex + itemsPerPage);

    const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    // --- Helpers ---
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    const getStatusBadge = (status) => {
        const styles = {
            confirmed: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
            completed: 'bg-green-500/10 text-green-400 border-green-500/20',
            pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
            cancelled: 'bg-red-500/10 text-red-400 border-red-500/20'
        };
        return <span className={`px-3 py-1 text-[10px] rounded-full font-bold uppercase tracking-wider border ${styles[status]}`}>{status}</span>;
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
    };

    return (
        <div className="flex-1 flex flex-col p-4 md:p-8 overflow-y-auto w-full h-full bg-[#1e1e1e]">

            {/* --- TOP SECTION: Stats Dashboard --- */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 w-full max-w-7xl mx-auto pl-12 md:pl-0">
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-wide">Total Bookings</h2>
                    <p className="text-gray-400 text-sm mt-1">Comprehensive overview of all service requests</p>
                </div>

                {/* The requested Top Right Stats */}
                <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
                    {/* Revenue Card */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center gap-4 shadow-lg min-w-[200px]">
                        <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-400">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">Total Revenue</p>
                            <h3 className="text-xl font-bold text-white">{formatCurrency(totalRevenue)}</h3>
                        </div>
                    </div>

                    {/* Bookings Card */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center gap-4 shadow-lg min-w-[180px]">
                        <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                            <Activity size={24} />
                        </div>
                        <div>
                            <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">Total Bookings</p>
                            <h3 className="text-xl font-bold text-white">{totalBookingsCount}</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- CONTROLS SECTION: Search & Filter --- */}
            <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by ID, Customer, or Service..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="w-full bg-zinc-900 text-white pl-12 pr-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/50 border border-zinc-800 transition-all text-sm shadow-md"
                    />
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="relative flex items-center bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 shadow-md">
                        <Filter size={16} className="text-gray-400 mr-2" />
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="bg-transparent text-gray-300 outline-none text-sm cursor-pointer appearance-none pr-4"
                        >
                            <option value="all" className="bg-zinc-800">All Statuses</option>
                            <option value="pending" className="bg-zinc-800">Pending</option>
                            <option value="confirmed" className="bg-zinc-800">Confirmed</option>
                            <option value="completed" className="bg-zinc-800">Completed</option>
                            <option value="cancelled" className="bg-zinc-800">Cancelled</option>
                        </select>
                    </div>

                    <button className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2.5 rounded-xl border border-zinc-700 transition-colors text-sm font-medium">
                        <Download size={16} /> Export
                    </button>
                </div>
            </div>

            {/* --- TABLE SECTION --- */}
            <div className="flex-1 flex flex-col overflow-hidden max-w-7xl mx-auto w-full">
                <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800 flex flex-col h-full shadow-2xl overflow-hidden">

                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-left border-collapse min-w-[900px]">
                            <thead className="bg-zinc-900 sticky top-0 z-10">
                                <tr className="border-b border-zinc-800 text-gray-400 text-xs uppercase tracking-widest">
                                    <th className="px-6 py-4 font-semibold">Booking ID</th>
                                    <th className="px-6 py-4 font-semibold">Customer</th>
                                    <th className="px-6 py-4 font-semibold">Service Name</th>
                                    <th className="px-6 py-4 font-semibold">Date</th>
                                    <th className="px-6 py-4 font-semibold">Amount</th>
                                    <th className="px-6 py-4 font-semibold text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800/50">
                                {currentBookings.map((booking) => (
                                    <tr
                                        key={booking.id}
                                        onClick={() => setSelectedBooking(booking)}
                                        className="hover:bg-zinc-800/80 transition-all cursor-pointer group"
                                    >
                                        <td className="px-6 py-4 text-xs font-mono text-gray-500">{booking.id}</td>
                                        <td className="px-6 py-4 font-medium text-gray-200 group-hover:text-amber-400 transition-colors">{booking.customer}</td>
                                        <td className="px-6 py-4 text-sm text-gray-400 truncate max-w-[200px]">{booking.service}</td>
                                        <td className="px-6 py-4 text-sm text-gray-400">{formatDate(booking.date)}</td>
                                        <td className="px-6 py-4 font-bold text-white tracking-wide">{formatCurrency(booking.price)}</td>
                                        <td className="px-6 py-4 text-center">{getStatusBadge(booking.status)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Empty State */}
                        {filteredBookings.length === 0 && (
                            <div className="p-16 text-center flex flex-col items-center justify-center">
                                <CalendarDays size={48} className="text-zinc-700 mb-4" />
                                <h3 className="text-lg font-medium text-gray-400">No Bookings Found</h3>
                                <p className="text-sm text-gray-600 mt-1">Try adjusting your search or filters.</p>
                            </div>
                        )}
                    </div>

                    {/* --- PAGINATION FOOTER --- */}
                    {filteredBookings.length > 0 && (
                        <div className="border-t border-zinc-800 p-4 bg-zinc-900 flex items-center justify-between">
                            <span className="text-sm text-gray-400">
                                Showing <span className="text-white font-medium">{startIndex + 1}</span> to <span className="text-white font-medium">{Math.min(startIndex + itemsPerPage, filteredBookings.length)}</span> of <span className="text-white font-medium">{filteredBookings.length}</span> entries
                            </span>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handlePrevPage} disabled={currentPage === 1}
                                    className={`p-2 rounded-lg border transition-all ${currentPage === 1 ? 'border-zinc-800 text-zinc-600 cursor-not-allowed' : 'border-zinc-700 text-gray-300 hover:bg-zinc-800 hover:text-white'}`}
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                <span className="px-4 py-2 text-sm font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-lg">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={handleNextPage} disabled={currentPage === totalPages}
                                    className={`p-2 rounded-lg border transition-all ${currentPage === totalPages ? 'border-zinc-800 text-zinc-600 cursor-not-allowed' : 'border-zinc-700 text-gray-300 hover:bg-zinc-800 hover:text-white'}`}
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* --- OVERLAY MODAL FOR BOOKING DETAILS --- */}
            {selectedBooking && (
                <div
                    id="modal-backdrop"
                    onClick={(e) => e.target.id === 'modal-backdrop' && setSelectedBooking(null)}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity"
                >
                    <div className="bg-[#1e1e1e] border border-zinc-700 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">

                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-6 border-b border-zinc-800 bg-zinc-900/80">
                            <div>
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    Booking Details
                                </h3>
                                <p className="text-xs text-amber-500 font-mono mt-1">ID: {selectedBooking.id}</p>
                            </div>
                            <button onClick={() => setSelectedBooking(null)} className="text-gray-500 hover:text-red-400 transition-colors p-1 bg-zinc-800 rounded-full">
                                <XCircle size={24} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-6">

                            {/* Service & Price Banner */}
                            <div className="bg-gradient-to-r from-zinc-800 to-zinc-900 p-5 rounded-2xl border border-zinc-700/50 flex justify-between items-center">
                                <div className="pr-4">
                                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Service Requested</p>
                                    <p className="text-lg text-white font-bold leading-tight">{selectedBooking.service}</p>
                                </div>
                                <div className="text-right pl-4 border-l border-zinc-700">
                                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Amount</p>
                                    <p className="text-2xl text-amber-500 font-black">{formatCurrency(selectedBooking.price)}</p>
                                </div>
                            </div>

                            {/* Customer Info Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/50">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Customer</p>
                                    <p className="text-gray-200 font-medium">{selectedBooking.customer}</p>
                                </div>
                                <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/50">
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Mobile</p>
                                    <p className="text-gray-200 font-medium">{selectedBooking.mobile}</p>
                                </div>
                            </div>

                            {/* Schedule Info */}
                            <div className="flex items-center gap-4 bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/50">
                                <div className="flex items-center gap-3 w-1/2 border-r border-zinc-800">
                                    <CalendarDays size={20} className="text-amber-500" />
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">Date</p>
                                        <span className="text-sm text-gray-200">{formatDate(selectedBooking.date)}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 pl-2">
                                    <Clock size={20} className="text-amber-500" />
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-wider">Time</p>
                                        <span className="text-sm text-gray-200">{selectedBooking.time}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Address */}
                            <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/50">
                                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1"><MapPin size={14} /> Service Address</p>
                                <p className="text-gray-300 text-sm leading-relaxed">{selectedBooking.address}</p>
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-2 flex gap-3">
                                {selectedBooking.status !== 'completed' && (
                                    <button className="flex-1 flex items-center justify-center gap-2 bg-green-500/10 hover:bg-green-500/20 text-green-400 font-bold py-3 rounded-xl transition-colors border border-green-500/20">
                                        <CheckCircle2 size={18} /> Mark as Completed
                                    </button>
                                )}
                                <button className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-3 rounded-xl transition-colors border border-zinc-700">
                                    Download Invoice
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default TotalBookings;