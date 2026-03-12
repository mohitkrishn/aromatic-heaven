import { XCircle, IndianRupee } from 'lucide-react';

const BookingCard = ({ booking, onCancel, statusStyle }) => {

    const { service, status, therapist, createdAt } = booking;

    return <>
        {/* Main Card Container */}
        <div className="w-full max-w-2xs h-fit bg-white rounded-2xl p-5 shadow-2xl overflow-hidden border border-gray-500">

            {/* Content Section */}
            <div className="px-2 space-y-2 flex flex-col">
                {/* Header: Name & Status */}
                <div className="flex justify-between items-start gap-2">
                    <h2 className="text-xl font-extrabold text-black leading-tight">
                        {service?.name}
                    </h2>
                    <span className={`${statusStyle(status)} text-black text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-tighter`}>
                        {status}
                    </span>
                </div>

                {/* Subtitle */}
                {/* <p className="text-gray-700 text-sm font-semibold opacity-90">
                    {subtitle}
                </p> */}

                {/* Description - Professional Handling */}
                {/* Humne 'line-clamp-2' use kiya hai taaki text 2 lines ke baad truncate ho jaye */}
                {/* <div className="group relative">
                    <p className="text-gray-7700 text-xs leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all duration-300 italic">
                        {description}
                    </p>
                    <span className="text-[10px] text-white/50 cursor-help flex items-center gap-1 mt-1">
                        <Info color="black" size={10} /> Hover to read more
                    </span>
                </div> */}

                {/* Price */}
                <div className="flex items-center text-white font-bold py-2">
                    <IndianRupee color='black' size={16} />
                    <span className="text-xl tracking-tight text-black">{service?.price}</span>
                </div>

                {/* Therapist and date of booking */}
                <div className='flex items-center justify-between gap-4'>
                    <p className="text-gray-700 text-sm font-semibold opacity-90">
                        Therapist: {therapist}
                    </p>
                    <p className="text-gray-700 text-sm font-semibold opacity-90">
                        Date: {new Date(createdAt).toLocaleDateString()}
                    </p>
                </div>

                {/* Cancel Button */}
                <button
                    onClick={() => onCancel(booking._id)}
                    className="w-full bg-[#FF3B3B] hover:bg-[#E03030] active:scale-95 text-white font-black py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-red-900/20 uppercase tracking-widest text-sm cursor-pointer"
                >
                    <XCircle size={18} />
                    Cancel Booking
                </button>
            </div>

        </div>
    </>
};

export default BookingCard;