import { ChevronRight } from "lucide-react";

const RecentBookings = ({ bookings }) => {

    //status colors
    const getStatusStyle = (status) => {
        const styles = {
            pending: "bg-yellow-50 text-yellow-700 border-yellow-100",
            confirmed: "bg-blue-50 text-blue-700 border-blue-100",
            completed: "bg-green-50 text-green-700 border-green-100",
            cancelled: "bg-red-50 text-red-700 border-red-100",
        };
        return styles[status] || "bg-gray-50 text-gray-700";
    };


    return <>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-800">Recent Bookings</h3>
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                    View All <ChevronRight size={16} />
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-400 text-xs uppercase tracking-widest">
                            <th className="px-6 py-4 font-semibold">Service Details</th>
                            <th className="px-6 py-4 font-semibold">Date & Time</th>
                            <th className="px-6 py-4 font-semibold">Amount</th>
                            <th className="px-6 py-4 font-semibold text-center">Status</th>
                            <th className="px-6 py-4 font-semibold"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {bookings?.map((item) => (
                            <tr key={item._id} className="hover:bg-gray-50/50 transition-colors">
                                {/* Service Info */}
                                <td className="px-6 py-4">
                                    <div>
                                        <p className="font-semibold text-gray-800">{item.service?.name}</p>
                                        <p className="text-xs text-gray-400">ID: #{item._id.slice(-6)}</p>
                                    </div>
                                </td>

                                {/* Date */}
                                <td className="px-6 py-4">
                                    <div className="flex flex-col text-sm text-gray-600">
                                        <span className="flex items-center gap-1.5">
                                            <Calendar size={14} className="text-gray-400" />
                                            {new Date(item.bookingDate).toLocaleDateString()}
                                        </span>
                                        <span className="flex items-center gap-1.5 mt-1 text-xs">
                                            <Clock size={14} className="text-gray-400" />
                                            10:30 AM
                                        </span>
                                    </div>
                                </td>

                                {/* Price */}
                                <td className="px-6 py-4">
                                    <span className="font-bold text-gray-800">₹{item.service?.price}</span>
                                </td>

                                {/* Status Badge */}
                                <td className="px-6 py-4 text-center">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(item.status)}`}>
                                        {item.status}
                                    </span>
                                </td>

                                {/* Action */}
                                <td className="px-6 py-4 text-right">
                                    <button className="p-2 hover:bg-white rounded-full border border-transparent hover:border-gray-200 transition-all text-gray-400 hover:text-blue-600">
                                        <ChevronRight size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>
}

export default RecentBookings;