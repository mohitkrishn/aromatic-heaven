import { useState, useEffect } from 'react';
import {
    Search, XCircle, User, Mail, Calendar,
    Shield, ChevronLeft, ChevronRight, Clock
} from 'lucide-react';
import { useGetAllUsersStore } from '../../../../stores/admin/getAllUsers';

const CustomersList = () => {
    // Search States
    const [searchInput, setSearchInput] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    // Pagination States
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Modal State
    const [selectedUser, setSelectedUser] = useState(null);

    //get all users from store
    const allUsers = useGetAllUsersStore(state => state.allUsers);
    const getAllUsers = useGetAllUsersStore(state => state.getAllUsers);

    useEffect(() => {
        getAllUsers();
    }, [allUsers, getAllUsers]);

    // --- 1. Debouncing Logic ---
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchInput);
            setCurrentPage(1); // Reset to page 1 whenever search changes
        }, 500);
        return () => clearTimeout(timer);
    }, [searchInput]);

    // --- 2. Filtering Logic ---
    const filteredUsers = Array.isArray(allUsers) ? allUsers.filter(user => {
        const searchLower = debouncedSearch.toLowerCase();
        return (
            user.name.toLowerCase().includes(searchLower) ||
            user.email.toLowerCase().includes(searchLower)
        );
    }) : [];

    // --- 3. Pagination Logic ---
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

    const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    // --- 4. Format Date Helper ---
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-IN', options);
    };

    // --- Modal Close Handler ---
    const handleBackdropClick = (e) => {
        if (e.target.id === 'modal-backdrop') {
            setSelectedUser(null);
        }
    };

    return (
        <div className="flex-1 flex flex-col p-4 md:p-8 overflow-hidden w-full h-full bg-[#1e1e1e]">

            {/* Top Bar: Title & Search */}
            <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-4 mb-8 w-full max-w-6xl mx-auto pl-12 md:pl-0">
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-wide">Customers Directory</h2>
                    <p className="text-gray-400 text-sm mt-1">Manage and view registered user details</p>
                </div>

                <div className="relative w-full xl:w-1/3">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="w-full bg-zinc-800 text-white pl-12 pr-4 py-3 rounded-2xl outline-none focus:ring-2 focus:ring-amber-500/50 border border-zinc-700 placeholder-gray-500 transition-all shadow-lg"
                    />
                </div>
            </div>

            {/* Table Section */}
            <div className="flex-1 flex flex-col overflow-hidden max-w-6xl mx-auto w-full">
                <div className="bg-zinc-900/50 rounded-2xl border border-zinc-800 flex flex-col h-full shadow-2xl">

                    <div className="overflow-x-auto flex-1">
                        <table className="w-full text-left border-collapse min-w-200">
                            <thead className="sticky top-0 bg-zinc-900 z-10">
                                <tr className="border-b border-zinc-800 text-gray-400 text-sm uppercase tracking-wider">
                                    <th className="px-6 py-4 font-medium">Customer Info</th>
                                    <th className="px-6 py-4 font-medium">Joined Date</th>
                                    <th className="px-6 py-4 font-medium">Last Updated</th>
                                    <th className="px-6 py-4 font-medium text-center">Security</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800/50">
                                {currentUsers.map((user) => (
                                    <tr
                                        key={user._id}
                                        onClick={() => setSelectedUser(user)}
                                        className="hover:bg-zinc-800/80 transition-colors cursor-pointer group"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold uppercase border border-amber-500/30">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-gray-200 font-medium group-hover:text-amber-400 transition-colors">{user.name}</p>
                                                    <p className="text-xs text-gray-500">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} className="text-zinc-500" />
                                                {formatDate(user.createdAt)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-400">
                                            <div className="flex items-center gap-2">
                                                <Clock size={14} className="text-zinc-500" />
                                                {formatDate(user.updatedAt)}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className="inline-flex items-center gap-1 px-3 py-1 text-[10px] rounded-full font-bold uppercase tracking-wider border bg-green-500/10 text-green-400 border-green-500/20">
                                                <Shield size={10} /> Encrypted
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Empty State */}
                        {filteredUsers.length === 0 && (
                            <div className="p-12 text-center text-gray-500 flex flex-col items-center">
                                <User size={48} className="text-zinc-700 mb-4" />
                                <p>No customers found matching "{debouncedSearch}".</p>
                            </div>
                        )}
                    </div>

                    {/* --- Pagination Footer --- */}
                    {filteredUsers.length > 0 && (
                        <div className="border-t border-zinc-800 p-4 bg-zinc-900/80 flex items-center justify-between rounded-b-2xl">
                            <span className="text-sm text-gray-400">
                                Showing <span className="text-white font-medium">{startIndex + 1}</span> to <span className="text-white font-medium">{Math.min(startIndex + itemsPerPage, filteredUsers.length)}</span> of <span className="text-white font-medium">{filteredUsers.length}</span> users
                            </span>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                    className={`p-2 rounded-lg border transition-all ${currentPage === 1 ? 'border-zinc-800 text-zinc-600 cursor-not-allowed' : 'border-zinc-700 text-gray-300 hover:bg-zinc-800 hover:text-white'}`}
                                >
                                    <ChevronLeft size={18} />
                                </button>
                                <div className="flex gap-1">
                                    <span className="px-4 py-2 text-sm font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-lg">
                                        {currentPage} / {totalPages}
                                    </span>
                                </div>
                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className={`p-2 rounded-lg border transition-all ${currentPage === totalPages ? 'border-zinc-800 text-zinc-600 cursor-not-allowed' : 'border-zinc-700 text-gray-300 hover:bg-zinc-800 hover:text-white'}`}
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* --- OVERLAY MODAL FOR USER DETAILS --- */}
            {selectedUser && (
                <div
                    id="modal-backdrop"
                    onClick={handleBackdropClick}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity"
                >
                    <div className="bg-[#1e1e1e] border border-zinc-700 rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden transform transition-all animate-in zoom-in-95 duration-200">

                        {/* Modal Header (Avatar profile style) */}
                        <div className="relative bg-zinc-900 pt-12 pb-6 px-6 border-b border-zinc-800 flex flex-col items-center text-center">
                            <button onClick={() => setSelectedUser(null)} className="absolute top-4 right-4 text-gray-500 hover:text-red-400 transition-colors">
                                <XCircle size={24} />
                            </button>

                            <div className="w-20 h-20 rounded-full bg-linear-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-3xl font-bold text-black mb-4 shadow-lg shadow-amber-500/20">
                                {selectedUser.name.charAt(0)}
                            </div>
                            <h3 className="text-xl font-bold text-white">{selectedUser.name}</h3>
                            <p className="text-sm text-gray-400 mt-1 flex items-center gap-1"><Mail size={14} /> {selectedUser.email}</p>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-5">

                            <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800/50 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-500 uppercase tracking-wider flex items-center gap-1">
                                        <Calendar size={14} /> Joined On
                                    </span>
                                    <span className="text-sm text-gray-200 font-medium">{formatDate(selectedUser.createdAt)}</span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-xs text-gray-500 uppercase tracking-wider flex items-center gap-1">
                                        <Clock size={14} /> Last Active
                                    </span>
                                    <span className="text-sm text-gray-200 font-medium">{formatDate(selectedUser.updatedAt)}</span>
                                </div>

                                <div className="flex justify-between items-center border-t border-zinc-800/50 pt-4">
                                    <span className="text-xs text-gray-500 uppercase tracking-wider flex items-center gap-1">
                                        <Shield size={14} /> Password
                                    </span>
                                    <span className="text-sm text-green-400 font-bold bg-green-400/10 px-2 py-1 rounded">
                                        •••••••• (Encrypted)
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedUser(null)}
                                className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-3 rounded-xl transition-colors border border-zinc-700"
                            >
                                Close Profile
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </div>
    );
};

export default CustomersList;