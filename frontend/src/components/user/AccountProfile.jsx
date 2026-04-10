import { User, Mail, Phone, LogOut, ShieldCheck } from 'lucide-react';
import { useLoginStore } from '../../stores/auth.store';
import LoadingSpinner from '../common/LoadingSpinner';

const AccountProfile = ({ user, onLogout }) => {
    // Mock data agar props na ho toh (Aap ise req.user se replace karenge)
    const userData = user

    // Status Colors Logic
    // const getStatusStyle = (status) => {
    //     const styles = {
    //         pending: "bg-yellow-50 text-yellow-700 border-yellow-100",
    //         confirmed: "bg-blue-50 text-blue-700 border-blue-100",
    //         completed: "bg-green-50 text-green-700 border-green-100",
    //         cancelled: "bg-red-50 text-red-700 border-red-100",
    //     };
    //     return styles[status] || "bg-gray-50 text-gray-700";
    // }

    const loading = useLoginStore(state => state.loading);


    return (
        <div className="w-full h-full">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header Section */}
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1
                            className="text-3xl font-bold text-white"
                            style={{ fontFamily: "Lexend Deca" }}
                        >
                            My Account
                        </h1>
                        <p
                            className="text-gray-50 leading-4 mt-1 text-xs"
                            style={{ fontFamily: "Funnel Sans" }}
                        >
                            Manage your profile and account settings
                        </p>
                    </div>
                    <button
                        onClick={onLogout}
                        className="flex items-center justify-center gap-2 bg-red-50 text-red-600 px-6 py-2.5 rounded-lg font-semibold cursor-pointer hover:bg-red-100 transition-colors border border-red-200"
                        style={{ fontFamily: "Funnel Sans" }}
                        disabled={loading}

                    >
                        <LogOut size={18} />
                        {loading ? <LoadingSpinner ariaLabel='Logging out...' /> : "Logout"}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left Side: Profile Summary Card */}
                    <div
                        className="md:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center-safe text-center"
                        style={{ fontFamily: "Outfit" }}
                    >
                        <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-5xl font-bold mb-4 shadow-lg shadow-blue-100 uppercase">
                            {String(userData.name).charAt(0)}
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">{userData.name}</h2>
                        <div className="mt-2 flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            <ShieldCheck size={14} />
                            Admin
                        </div>
                    </div>

                    {/* Right Side: Detailed Info Card */}
                    <div className="md:col-span-2 space-y-4">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6">
                                <h3
                                    className="text-lg font-semibold text-gray-800 mb-6 border-b pb-3"
                                    style={{ fontFamily: "Funnel Sans" }}
                                >
                                    Personal Information
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-b pb-6">
                                    {/* Full Name */}
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-gray-50 rounded-lg text-gray-500">
                                            <User size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-400 uppercase" style={{ fontFamily: "Funnel Sans" }}>Full Name</p>
                                            <p className="text-gray-700 font-medium" style={{ fontFamily: "Outfit" }}>{userData.name}</p>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-gray-50 rounded-lg text-gray-500">
                                            <Mail size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-400 uppercase break-all" style={{ fontFamily: "Funnel Sans" }}>Email Address</p>
                                            <p className="max-w-48 text-gray-700 font-medium wrap-break-word" style={{ fontFamily: "Outfit" }}>{userData.email}</p>
                                        </div>
                                    </div>

                                    {/* Mobile */}
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-gray-50 rounded-lg text-gray-500">
                                            <Phone size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider" style={{ fontFamily: "Funnel Sans" }}>Mobile Number</p>
                                            <p className="text-gray-700 font-medium" style={{ fontFamily: "Outfit" }}>{userData.mobile || 'Not Provided'}</p>
                                        </div>
                                    </div>

                                    {/* Address */}
                                    {/* <div className="flex items-start gap-4 sm:col-span-2 border-t pt-4">
                                        <div className="p-2 bg-gray-50 rounded-lg text-gray-500">
                                            <MapPin size={20} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider" style={{ fontFamily: "Funnel Sans" }}>Default Address</p>
                                            <p className="text-gray-700 font-medium leading-tight" style={{ fontFamily: "Outfit" }}>
                                                {userData.address || 'No default address set.'}
                                            </p>
                                        </div>
                                    </div> */}
                                </div>
                            </div>

                            {/* Action Footer */}
                            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
                                <button className="text-sm font-semibold text-blue-600 hover:underline">Edit Profile</button>
                                <span className="text-gray-300">|</span>
                                <button className="text-sm font-semibold text-blue-600 hover:underline">Change Password</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Recent Bookings Section */}
            </div>
        </div>
    );
};

export default AccountProfile;