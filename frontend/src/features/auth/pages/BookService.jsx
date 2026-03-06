/* eslint-disable no-unused-vars */
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import texture from "../../../assets/images/textture-bg.avif"
import bookBg from "../../../assets/images/PC-2.avif"
import { bookService, getServiceDetails } from '../services/auth.api';
import { motion } from 'motion/react';

const BookService = () => {

    const { serviceId } = useParams(); // Assuming you're using react-router-dom's useParams hook

    const [service, setService] = useState(null);

    useEffect(() => {
        async function getService(serviceId) {
            const response = await getServiceDetails(serviceId);

            setService(response?.service);
        }

        getService(serviceId);
    }, [serviceId]);

    const [bookingData, setBookingData] = useState({
        mobile: "",
        address: "",
        therapist: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setBookingData({
            ...bookingData,
            [name]: value
        });
    }

    const handleBookService = async (e) => {
        e.preventDefault();

        // Implement the logic to book the service using the serviceId and bookingData

        console.log(`Booking service with ID: ${serviceId} and data:`, bookingData);

        // You can make an API call to book the service here
        const response = await bookService(serviceId, bookingData.address, bookingData.mobile, bookingData.therapist);

        console.log("Booking response:", response);

    }

    return <>
        <main
            className="w-full h-screen px-4 bg-center bg-cover flex flex-col gap-5 items-center justify-center"
            style={{ backgroundImage: `url('${bookBg}')`, filter: "grayscale(100%)" }}
        >
            <div
                className="w-full h-full absolute inset-0 z-30 opacity-40 pointer-events-none"
                style={{ backgroundImage: `url(${texture})` }}
            >

            </div>

            <motion.div
                className="w-full max-w-xs rounded-3xl bg-white p-4 flex flex-col items-center gap-6"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, ease: "easeInOut" }}
            >
                <h1
                    className="font-bold text-zinc-900 leading-none mt-3"
                    style={
                        {
                            fontFamily: "Funnel Sans",
                            fontSize: "clamp(2rem, 5vw, 2rem)"
                        }
                    }
                >
                    Happy Relaxing
                </h1>

                {/* form */}
                <form
                    className="w-full h-fit flex flex-col gap-4 mt-6"
                    onSubmit={handleBookService}
                >
                    <input
                        type="tel"
                        placeholder="Mobile *"
                        className="w-full pt-2 border-b border-b-zinc-800 focus:outline-none"
                        style={{fontFamily: "Outfit"}}
                        name="mobile"
                        value={bookingData.mobile}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        placeholder="address *"
                        className="w-full pt-2 border-b border-b-zinc-800 focus:outline-none"
                        style={{fontFamily: "Outfit"}}
                        name="address"
                        value={bookingData.address}
                        onChange={handleChange}
                    />

                    <p className='text-gray-600 leading-0 mt-4' style={{fontFamily: "Outfit"}}>Select Therapist *</p>
                    <div className='w-full flex justify-start items-center gap-5'>
                        <div className='w-1/2 flex items-center gap-2'>
                            <label
                                htmlFor="male"
                                style={{fontFamily: "Outfit"}}
                            >
                                Male
                            </label>
                            <input
                                type="radio"
                                name="therapist"
                                id="male"
                                value="male"
                                className='w-4 h-4'
                                checked={bookingData.therapist === "male"}
                                onChange={handleChange}
                            />
                        </div>

                        <div className='w-1/2 flex items-center gap-2'>
                            <label
                                htmlFor="female"
                                style={{fontFamily: "Outfit"}}
                            >
                                Female
                            </label>
                            <input
                                type="radio"
                                name="therapist"
                                id="female"
                                value="female"
                                className='w-4 h-4'
                                checked={bookingData.therapist === "female"}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full h-10 bg-zinc-900 text-white rounded-lg mt-2 cursor-pointer active:scale-95 transition-transform duration-200"
                        style={{ fontFamily: "Funnel Sans" }}
                    >
                        Book Service
                    </button>
                </form>
            </motion.div>

            {/* service details at a glance */}
            {
                service && (
                    <motion.div
                        className='w-full max-w-xs px-8 py-5 bg-white rounded-4xl flex flex-col gap-2'
                        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: "easeInOut" }}
                    >
                        <h3 className='text-lg font-semibold tracking-tight leading-none'>{service.name}</h3>
                        <p className='text-gray-500 leading-none font-semibold'>{service.subTitle}</p>
                        <p className='leading-none font-semibold'>&#8377; {service.price}</p>
                    </motion.div>
                )
            }

        </main>
    </>
}

export default BookService