import React, { useEffect } from 'react'
import { Activity } from 'lucide-react'
import LoadingSkelton from '../../../../components/common/LoadingSkelton';
import { useBookingsStore } from '../../../../stores/admin/bookings.store';

const TotalBookings = () => {

    const { allBookings, loading } = useBookingsStore(state => state);

    useEffect(() => {
        // Call getAllBookings only once on mount
        useBookingsStore.getState().getAllBookings();
    }, []);

    if (loading) return <LoadingSkelton count={1} />

    if (!allBookings || allBookings.length === 0) {
        return <h1 className='text-2xl font-bold text-white mt-3'>No Bookings Found</h1>
    }

    return (
        <main
            className='w-full h-screen px-4 grid grid-cols-1 sm:grid-cols-2 place-items-center'
        >
            <div className='w-full max-w-sm h-fit py-2.5 bg-zinc-800 border border-zinc-700  flex flex-col items-center justify-center'>
                <div className='total-bookings w-full flex items-center justify-center gap-4'
                >
                    <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                        <Activity size={24} />
                    </div>
                    <h1
                        className='text-2xl font-bold text-white'
                        style={{ fontFamily: "Lexend Deca" }}
                    >
                        Total Bookings
                    </h1>
                </div>

                {/* total bookking count */}
                { allBookings && <div className='w-full'>
                    {loading ? <LoadingSkelton count={1} /> : <h1 className='text-2xl font-bold text-white mt-3 text-center'>{allBookings?.length}</h1>}
                </div> }
            </div>
        </main>
    )
}

export default TotalBookings