import { useEffect } from "react";
import BookingCard from "../../../../components/user/BookingCard";
import { useMyBookingStore } from "../../../../stores/myBookings.store";
import LoadingSkelton from "../../../../components/common/LoadingSkelton";

const RecentBookings = () => {

    //status colors
    const getStatusStyle = (status) => {
        const styles = {
            pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
            confirmed: "bg-blue-100 text-blue-700 border-blue-200",
            completed: "bg-green-100 text-green-700 border-green-200",
            cancelled: "bg-red-100 text-red-700 border-red-200",
        };
        return styles[status] || "bg-gray-50 text-gray-700";
    };

    const loading = useMyBookingStore(state => state.loading);
    const myBookings = useMyBookingStore(state => state.myBookings);

    useEffect(() => {
        // Call getAllBookings only once on mount
        useMyBookingStore.getState().getAllBookings();
    }, []);


    return <>
        <main className="w-full min-h-screen pt-20 pb-6 bg-zinc-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-items-center gap-4">
            {
                loading ? <LoadingSkelton count={1} className="col-span-4" /> : myBookings?.map((booking, index) => <BookingCard booking={booking} key={index} statusStyle={getStatusStyle} />)
            }
            {
                myBookings?.length === 0 && !loading && <div className="col-span-4 flex items-center justify-center text-white text-lg font-bold">No Bookings Found</div>
            }
        </main>
    </>
}

export default RecentBookings;